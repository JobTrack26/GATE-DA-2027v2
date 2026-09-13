/**
 * GATE DA 2027 - Enhanced Video Player & Study Room Engine
 */

(function () {
  'use strict';

  let currentSubject = null;
  let currentVideoId = null;
  let currentChapterIndex = 0;
  let currentVideoIndex = 0;
  let allPlaylistVideos = [];

  window.GatePlayer = {
    // 1. Inline Embed (Replaces thumbnail with iframe like GateXAIML)
    playInline: function (containerEl, videoId) {
      if (!containerEl || !videoId) return;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', '');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = '0';
      containerEl.innerHTML = '';
      containerEl.appendChild(iframe);
    },

    // 2. Open Theater / Study Room Modal
    openTheater: function (subjectId, chapterIdx, videoIdx) {
      const subject = (window.GATE_DA_SUBJECTS || []).find(s => s.id === subjectId || s.topic_key === subjectId);
      if (!subject) return;

      currentSubject = subject;
      currentChapterIndex = chapterIdx;
      currentVideoIndex = videoIdx;

      // Flatten playlist for smooth next/previous navigation
      allPlaylistVideos = [];
      subject.chapters.forEach((ch, cI) => {
        ch.videos.forEach((vid, vI) => {
          allPlaylistVideos.push({
            ...vid,
            chapterTitle: ch.title,
            chapterIdx: cI,
            videoIdx: vI
          });
        });
      });

      const modal = document.getElementById('theaterModal');
      if (modal) modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      GatePlayer.loadTheaterVideo(currentChapterIndex, currentVideoIndex);
    },

    loadTheaterVideo: function (chapterIdx, videoIdx) {
      const chapter = currentSubject.chapters[chapterIdx];
      if (!chapter) return;
      const video = chapter.videos[videoIdx];
      if (!video) return;

      currentChapterIndex = chapterIdx;
      currentVideoIndex = videoIdx;
      currentVideoId = video.id;

      // Update Title & Chapter
      const titleEl = document.getElementById('theaterVideoTitle');
      const chapEl = document.getElementById('theaterChapterTitle');
      if (titleEl) titleEl.textContent = video.title;
      if (chapEl) chapEl.textContent = `${currentSubject.title} • ${chapter.title}`;

      // Load Iframe
      const frameWrap = document.getElementById('theaterIframeWrap');
      if (frameWrap) {
        frameWrap.innerHTML = `<iframe id="theaterIframe" src="https://www.youtube.com/embed/${video.id}?autoplay=1&enablejsapi=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      }

      // Update "Mark Watched" button state
      GatePlayer.updateWatchedButtonState(video.id);

      // Load Notes for this video
      GatePlayer.loadVideoNotes(video.id);

      // Render Playlist in sidebar
      GatePlayer.renderTheaterPlaylist();
    },

    updateWatchedButtonState: function (vidId) {
      const btn = document.getElementById('theaterMarkWatchedBtn');
      if (!btn) return;
      const isDone = window.GateApp ? window.GateApp.isWatched(vidId) : false;
      if (isDone) {
        btn.innerHTML = '<i class="fa-solid fa-circle-check" style="color:var(--emerald);"></i> Watched';
        btn.classList.add('active');
      } else {
        btn.innerHTML = '<i class="fa-regular fa-circle"></i> Mark as Done';
        btn.classList.remove('active');
      }
    },

    toggleWatched: function () {
      if (!currentVideoId || !window.GateApp) return;
      const current = window.GateApp.isWatched(currentVideoId);
      window.GateApp.setWatched(currentVideoId, !current);
      GatePlayer.updateWatchedButtonState(currentVideoId);
      GatePlayer.renderTheaterPlaylist();
      window.GateApp.refreshAllProgress();
    },

    nextVideo: function () {
      const currentFlatIdx = allPlaylistVideos.findIndex(v => v.id === currentVideoId);
      if (currentFlatIdx !== -1 && currentFlatIdx < allPlaylistVideos.length - 1) {
        const next = allPlaylistVideos[currentFlatIdx + 1];
        GatePlayer.loadTheaterVideo(next.chapterIdx, next.videoIdx);
      }
    },

    prevVideo: function () {
      const currentFlatIdx = allPlaylistVideos.findIndex(v => v.id === currentVideoId);
      if (currentFlatIdx > 0) {
        const prev = allPlaylistVideos[currentFlatIdx - 1];
        GatePlayer.loadTheaterVideo(prev.chapterIdx, prev.videoIdx);
      }
    },

    renderTheaterPlaylist: function () {
      const container = document.getElementById('theaterPlaylistContainer');
      if (!container) return;

      container.innerHTML = allPlaylistVideos.map((vid, idx) => {
        const isCurrent = vid.id === currentVideoId;
        const isDone = window.GateApp ? window.GateApp.isWatched(vid.id) : false;

        return `
          <div class="playlist-item ${isCurrent ? 'active' : ''}" onclick="GatePlayer.loadTheaterVideo(${vid.chapterIdx}, ${vid.videoIdx})">
            <img class="playlist-item-thumb" src="${vid.thumbnail}" alt="" />
            <div class="playlist-item-info">
              <div class="playlist-item-title">${vid.title}</div>
              <div style="font-size: 0.72rem; color: var(--text-faint); display: flex; align-items: center; gap: 6px; margin-top: 2px;">
                <span>${vid.chapterTitle}</span>
                ${isDone ? '<i class="fa-solid fa-check" style="color:var(--emerald);" title="Watched"></i>' : ''}
              </div>
            </div>
          </div>
        `;
      }).join('');
    },

    loadVideoNotes: function (vidId) {
      const textarea = document.getElementById('theaterNotesInput');
      if (!textarea) return;
      const saved = localStorage.getItem(`gx-note:${vidId}`) || '';
      textarea.value = saved;
    },

    saveVideoNotes: function () {
      if (!currentVideoId) return;
      const textarea = document.getElementById('theaterNotesInput');
      if (!textarea) return;
      localStorage.setItem(`gx-note:${currentVideoId}`, textarea.value);
      
      const saveStatus = document.getElementById('theaterNotesStatus');
      if (saveStatus) {
        saveStatus.textContent = 'Saved!';
        setTimeout(() => { saveStatus.textContent = ''; }, 1500);
      }
    },

    closeTheater: function () {
      const modal = document.getElementById('theaterModal');
      if (modal) modal.classList.remove('open');
      const frameWrap = document.getElementById('theaterIframeWrap');
      if (frameWrap) frameWrap.innerHTML = '';
      document.body.style.overflow = '';
      if (window.GateApp) window.GateApp.refreshAllProgress();
    }
  };

  // Keyboard shortcut listener for Theater mode
  document.addEventListener('keydown', function (e) {
    const modal = document.getElementById('theaterModal');
    if (!modal || !modal.classList.contains('open')) return;

    if (e.key === 'Escape') {
      GatePlayer.closeTheater();
    } else if (e.key === 'ArrowRight' && (e.ctrlKey || e.altKey)) {
      GatePlayer.nextVideo();
    } else if (e.key === 'ArrowLeft' && (e.ctrlKey || e.altKey)) {
      GatePlayer.prevVideo();
    }
  });
})();
