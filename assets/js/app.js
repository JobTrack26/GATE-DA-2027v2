/**
 * GATE DA 2027 Master Application Controller
 * Authentic GateXAIML Client-Side Single-Page Application
 */

(function () {
  'use strict';

  let activeView = 'dashboard';
  let activeSubjectId = 'matrices';
  let activeChapterFilter = null; // null = all, or chapter index number

  // Course Player view state
  let playerSubjectId = 'matrices';
  let playerChapterIdx = 0;
  let playerVideoIdx = 0;

  // Pomodoro State
  let pomodoroTimeLeft = 25 * 60; // 25 mins
  let pomodoroTimerId = null;
  let isPomodoroRunning = false;

  window.GateApp = {
    init: function () {
      GateApp.initTheme();
      GateApp.initCountdown();
      GateApp.initSidebarNavigation();
      GateApp.initSearch();
      GateApp.renderSidebarSubjects();
      GateApp.refreshAllProgress();
      
      // Default view: dashboard
      GateApp.showView('dashboard');

      // Initialize Calculator & Quiz engines
      if (window.GateCalc) window.GateCalc.init();
      if (window.GateQuiz) window.GateQuiz.init();
    },

    /* ---------------- THEME TOGGLE ---------------- */
    initTheme: function () {
      const savedTheme = localStorage.getItem('gx-theme') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
      GateApp.updateThemeIcon(savedTheme);

      const toggleBtn = document.getElementById('themeToggleBtn');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          const current = document.documentElement.getAttribute('data-theme');
          const next = current === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', next);
          localStorage.setItem('gx-theme', next);
          GateApp.updateThemeIcon(next);
        });
      }
    },

    updateThemeIcon: function (theme) {
      const btn = document.getElementById('themeToggleBtn');
      if (btn) {
        btn.innerHTML = theme === 'dark' 
          ? '<i class="fa-solid fa-sun" style="color:var(--accent-amber);"></i>' 
          : '<i class="fa-solid fa-moon" style="color:var(--blue);"></i>';
      }
    },

    /* ---------------- EXAM COUNTDOWN TIMER ---------------- */
    initCountdown: function () {
      const examDate = new Date('2027-02-06T09:30:00+05:30').getTime();

      function updateTimer() {
        const now = new Date().getTime();
        const diff = examDate - now;

        const countdownEl = document.getElementById('examCountdownText');
        if (!countdownEl) return;

        if (diff <= 0) {
          countdownEl.textContent = 'GATE DA 2027 In Progress!';
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        countdownEl.innerHTML = `GATE DA 2027: <strong>${days}d ${hours}h ${mins}m</strong> left`;
      }

      updateTimer();
      setInterval(updateTimer, 60000);
    },

    /* ---------------- POMODORO TIMER ---------------- */
    togglePomodoro: function () {
      const btn = document.getElementById('pomodoroBtn');
      if (isPomodoroRunning) {
        clearInterval(pomodoroTimerId);
        isPomodoroRunning = false;
        if (btn) btn.innerHTML = `<i class="fa-solid fa-play" style="color:var(--emerald);"></i> Focus: ${GateApp.formatTime(pomodoroTimeLeft)}`;
      } else {
        isPomodoroRunning = true;
        pomodoroTimerId = setInterval(() => {
          if (pomodoroTimeLeft > 0) {
            pomodoroTimeLeft--;
            if (btn) btn.innerHTML = `<i class="fa-solid fa-pause" style="color:var(--accent-amber);"></i> ${GateApp.formatTime(pomodoroTimeLeft)}`;
          } else {
            clearInterval(pomodoroTimerId);
            isPomodoroRunning = false;
            alert('Great work! 25-minute study session completed. Take a 5-minute break!');
            pomodoroTimeLeft = 25 * 60;
            if (btn) btn.innerHTML = `<i class="fa-solid fa-play" style="color:var(--emerald);"></i> Focus: 25:00`;
          }
        }, 1000);
      }
    },

    formatTime: function (secs) {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    },

    /* ---------------- PROGRESS ENGINE ---------------- */
    isWatched: function (vidId) {
      try {
        return localStorage.getItem(`gx-watched:${vidId}`) === '1';
      } catch (e) {
        return false;
      }
    },

    setWatched: function (vidId, val) {
      try {
        if (val) {
          localStorage.setItem(`gx-watched:${vidId}`, '1');
        } else {
          localStorage.removeItem(`gx-watched:${vidId}`);
        }
      } catch (e) {}
    },

    getSubjectProgress: function (subjectId) {
      const subj = (window.GATE_DA_SUBJECTS || []).find(s => s.id === subjectId || s.topic_key === subjectId);
      if (!subj) return { done: 0, total: 0, pct: 0 };

      let total = 0;
      let done = 0;
      subj.chapters.forEach(ch => {
        ch.videos.forEach(v => {
          total++;
          if (GateApp.isWatched(v.id)) done++;
        });
      });

      const pct = total > 0 ? Math.round((done / total) * 100) : 0;
      return { done, total, pct };
    },

    getGlobalProgress: function () {
      let totalVideos = 0;
      let watchedVideos = 0;

      (window.GATE_DA_SUBJECTS || []).forEach(s => {
        s.chapters.forEach(ch => {
          ch.videos.forEach(v => {
            totalVideos++;
            if (GateApp.isWatched(v.id)) watchedVideos++;
          });
        });
      });

      const pct = totalVideos > 0 ? Math.round((watchedVideos / totalVideos) * 100) : 0;
      return { totalVideos, watchedVideos, pct };
    },

    refreshAllProgress: function () {
      const global = GateApp.getGlobalProgress();

      const statWatched = document.getElementById('statWatchedVideos');
      const statPct = document.getElementById('statGlobalPct');
      const globalBar = document.getElementById('globalProgressBar');

      if (statWatched) statWatched.textContent = `${global.watchedVideos} / ${global.totalVideos}`;
      if (statPct) statPct.textContent = `${global.pct}%`;
      if (globalBar) globalBar.style.width = `${global.pct}%`;

      // Update Sidebar progress pills
      (window.GATE_DA_SUBJECTS || []).forEach(s => {
        const p = GateApp.getSubjectProgress(s.id);
        const fillEl = document.getElementById(`side-prog-fill-${s.id}`);
        if (fillEl) fillEl.style.width = `${p.pct}%`;
      });

      // Update Subject Page Banner (if open)
      if (activeSubjectId) {
        const p = GateApp.getSubjectProgress(activeSubjectId);
        const subjProgFill = document.getElementById('subjectDetailProgFill');
        const subjProgText = document.getElementById('subjectDetailProgText');
        if (subjProgFill) subjProgFill.style.width = `${p.pct}%`;
        if (subjProgText) subjProgText.textContent = `${p.done} / ${p.total} Videos Completed (${p.pct}%)`;
      }
    },

    /* ---------------- NAVIGATION & ROUTING ---------------- */
    initSidebarNavigation: function () {
      const mobileToggle = document.getElementById('mobileSidebarToggle');
      const sidebar = document.getElementById('appSidebar');
      const backdrop = document.getElementById('sidebarBackdrop');

      function closeMobileSidebar() {
        if (sidebar) sidebar.classList.remove('open');
        if (backdrop) backdrop.classList.remove('show');
      }

      if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', () => {
          sidebar.classList.toggle('open');
          if (backdrop) backdrop.classList.toggle('show');
        });
      }

      if (backdrop) backdrop.addEventListener('click', closeMobileSidebar);
    },

    renderSidebarSubjects: function () {
      const container = document.getElementById('sidebarSubjectList');
      if (!container) return;

      const subjects = window.GATE_DA_SUBJECTS || [];
      container.innerHTML = subjects.map(s => {
        const prog = GateApp.getSubjectProgress(s.id);
        return `
          <div class="nav-link-item" id="nav-item-${s.id}" onclick="GateApp.showSubject('${s.id}')">
            <div style="flex-grow: 1; min-width: 0;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${s.title}</span>
                <span class="badge-count">${s.total_videos}</span>
              </div>
              <div class="nav-item-progress-wrap">
                <div class="nav-progress-track">
                  <div class="nav-progress-fill" id="side-prog-fill-${s.id}" style="width: ${prog.pct}%;"></div>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    },

    showView: function (viewName) {
      activeView = viewName;
      if (viewName !== 'subject') activeSubjectId = null;

      // Update active state in sidebar
      document.querySelectorAll('.sidebar-nav .nav-link-item').forEach(el => el.classList.remove('active'));
      const activeNav = document.getElementById(`nav-${viewName}`);
      if (activeNav) activeNav.classList.add('active');

      // Hide all view containers
      const views = ['dashboardView', 'planView', 'subjectView', 'playerView', 'booksView', 'syllabusView', 'quizView', 'formulasView', 'calculatorView', 'notesView'];
      views.forEach(v => {
        const el = document.getElementById(v);
        if (el) el.style.display = 'none';
      });

      // Show selected view
      const target = document.getElementById(`${viewName}View`);
      if (target) {
        target.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Close mobile drawer
      const sidebar = document.getElementById('appSidebar');
      const backdrop = document.getElementById('sidebarBackdrop');
      if (sidebar) sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('show');

      // Specific initializations
      if (viewName === 'dashboard') GateApp.renderDashboard();
      if (viewName === 'plan') GateApp.renderPlanView();
      if (viewName === 'player') GateApp.renderCoursePlayer();
      if (viewName === 'books') GateApp.renderBooks();
      if (viewName === 'syllabus') GateApp.renderSyllabus();
      if (viewName === 'formulas') GateApp.renderFormulas();
      if (viewName === 'notes') GateApp.renderNotesView();
    },

    /* ---------------- 145-DAY STUDY PLAN VIEW ---------------- */
    renderPlanView: function (filterPhaseId) {
      const container = document.getElementById('planViewContent');
      if (!container) return;

      const plan = window.GATE_DA_PLAN || {};
      const phases = plan.phases || [];

      let totalDays = 0;
      let completedDays = 0;
      phases.forEach(ph => {
        ph.weeks.forEach(w => {
          w.dailyGoals.forEach(dg => {
            totalDays++;
            if (localStorage.getItem('gx-plan:day-' + dg.day) === '1') {
              completedDays++;
            }
          });
        });
      });

      const pct = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

      // Phase filter pills
      const phaseTabsHtml = `
        <div class="chapter-pills-row" style="margin-bottom:20px;">
          <div class="chapter-pill ${!filterPhaseId ? 'active' : ''}" onclick="GateApp.renderPlanView()">All 4 Phases (145 Days)</div>
          <div class="chapter-pill ${filterPhaseId === 1 ? 'active' : ''}" onclick="GateApp.renderPlanView(1)">Phase 1: Math & Python</div>
          <div class="chapter-pill ${filterPhaseId === 2 ? 'active' : ''}" onclick="GateApp.renderPlanView(2)">Phase 2: ML & DBMS</div>
          <div class="chapter-pill ${filterPhaseId === 3 ? 'active' : ''}" onclick="GateApp.renderPlanView(3)">Phase 3: PYQ Mastery</div>
          <div class="chapter-pill ${filterPhaseId === 4 ? 'active' : ''}" onclick="GateApp.renderPlanView(4)">Phase 4: Final Sprint</div>
        </div>
      `;

      // Daily Time Slots
      const slotsHtml = (plan.dailyTimeSlots || []).map(s => `
        <div style="background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:10px 14px;">
          <div style="font-size:0.78rem; font-weight:700; color:var(--accent-amber);">${s.time}</div>
          <div style="font-size:0.82rem; color:var(--text-main); margin-top:2px;">${s.task}</div>
        </div>
      `).join('');

      // Filtered phases
      const displayedPhases = filterPhaseId 
        ? phases.filter(p => p.phaseId === filterPhaseId)
        : phases;

      const phasesHtml = displayedPhases.map(ph => {
        const weeksHtml = ph.weeks.map(w => {
          const daysHtml = w.dailyGoals.map(dg => {
            const isDone = localStorage.getItem('gx-plan:day-' + dg.day) === '1';
            const chIdx = dg.chapterIdx !== undefined ? dg.chapterIdx : 0;
            const vidId = dg.videoId || '';
            return `
              <div style="display:flex; align-items:flex-start; gap:12px; padding:10px 14px; background:var(--bg-card); border:1px solid ${isDone ? 'var(--emerald)' : 'var(--border-color)'}; border-radius:var(--radius-sm); margin-bottom:8px; transition:var(--transition);">
                <input type="checkbox" ${isDone ? 'checked' : ''} onchange="GateApp.togglePlanDay(${dg.day}, this.checked)" style="accent-color:var(--emerald); width:18px; height:18px; margin-top:3px; cursor:pointer; flex-shrink:0;" />
                <div style="flex-grow:1; min-width:0;">
                  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
                    <span style="font-size:0.82rem; font-weight:700; color:var(--accent-amber);">Day ${dg.day} • ${dg.date}</span>
                    <button class="btn-secondary btn-sm" style="padding:3px 10px; font-size:0.75rem;" onclick="GateApp.showSubject('${dg.subjectId}', ${chIdx}, '${vidId}')">
                      <i class="fa-solid fa-circle-play" style="color:var(--accent-amber);"></i> Watch Lecture
                    </button>
                  </div>
                  <div style="font-size:0.86rem; margin-top:3px; ${isDone ? 'text-decoration:line-through; color:var(--text-faint);' : 'color:var(--text-main);'}">
                    ${dg.target}
                  </div>
                </div>
              </div>
            `;
          }).join('');

          return `
            <div class="chapter-card open" style="margin-bottom:18px;">
              <div class="chapter-header" style="cursor:default; background:var(--bg-secondary);">
                <div>
                  <div style="font-size:0.75rem; color:var(--accent-amber); font-weight:700;">WEEK ${w.weekNum} • ${w.dates}</div>
                  <div style="font-size:1.05rem; font-weight:800; margin-top:2px;">${w.subject}</div>
                  <div style="font-size:0.8rem; color:var(--text-muted);">${w.focus}</div>
                </div>
                <span class="brand-badge">${w.dailyGoals.length} Days</span>
              </div>
              <div class="chapter-body" style="display:block; padding:14px;">
                ${daysHtml}
              </div>
            </div>
          `;
        }).join('');

        return `
          <div style="margin-bottom:32px;">
            <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:14px; color:var(--text-main); display:flex; align-items:center; gap:8px;">
              <i class="fa-solid fa-flag" style="color:var(--accent-amber);"></i> ${ph.name}
            </h3>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:14px;">${ph.goal}</p>
            ${weeksHtml}
          </div>
        `;
      }).join('');

      container.innerHTML = `
        <div class="hero-banner">
          <div class="hero-tag"><i class="fa-solid fa-bullseye"></i> 145-Day High-Velocity Blueprint</div>
          <h1 class="hero-title">My GATE DA 2027 Battle Plan</h1>
          <p class="hero-subtitle">Starting Tomorrow (Sept 14, 2026) -> Exam Day (Feb 6, 2027). A rigorous 145-day day-by-day roadmap engineered to take you from scratch to AIR 1-50.</p>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px; margin:18px 0;">
            ${slotsHtml}
          </div>

          <div class="progress-container" style="max-width:550px; margin-bottom:0;">
            <div class="progress-header">
              <span>Plan Progress: <strong>${completedDays} / ${totalDays} Days Completed</strong></span>
              <span><strong>${pct}%</strong></span>
            </div>
            <div class="progress-track" style="height:8px;">
              <div class="progress-fill" style="width:${pct}%;"></div>
            </div>
          </div>
        </div>

        ${phaseTabsHtml}

        <div>
          ${phasesHtml}
        </div>
      `;
    },

    togglePlanDay: function (dayNum, isChecked) {
      if (isChecked) {
        localStorage.setItem('gx-plan:day-' + dayNum, '1');
      } else {
        localStorage.removeItem('gx-plan:day-' + dayNum);
      }
      GateApp.renderPlanView();
    },

    /* ---------------- DASHBOARD VIEW ---------------- */
    renderDashboard: function () {
      const grid = document.getElementById('dashboardSubjectsGrid');
      if (!grid) return;

      const subjects = window.GATE_DA_SUBJECTS || [];
      grid.innerHTML = subjects.map(s => {
        const p = GateApp.getSubjectProgress(s.id);
        return `
          <div class="subject-card" onclick="GateApp.showSubject('${s.id}')">
            <div class="subject-card-top">
              <div class="subject-icon">
                <i class="fa-solid fa-brain"></i>
              </div>
              <span class="brand-badge">${s.total_chapters} Chapters</span>
            </div>

            <h3 class="subject-card-title">${s.title}</h3>
            <p class="subject-card-desc">${s.description || 'Complete curriculum strictly mapped to GATE DA 2027 syllabus.'}</p>

            <div class="subject-meta-chips">
              <div class="subject-meta-chip"><i class="fa-solid fa-video"></i> ${s.total_videos} Lectures</div>
              <div class="subject-meta-chip"><i class="fa-solid fa-file-pdf"></i> Official Handbook</div>
            </div>

            <div class="progress-container">
              <div class="progress-header">
                <span>Completed</span>
                <span><strong>${p.done}/${p.total}</strong> (${p.pct}%)</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${p.pct}%;"></div>
              </div>
            </div>

            <div style="display:flex; gap:8px; margin-top:8px;">
              <button class="btn-primary btn-sm" style="flex-grow:1; justify-content:center;" onclick="event.stopPropagation(); GateApp.showSubject('${s.id}')">
                <i class="fa-solid fa-play"></i> Explore Subject
              </button>
              <button class="btn-secondary btn-sm" onclick="event.stopPropagation(); GateApp.openPdfViewer('${s.local_pdf || s.remote_pdf}', '${s.title} - Official Handbook')">
                <i class="fa-solid fa-book-open"></i> Handbook
              </button>
            </div>
          </div>
        `;
      }).join('');
    },

    /* ---------------- SUBJECT DETAIL VIEW (AUTHENTIC GATEXAIML INLINE EMBED) ---------------- */
    showSubject: function (subjectId, targetChapterIdx, targetVidId) {
      activeSubjectId = subjectId;
      activeView = 'subject';
      activeChapterFilter = targetChapterIdx !== undefined ? targetChapterIdx : null;

      // Update sidebar nav active
      document.querySelectorAll('.sidebar-nav .nav-link-item').forEach(el => el.classList.remove('active'));
      const navItem = document.getElementById(`nav-item-${subjectId}`);
      if (navItem) navItem.classList.add('active');

      const views = ['dashboardView', 'planView', 'subjectView', 'playerView', 'booksView', 'syllabusView', 'quizView', 'formulasView', 'calculatorView', 'notesView'];
      views.forEach(v => {
        const el = document.getElementById(v);
        if (el) el.style.display = 'none';
      });
      const target = document.getElementById('subjectView');
      if (target) target.style.display = 'block';

      // Close mobile drawer
      const sidebar = document.getElementById('appSidebar');
      const backdrop = document.getElementById('sidebarBackdrop');
      if (sidebar) sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('show');

      GateApp.renderSubjectDetail(subjectId, targetChapterIdx, targetVidId);
    },

    renderSubjectDetail: function (subjectId, targetChapterIdx, targetVidId) {
      const subject = (window.GATE_DA_SUBJECTS || []).find(s => s.id === subjectId || s.topic_key === subjectId);
      if (!subject) return;

      const container = document.getElementById('subjectViewContent');
      if (!container) return;

      const prog = GateApp.getSubjectProgress(subject.id);
      const pdfPath = subject.local_pdf || subject.remote_pdf;

      // Build quick jump pills
      const pillsHtml = `
        <div class="chapter-pill ${activeChapterFilter === null ? 'active' : ''}" onclick="GateApp.filterSubjectChapter(null)">
          All Chapters (${subject.total_chapters})
        </div>
        ${subject.chapters.map((ch, idx) => `
          <div class="chapter-pill ${activeChapterFilter === idx ? 'active' : ''}" onclick="GateApp.filterSubjectChapter(${idx})">
            ${ch.title} (${ch.video_count})
          </div>
        `).join('')}
      `;

      // Build chapter accordions
      const chaptersHtml = subject.chapters.map((ch, cIdx) => {
        // If chapter filter active, hide non-matching chapters
        const isFilteredOut = activeChapterFilter !== null && activeChapterFilter !== cIdx;
        if (isFilteredOut) return '';

        let chapterDoneCount = 0;
        ch.videos.forEach(v => {
          if (GateApp.isWatched(v.id)) chapterDoneCount++;
        });
        const chPct = ch.videos.length ? Math.round((chapterDoneCount / ch.videos.length) * 100) : 0;

        // Default open: targeted chapter, or first chapter if no target
        const isOpen = targetChapterIdx !== undefined ? (targetChapterIdx === cIdx) : (activeChapterFilter === cIdx || (activeChapterFilter === null && cIdx === 0));

        const videosHtml = ch.videos.map((vid, vIdx) => {
          const isDone = GateApp.isWatched(vid.id);
          return `
            <div class="video-card ${isDone ? 'watched' : ''}" id="vcard-${vid.id}">
              <!-- Thumbnail with Play overlay (Clicking embeds player inline right on card) -->
              <div class="video-thumb" id="thumb-wrap-${vid.id}" data-video="${vid.id}" onclick="GateApp.playInlineVideo('${vid.id}')">
                <img src="${vid.thumbnail}" alt="${vid.title}" loading="lazy" />
                <div class="play-overlay-btn" title="Click to watch video lecture">
                  <i class="fa-solid fa-circle-play" style="font-size:2.2rem; color:#fff; filter:drop-shadow(0 2px 6px rgba(0,0,0,0.6));"></i>
                </div>
              </div>

              <div class="video-info" style="padding:10px 12px; display:flex; flex-direction:column; justify-content:space-between; flex-grow:1;">
                <div class="video-title" title="${vid.title}" style="font-size:0.86rem; font-weight:600; line-height:1.35; margin-bottom:8px;">${vid.title}</div>
                
                <div class="video-bottom-meta" style="display:flex; justify-content:space-between; align-items:center; margin-top:auto;">
                  <label class="watch-check-label" style="display:flex; align-items:center; gap:6px; font-size:0.75rem; color:var(--text-muted); cursor:pointer;">
                    <input type="checkbox" ${isDone ? 'checked' : ''} onchange="GateApp.handleVideoCheck('${vid.id}', this.checked, '${subject.id}', ${cIdx})" style="accent-color:var(--emerald); width:15px; height:15px; cursor:pointer;" />
                    <span>Watched</span>
                  </label>

                  <div style="display:flex; gap:6px;">
                    <button class="theater-mode-btn" title="Open in Theater Focus Room" onclick="GatePlayer.openTheater('${subject.id}', ${cIdx}, ${vIdx})">
                      <i class="fa-solid fa-expand"></i> Theater
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('');

        return `
          <div class="chapter-card ${isOpen ? 'open' : ''}" id="chapter-card-${cIdx}">
            <div class="chapter-header" onclick="GateApp.toggleChapter(${cIdx})">
              <div class="chapter-title-group">
                <div class="chapter-num-badge">${cIdx + 1}</div>
                <div>
                  <div class="chapter-title-text">${ch.title}</div>
                  <div class="chapter-meta-sub">${ch.video_count} lectures • <span id="ch-prog-text-${cIdx}">${chapterDoneCount}/${ch.video_count} watched</span></div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 16px;">
                <div class="progress-track" style="width:100px; height:6px; background:var(--bg-hover);">
                  <div class="progress-fill" id="ch-prog-fill-${cIdx}" style="width: ${chPct}%;"></div>
                </div>
                <i class="fa-solid fa-chevron-down chapter-collapse-btn"></i>
              </div>
            </div>

            <div class="chapter-body" style="display:${isOpen ? 'block' : 'none'};">
              <div class="videos-grid">
                ${videosHtml}
              </div>
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = `
        <div class="hero-banner" style="margin-bottom: 20px;">
          <div class="hero-tag"><i class="fa-solid fa-graduation-cap"></i> GATE DA Core Track</div>
          <h1 class="hero-title">${subject.title}</h1>
          <p class="hero-subtitle">${subject.description || 'Curated video lectures and complete official textbooks for GATE DA 2027.'}</p>

          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-bottom: 16px;">
            <button class="btn-primary" onclick="GateApp.openPdfViewer('${pdfPath}', '${subject.title} - Official GATE DA Handbook')">
              <i class="fa-solid fa-book-open"></i> Read Subject Handbook PDF
            </button>
            <a class="btn-secondary" href="${pdfPath}" download target="_blank">
              <i class="fa-solid fa-download"></i> Download PDF
            </a>
            <button class="btn-secondary" onclick="GateApp.showView('player')">
              <i class="fa-solid fa-circle-play"></i> Open in Course Player
            </button>
          </div>

          <div class="progress-container" style="max-width: 500px; margin-bottom: 0;">
            <div class="progress-header">
              <span id="subjectDetailProgText">${prog.done} / ${prog.total} Videos Completed (${prog.pct}%)</span>
              <span><strong>${prog.pct}%</strong></span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" id="subjectDetailProgFill" style="width: ${prog.pct}%;"></div>
            </div>
          </div>
        </div>

        <div class="chapter-pills-row">
          ${pillsHtml}
        </div>

        <div class="chapters-container">
          ${chaptersHtml}
        </div>
      `;

      // Auto-scroll and play targeted video if specified
      if (targetVidId) {
        setTimeout(() => {
          const targetCard = document.getElementById(`vcard-${targetVidId}`);
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.style.borderColor = 'var(--accent-amber)';
            const thumb = document.getElementById(`thumb-wrap-${targetVidId}`);
            if (thumb) GateApp.playInlineVideo(targetVidId);
          }
        }, 200);
      } else if (targetChapterIdx !== undefined) {
        setTimeout(() => {
          const chCard = document.getElementById(`chapter-card-${targetChapterIdx}`);
          if (chCard) chCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    /* ---------------- INLINE EMBED PLAYER (GATEXAIML FACADE) ---------------- */
    playInlineVideo: function (vidId) {
      const container = document.getElementById(`thumb-wrap-${vidId}`);
      if (!container || !vidId) return;

      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${vidId}?autoplay=1&rel=0&modestbranding=1`;
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.style.width = '100%';
      iframe.style.aspectRatio = '16/9';
      iframe.style.border = '0';
      iframe.style.borderRadius = 'var(--radius-sm)';

      container.innerHTML = '';
      container.appendChild(iframe);
      container.onclick = null; // remove click listener once replaced
    },

    filterSubjectChapter: function (cIdx) {
      activeChapterFilter = cIdx;
      GateApp.renderSubjectDetail(activeSubjectId, cIdx);
    },

    toggleChapter: function (cIdx) {
      const card = document.getElementById(`chapter-card-${cIdx}`);
      if (!card) return;
      const body = card.querySelector('.chapter-body');
      const isOpen = card.classList.contains('open');

      if (isOpen) {
        card.classList.remove('open');
        if (body) body.style.display = 'none';
      } else {
        card.classList.add('open');
        if (body) body.style.display = 'block';
      }
    },

    handleVideoCheck: function (vidId, isChecked, subjectId, cIdx) {
      GateApp.setWatched(vidId, isChecked);
      const card = document.getElementById(`vcard-${vidId}`);
      if (card) card.classList.toggle('watched', isChecked);

      // Update chapter counter
      const subject = (window.GATE_DA_SUBJECTS || []).find(s => s.id === subjectId);
      if (subject && subject.chapters[cIdx]) {
        const ch = subject.chapters[cIdx];
        let done = 0;
        ch.videos.forEach(v => { if (GateApp.isWatched(v.id)) done++; });
        const pct = ch.videos.length ? Math.round((done / ch.videos.length) * 100) : 0;
        const textEl = document.getElementById(`ch-prog-text-${cIdx}`);
        const fillEl = document.getElementById(`ch-prog-fill-${cIdx}`);
        if (textEl) textEl.textContent = `${done}/${ch.video_count} watched`;
        if (fillEl) fillEl.style.width = `${pct}%`;
      }

      GateApp.refreshAllProgress();
    },

    /* ---------------- DEDICATED COURSE PLAYER VIEW ---------------- */
    renderCoursePlayer: function () {
      const container = document.getElementById('playerViewContent');
      if (!container) return;

      const subjects = window.GATE_DA_SUBJECTS || [];
      const subject = subjects.find(s => s.id === playerSubjectId) || subjects[0];
      if (!subject) return;

      playerSubjectId = subject.id;
      const chapter = subject.chapters[playerChapterIdx] || subject.chapters[0];
      const video = chapter ? (chapter.videos[playerVideoIdx] || chapter.videos[0]) : null;

      // Filtered videos for playlist (by current chapter)
      const currentChapterVideos = chapter ? chapter.videos : [];

      // Subject select options
      const subjOptionsHtml = subjects.map(s => `
        <option value="${s.id}" ${s.id === playerSubjectId ? 'selected' : ''}>${s.title} (${s.total_videos} videos)</option>
      `).join('');

      // Chapter select options
      const chapOptionsHtml = subject.chapters.map((ch, idx) => `
        <option value="${idx}" ${idx === playerChapterIdx ? 'selected' : ''}>${ch.title} (${ch.video_count} videos)</option>
      `).join('');

      // Playlist items (chapter focused)
      const playlistHtml = currentChapterVideos.map((v, idx) => {
        const isCurrent = video && v.id === video.id;
        const isDone = GateApp.isWatched(v.id);
        return `
          <div class="playlist-item ${isCurrent ? 'active' : ''}" onclick="GateApp.selectCoursePlayerVideo(${idx})" style="padding:8px 10px; cursor:pointer; display:flex; gap:10px; align-items:center; border-radius:var(--radius-sm); margin-bottom:6px; background:${isCurrent ? 'var(--bg-hover)' : 'transparent'}; border:1px solid ${isCurrent ? 'var(--accent-amber)' : 'transparent'};">
            <img src="${v.thumbnail}" class="playlist-item-thumb" style="width:68px; aspect-ratio:16/9; object-fit:cover; border-radius:4px;" alt="" />
            <div class="playlist-item-info" style="min-width:0; flex-grow:1;">
              <div class="playlist-item-title" style="font-size:0.82rem; font-weight:600; line-height:1.3; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${v.title}</div>
              <div style="font-size:0.7rem; color:var(--text-faint); display:flex; gap:6px; align-items:center; margin-top:2px;">
                <span>${chapter.title}</span>
                ${isDone ? '<i class="fa-solid fa-check" style="color:var(--emerald);"></i>' : ''}
              </div>
            </div>
          </div>
        `;
      }).join('');

      const isVideoWatched = video ? GateApp.isWatched(video.id) : false;

      container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-size:0.75rem; color:var(--accent-amber); font-weight:700; text-transform:uppercase;">LIVE COURSE PLAYER</div>
            <h1 style="font-size:1.35rem; font-weight:800; margin-top:2px;" id="coursePlayerMainHeading">${subject.title}</h1>
          </div>

          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <select id="coursePlayerSubjSelect" style="background:var(--bg-card); color:var(--text-main); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:8px 12px; font-size:0.85rem; outline:none;" onchange="GateApp.switchCoursePlayerSubject(this.value)">
              ${subjOptionsHtml}
            </select>
            <select id="coursePlayerChapSelect" style="background:var(--bg-card); color:var(--text-main); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:8px 12px; font-size:0.85rem; outline:none;" onchange="GateApp.switchCoursePlayerChapter(parseInt(this.value, 10))">
              ${chapOptionsHtml}
            </select>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 340px; gap:20px;">
          <!-- Video Stage -->
          <div>
            <div style="width:100%; aspect-ratio:16/9; background:#000; border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow); margin-bottom:14px;">
              <iframe id="liveCourseIframe" src="https://www.youtube.com/embed/${video ? video.id : ''}?autoplay=1&rel=0&modestbranding=1" style="width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>

            <!-- Controls bar -->
            <div class="player-controls-bar" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <button class="btn-secondary btn-sm" onclick="GateApp.prevCoursePlayerVideo()">
                  <i class="fa-solid fa-backward-step"></i> Previous
                </button>
                <button class="btn-primary btn-sm" onclick="GateApp.nextCoursePlayerVideo()">
                  Next <i class="fa-solid fa-forward-step"></i>
                </button>
                <button class="btn-secondary btn-sm" id="coursePlayerWatchedBtn" onclick="GateApp.toggleCoursePlayerWatched('${video ? video.id : ''}')">
                  <i class="${isVideoWatched ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}" style="${isVideoWatched ? 'color:var(--emerald);' : ''}"></i> ${isVideoWatched ? 'Watched' : 'Mark as Done'}
                </button>
              </div>

              <div style="font-size:0.85rem; font-weight:700; color:var(--text-main);" id="coursePlayerVideoTitleText">
                ${video ? video.title : ''}
              </div>
            </div>

            <!-- Personal Notes Pad for this Video -->
            <div class="stat-card" style="flex-direction:column; align-items:flex-start; margin-top:16px;">
              <div style="display:flex; justify-content:space-between; width:100%; margin-bottom:8px;">
                <span style="font-size:0.85rem; font-weight:700;"><i class="fa-solid fa-pencil" style="color:var(--accent-amber);"></i> Personal Lecture Study Notes</span>
                <span style="font-size:0.75rem; color:var(--emerald); font-weight:600;" id="coursePlayerNotesStatus"></span>
              </div>
              <textarea id="coursePlayerNotesInput" class="notes-textarea" placeholder="Take notes while watching (auto-saved to your local study journal)..." oninput="GateApp.saveCoursePlayerNotes('${video ? video.id : ''}')"></textarea>
            </div>
          </div>

          <!-- Playlist Sidebar -->
          <div class="stat-card" style="flex-direction:column; align-items:flex-start; padding:14px; height:calc(100vh - 220px); min-height:500px;">
            <div style="font-size:0.88rem; font-weight:700; margin-bottom:12px; display:flex; justify-content:space-between; width:100%;">
              <span><i class="fa-solid fa-list-ul" style="color:var(--accent-amber);"></i> ${chapter ? chapter.title : 'Lectures'}</span>
              <span class="brand-badge">${currentChapterVideos.length} Videos</span>
            </div>
            <div style="overflow-y:auto; width:100%; flex-grow:1;" id="coursePlayerPlaylistContainer">
              ${playlistHtml}
            </div>
          </div>
        </div>
      `;

      if (video) {
        const notesInput = document.getElementById('coursePlayerNotesInput');
        if (notesInput) {
          notesInput.value = localStorage.getItem(`gx-note:${video.id}`) || '';
        }
      }
    },

    switchCoursePlayerSubject: function (subjId) {
      playerSubjectId = subjId;
      playerChapterIdx = 0;
      playerVideoIdx = 0;
      GateApp.renderCoursePlayer();
    },

    switchCoursePlayerChapter: function (cIdx) {
      playerChapterIdx = cIdx;
      playerVideoIdx = 0;
      GateApp.renderCoursePlayer();
    },

    selectCoursePlayerVideo: function (vIdx) {
      playerVideoIdx = vIdx;
      const subject = (window.GATE_DA_SUBJECTS || []).find(s => s.id === playerSubjectId);
      if (!subject) return;
      const chapter = subject.chapters[playerChapterIdx];
      if (!chapter) return;
      const video = chapter.videos[vIdx];
      if (!video) return;

      // Update iframe smoothly without re-rendering entire view
      const iframe = document.getElementById('liveCourseIframe');
      if (iframe) iframe.src = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`;

      const titleEl = document.getElementById('coursePlayerVideoTitleText');
      if (titleEl) titleEl.textContent = video.title;

      const isWatched = GateApp.isWatched(video.id);
      const watchedBtn = document.getElementById('coursePlayerWatchedBtn');
      if (watchedBtn) {
        watchedBtn.innerHTML = `<i class="${isWatched ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}" style="${isWatched ? 'color:var(--emerald);' : ''}"></i> ${isWatched ? 'Watched' : 'Mark as Done'}`;
        watchedBtn.setAttribute('onclick', `GateApp.toggleCoursePlayerWatched('${video.id}')`);
      }

      // Update active class in playlist
      document.querySelectorAll('#coursePlayerPlaylistContainer .playlist-item').forEach((el, idx) => {
        el.classList.toggle('active', idx === vIdx);
      });

      // Load notes
      const notesInput = document.getElementById('coursePlayerNotesInput');
      if (notesInput) {
        notesInput.value = localStorage.getItem(`gx-note:${video.id}`) || '';
        notesInput.setAttribute('oninput', `GateApp.saveCoursePlayerNotes('${video.id}')`);
      }
    },

    nextCoursePlayerVideo: function () {
      const subject = (window.GATE_DA_SUBJECTS || []).find(s => s.id === playerSubjectId);
      if (!subject || !subject.chapters[playerChapterIdx]) return;
      const chapter = subject.chapters[playerChapterIdx];

      if (playerVideoIdx < chapter.videos.length - 1) {
        GateApp.selectCoursePlayerVideo(playerVideoIdx + 1);
      } else if (playerChapterIdx < subject.chapters.length - 1) {
        playerChapterIdx++;
        playerVideoIdx = 0;
        GateApp.renderCoursePlayer();
      }
    },

    prevCoursePlayerVideo: function () {
      if (playerVideoIdx > 0) {
        GateApp.selectCoursePlayerVideo(playerVideoIdx - 1);
      } else if (playerChapterIdx > 0) {
        const subject = (window.GATE_DA_SUBJECTS || []).find(s => s.id === playerSubjectId);
        if (subject) {
          playerChapterIdx--;
          playerVideoIdx = (subject.chapters[playerChapterIdx].videos.length - 1);
          GateApp.renderCoursePlayer();
        }
      }
    },

    toggleCoursePlayerWatched: function (vidId) {
      if (!vidId) return;
      const current = GateApp.isWatched(vidId);
      GateApp.setWatched(vidId, !current);
      GateApp.selectCoursePlayerVideo(playerVideoIdx);
      GateApp.refreshAllProgress();
    },

    saveCoursePlayerNotes: function (vidId) {
      if (!vidId) return;
      const textarea = document.getElementById('coursePlayerNotesInput');
      if (!textarea) return;
      localStorage.setItem(`gx-note:${vidId}`, textarea.value);
      const status = document.getElementById('coursePlayerNotesStatus');
      if (status) {
        status.textContent = 'Saved!';
        setTimeout(() => { status.textContent = ''; }, 1500);
      }
    },

    /* ---------------- PDF VIEWER MODAL ---------------- */
    openPdfViewer: function (fileUrl, title) {
      const modal = document.getElementById('pdfModal');
      const titleEl = document.getElementById('pdfModalTitle');
      const iframe = document.getElementById('pdfIframe');
      const directLink = document.getElementById('pdfDirectDownloadLink');

      if (titleEl) titleEl.textContent = title || 'PDF Handbook Viewer';
      if (iframe) iframe.src = fileUrl;
      if (directLink) directLink.href = fileUrl;
      if (modal) modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    },

    closePdfViewer: function () {
      const modal = document.getElementById('pdfModal');
      const iframe = document.getElementById('pdfIframe');
      if (iframe) iframe.src = 'about:blank';
      if (modal) modal.classList.remove('open');
      document.body.style.overflow = '';
    },

    /* ---------------- RECOMMENDED BOOKS VIEW ---------------- */
    renderBooks: function () {
      const container = document.getElementById('booksViewContent');
      if (!container) return;

      const booksData = window.GATE_DA_BOOKS || {};
      let html = `
        <div class="hero-banner">
          <div class="hero-tag"><i class="fa-solid fa-book"></i> Standard Textbooks Catalog</div>
          <h1 class="hero-title">GATE DA Recommended Reference Books</h1>
          <p class="hero-subtitle">Curated standard university textbooks for in-depth theoretical grounding, rigorous mathematical proofs, and problem drilling for GATE DA 2027.</p>
        </div>
      `;

      for (let key in booksData) {
        const cat = booksData[key];
        html += `
          <div style="margin-bottom: 32px;">
            <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-bookmark" style="color:var(--accent-amber);"></i> ${cat.subject}
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
              ${(cat.books || []).map(b => `
                <div class="stat-card" style="flex-direction: column; align-items: flex-start; justify-content: space-between;">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; width:100%; margin-bottom:8px;">
                      <span class="brand-badge" style="font-size:0.68rem;">${b.badge || 'Standard Reference'}</span>
                    </div>
                    <h4 style="font-size: 1.05rem; font-weight: 700; line-height: 1.35; margin-bottom: 6px;">${b.title}</h4>
                    <div style="font-size: 0.82rem; color: var(--accent-amber); font-weight: 600; margin-bottom: 10px;">${b.author}</div>
                    <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">${b.description}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      container.innerHTML = html;
    },

    /* ---------------- SYLLABUS & ROADMAP VIEW ---------------- */
    renderSyllabus: function () {
      const container = document.getElementById('syllabusViewContent');
      if (!container) return;

      const syl = window.GATE_DA_SYLLABUS || {};

      const sectionsHtml = (syl.sections || []).map(sec => {
        const topicsHtml = (sec.topics || []).map(t => {
          const isDone = localStorage.getItem(`gx-syl:${t.id}`) === '1';
          return `
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 10px 14px; background: var(--bg-secondary); border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 8px;">
              <div style="display: flex; align-items: center; gap: 10px; flex-grow: 1;">
                <input type="checkbox" ${isDone ? 'checked' : ''} onchange="GateApp.toggleSyllabusTopic('${t.id}', this.checked)" style="accent-color: var(--emerald); width: 16px; height: 16px; cursor: pointer; flex-shrink:0;" />
                <span style="font-size: 0.88rem; ${isDone ? 'text-decoration: line-through; color: var(--text-faint);' : 'color: var(--text-main);'} flex-grow: 1;">${t.title}</span>
                ${t.highYield ? '<span class="brand-badge" style="font-size: 0.65rem; padding: 2px 6px;">High Yield</span>' : ''}
              </div>

              ${t.subjectId ? `
                <button class="btn-secondary btn-sm" style="white-space:nowrap; font-size:0.75rem; padding:3px 10px;" onclick="GateApp.showSubject('${t.subjectId}', ${t.chapterIdx})">
                  <i class="fa-solid fa-circle-play" style="color:var(--accent-amber);"></i> Watch Lectures
                </button>
              ` : ''}
            </div>
          `;
        }).join('');

        return `
          <div class="chapter-card open" style="margin-bottom: 20px;">
            <div class="chapter-header" style="cursor: default;">
              <div>
                <div style="font-size: 1.1rem; font-weight: 700;">${sec.name}</div>
                <div style="font-size: 0.8rem; color: var(--accent-amber); font-weight: 600;">Expected: ${sec.weightage} • ${sec.badge}</div>
              </div>
            </div>
            <div class="chapter-body" style="display: block; padding:14px;">
              ${topicsHtml}
            </div>
          </div>
        `;
      }).join('');

      const weightageTableHtml = `
        <div style="overflow-x: auto; margin-bottom: 28px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; background: var(--bg-card); border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-color);">
            <thead>
              <tr style="background: var(--bg-secondary); text-align: left; border-bottom: 1px solid var(--border-color);">
                <th style="padding: 12px 16px;">Subject</th>
                <th style="padding: 12px 16px;">Estimated Marks</th>
                <th style="padding: 12px 16px;">Difficulty</th>
                <th style="padding: 12px 16px;">Scoring Yield</th>
              </tr>
            </thead>
            <tbody>
              ${(syl.weightageAnalysis || []).map(w => `
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 16px; font-weight: 600;">${w.subject}</td>
                  <td style="padding: 12px 16px; color: var(--accent-amber); font-weight: 700;">${w.marksRange}</td>
                  <td style="padding: 12px 16px;">${w.difficulty}</td>
                  <td style="padding: 12px 16px;"><span class="brand-badge" style="font-size:0.7rem;">${w.yield}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;

      const roadmapHtml = (syl.roadmap || []).map((r, rI) => `
        <div class="stat-card" style="flex-direction: column; align-items: flex-start; margin-bottom: 16px;">
          <div style="display:flex; justify-content:space-between; width:100%; margin-bottom:8px;">
            <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--accent-amber);">${r.phase}</h4>
            <span class="brand-badge">${r.targetCompletion}</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-main); margin-bottom: 12px;">${r.focus}</p>
        </div>
      `).join('');

      container.innerHTML = `
        <div class="hero-banner">
          <div class="hero-tag"><i class="fa-solid fa-compass"></i> Strategy Guide</div>
          <h1 class="hero-title">GATE DA 2027 Syllabus & Strategy Guide</h1>
          <p class="hero-subtitle">Complete syllabus topics mapped to high-yield weights and interactive progress checkboxes. Click "Watch Lectures" to jump directly into each topic's lecture series.</p>
        </div>

        <div class="section-heading-row">
          <h3 class="section-title"><i class="fa-solid fa-chart-pie" style="color:var(--accent-amber);"></i> Subject-Wise Marks Weightage Analysis</h3>
        </div>
        ${weightageTableHtml}

        <div class="section-heading-row">
          <h3 class="section-title"><i class="fa-solid fa-list-check" style="color:var(--accent-amber);"></i> Detailed Topic-By-Topic Checklist</h3>
        </div>
        ${sectionsHtml}

        <div class="section-heading-row" style="margin-top:32px;">
          <h3 class="section-title"><i class="fa-solid fa-route" style="color:var(--accent-amber);"></i> 4-Phase Preparation Roadmap</h3>
        </div>
        ${roadmapHtml}
      `;
    },

    toggleSyllabusTopic: function (topicId, isChecked) {
      if (isChecked) {
        localStorage.setItem(`gx-syl:${topicId}`, '1');
      } else {
        localStorage.removeItem(`gx-syl:${topicId}`);
      }
      GateApp.renderSyllabus();
    },

    /* ---------------- FORMULA CHEATSHEETS VIEW ---------------- */
    renderFormulas: function () {
      const container = document.getElementById('formulasViewContent');
      if (!container) return;

      const formulasData = window.GATE_DA_FORMULAS || [];
      let html = `
        <div class="hero-banner">
          <div class="hero-tag"><i class="fa-solid fa-square-root-variable"></i> Rapid Revision Engine</div>
          <h1 class="hero-title">GATE DA High-Yield Formula Cards</h1>
          <p class="hero-subtitle">Formula cheat-sheets covering Linear Algebra, Probability, Calculus, and ML algorithms for rapid daily formula drilling.</p>
        </div>
      `;

      formulasData.forEach(cat => {
        html += `
          <div style="margin-bottom: 32px;">
            <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-atom" style="color:var(--accent-amber);"></i> ${cat.category}
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
              ${(cat.items || []).map(item => `
                <div class="stat-card" style="flex-direction: column; align-items: flex-start;">
                  <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--accent-amber); margin-bottom: 8px;">${item.name}</h4>
                  <div style="font-size: 0.95rem; font-family: var(--font-mono); background: var(--bg-hover); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); width: 100%; margin-bottom: 10px; overflow-x: auto;">
                    ${item.formula}
                  </div>
                  <p style="font-size: 0.82rem; color: var(--text-muted);">${item.note}</p>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      });

      container.innerHTML = html;

      // Render KaTeX Math if available
      if (window.renderMathInElement) {
        try {
          renderMathInElement(container, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false }
            ],
            throwOnError: false
          });
        } catch (e) {}
      }
    },

    /* ---------------- NOTES & JOURNAL VIEW ---------------- */
    renderNotesView: function () {
      const container = document.getElementById('notesViewContent');
      if (!container) return;

      const notesList = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('gx-note:')) {
          const vidId = key.replace('gx-note:', '');
          const noteText = localStorage.getItem(key);
          if (noteText && noteText.trim()) {
            // Find corresponding video
            let foundVid = null;
            let foundSubj = null;
            (window.GATE_DA_SUBJECTS || []).forEach(s => {
              s.chapters.forEach(ch => {
                const v = ch.videos.find(item => item.id === vidId);
                if (v) {
                  foundVid = v;
                  foundSubj = s;
                }
              });
            });

            notesList.push({
              vidId,
              noteText,
              videoTitle: foundVid ? foundVid.title : `Lecture ${vidId}`,
              subjectTitle: foundSubj ? foundSubj.title : 'General Study'
            });
          }
        }
      }

      container.innerHTML = `
        <div class="hero-banner">
          <div class="hero-tag"><i class="fa-solid fa-journal-whills"></i> Active Recall Log</div>
          <h1 class="hero-title">My Personal Study Journal & Notes</h1>
          <p class="hero-subtitle">Centralized archive of all timestamped notes, derivations, and questions taken during video lecture study sessions.</p>

          <div style="display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap;">
            <button class="btn-primary" onclick="GateApp.exportNotesAsMarkdown()">
              <i class="fa-solid fa-file-arrow-down"></i> Export All Notes (.md)
            </button>
            <button class="btn-secondary" onclick="GateApp.exportProgress()">
              <i class="fa-solid fa-cloud-arrow-down"></i> Backup Progress (.json)
            </button>
          </div>
        </div>

        <div>
          ${notesList.length === 0 ? `
            <div class="stat-card" style="text-align: center; justify-content: center; padding: 48px;">
              <div>
                <i class="fa-solid fa-pencil" style="font-size: 2.5rem; color: var(--text-faint); margin-bottom: 12px;"></i>
                <h3 style="font-size: 1.1rem; font-weight: 700;">No Lecture Notes Recorded Yet</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
                  Open any video lecture in the Course Player or Theater Mode and type notes in the sidebar—they will appear here automatically!
                </p>
              </div>
            </div>
          ` : notesList.map(n => `
            <div class="chapter-card open" style="margin-bottom: 16px;">
              <div class="chapter-header" style="cursor: default;">
                <div>
                  <div style="font-size: 0.75rem; color: var(--accent-amber); font-weight: 700;">${n.subjectTitle}</div>
                  <h4 style="font-size: 1.05rem; font-weight: 700; margin-top: 2px;">${n.videoTitle}</h4>
                </div>
                <button class="btn-secondary btn-sm" onclick="GatePlayer.openTheater('${activeSubjectId}', 0, 0)">
                  <i class="fa-solid fa-play"></i> Rewatch
                </button>
              </div>
              <div class="chapter-body" style="display: block; padding: 16px 20px;">
                <p style="white-space: pre-wrap; font-size: 0.88rem; line-height: 1.6; color: var(--text-main); margin-bottom: 0;">${n.noteText}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    },

    exportNotesAsMarkdown: function () {
      let md = '# GATE DA 2027 Study Journal Notes\n\nGenerated from GATE DA Mission Control\n\n---\n\n';
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('gx-note:')) {
          const vidId = key.replace('gx-note:', '');
          const noteText = localStorage.getItem(key);
          md += `## Video ID: ${vidId}\n${noteText}\n\n---\n\n`;
        }
      }

      const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'GATE_DA_2027_Notes.md';
      a.click();
    },

    exportProgress: function () {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('gx-') || key.startsWith('gate-'))) {
          data[key] = localStorage.getItem(key);
        }
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'GATE_DA_Progress_Backup.json';
      a.click();
    },

    /* ---------------- GLOBAL SEARCH ---------------- */
    initSearch: function () {
      const searchInput = document.getElementById('globalSearchInput');
      const dropdown = document.getElementById('globalSearchDropdown');

      if (!searchInput || !dropdown) return;

      const searchIndex = [];
      (window.GATE_DA_SUBJECTS || []).forEach(s => {
        searchIndex.push({
          type: 'Subject',
          title: s.title,
          subtitle: `${s.total_chapters} Chapters • ${s.total_videos} Videos`,
          action: () => GateApp.showSubject(s.id)
        });

        s.chapters.forEach((ch, cI) => {
          searchIndex.push({
            type: 'Chapter',
            title: `${ch.title} (${s.title})`,
            subtitle: `${ch.video_count} videos`,
            action: () => GateApp.showSubject(s.id, cI)
          });

          ch.videos.forEach((v, vI) => {
            searchIndex.push({
              type: 'Lecture',
              title: v.title,
              subtitle: `${s.title} • ${ch.title}`,
              action: () => GateApp.showSubject(s.id, cI, v.id)
            });
          });
        });
      });

      searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
          dropdown.style.display = 'none';
          dropdown.innerHTML = '';
          return;
        }

        const matches = searchIndex.filter(item => 
          item.title.toLowerCase().includes(query) || 
          item.subtitle.toLowerCase().includes(query)
        ).slice(0, 10);

        if (!matches.length) {
          dropdown.innerHTML = '<div style="padding: 14px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No matches found for "' + query + '"</div>';
        } else {
          dropdown.innerHTML = matches.map(m => `
            <div class="search-result-item" onclick="GateApp.executeSearchResult(${searchIndex.indexOf(m)})">
              <span class="item-type">${m.type}</span>
              <div style="min-width: 0;">
                <div style="font-size: 0.88rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${m.title}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${m.subtitle}</div>
              </div>
            </div>
          `).join('');
        }
        dropdown.style.display = 'block';
      });

      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && e.target !== searchInput) {
          dropdown.style.display = 'none';
        }
      });

      GateApp._searchIndex = searchIndex;
    },

    executeSearchResult: function (index) {
      const dropdown = document.getElementById('globalSearchDropdown');
      const searchInput = document.getElementById('globalSearchInput');
      if (dropdown) dropdown.style.display = 'none';
      if (searchInput) searchInput.value = '';

      if (GateApp._searchIndex && GateApp._searchIndex[index]) {
        GateApp._searchIndex[index].action();
      }
    }
  };

  document.addEventListener('DOMContentLoaded', GateApp.init);
})();
