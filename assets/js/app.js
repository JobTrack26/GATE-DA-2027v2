/**
 * GATE DA 2027 Master Application Controller
 * High-Density Exam Preparation Portal
 */

(function () {
  'use strict';

  let activeView = 'dashboard';
  let activeSubjectId = 'calculus-opt';
  let currentMainVideo = null;

  // Course Player view state
  let playerSubjectId = 'calculus-opt';
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
            return `
              <div style="display:flex; align-items:flex-start; gap:12px; padding:10px 14px; background:var(--bg-card); border:1px solid ${isDone ? 'var(--emerald)' : 'var(--border-color)'}; border-radius:var(--radius-sm); margin-bottom:8px; transition:var(--transition);">
                <input type="checkbox" ${isDone ? 'checked' : ''} onchange="GateApp.togglePlanDay(${dg.day}, this.checked)" style="accent-color:var(--emerald); width:18px; height:18px; margin-top:3px; cursor:pointer; flex-shrink:0;" />
                <div style="flex-grow:1; min-width:0;">
                  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
                    <span style="font-size:0.82rem; font-weight:700; color:var(--accent-amber);">Day ${dg.day} • ${dg.date}</span>
                    <button class="btn-secondary btn-sm" style="padding:2px 8px; font-size:0.72rem;" onclick="GateApp.showSubject('${dg.subjectId}')">
                      <i class="fa-solid fa-play"></i> Open Subject
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
        const firstVid = s.chapters && s.chapters[0] && s.chapters[0].videos[0];
        return `
          <div class="subject-card">
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
              <div class="subject-meta-chip"><i class="fa-solid fa-file-pdf"></i> PDF Handbook</div>
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
              <button class="btn-primary btn-sm" style="flex-grow:1; justify-content:center;" onclick="GateApp.showSubject('${s.id}')">
                <i class="fa-solid fa-play"></i> Watch Lectures
              </button>
              <button class="btn-secondary btn-sm" onclick="GateApp.openPdfViewer('${s.local_pdf || s.remote_pdf}', '${s.title} - Official Handbook')">
                <i class="fa-solid fa-book-open"></i> Handbook
              </button>
            </div>
          </div>
        `;
      }).join('');
    },

    /* ---------------- SUBJECT DETAIL VIEW WITH MASTER EMBEDDED PLAYER ---------------- */
    showSubject: function (subjectId) {
      activeSubjectId = subjectId;
      activeView = 'subject';

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

      GateApp.renderSubjectDetail(subjectId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    renderSubjectDetail: function (subjectId) {
      const subject = (window.GATE_DA_SUBJECTS || []).find(s => s.id === subjectId || s.topic_key === subjectId);
      if (!subject) return;

      const container = document.getElementById('subjectViewContent');
      if (!container) return;

      const prog = GateApp.getSubjectProgress(subject.id);
      const pdfPath = subject.local_pdf || subject.remote_pdf;

      // Pick first lecture as initial active main video
      const firstCh = subject.chapters[0];
      const firstVid = firstCh ? firstCh.videos[0] : null;
      currentMainVideo = firstVid ? {
        subjectId: subject.id,
        chapterIdx: 0,
        videoIdx: 0,
        video: firstVid,
        chapterTitle: firstCh.title
      } : null;

      // Build quick jump pills
      const pillsHtml = subject.chapters.map((ch, idx) => `
        <div class="chapter-pill" onclick="GateApp.scrollToChapter(${idx})">
          Ch. ${idx + 1}: ${ch.title}
        </div>
      `).join('');

      // Build chapter accordions
      const chaptersHtml = subject.chapters.map((ch, cIdx) => {
        let chapterDoneCount = 0;
        ch.videos.forEach(v => {
          if (GateApp.isWatched(v.id)) chapterDoneCount++;
        });
        const chPct = ch.videos.length ? Math.round((chapterDoneCount / ch.videos.length) * 100) : 0;

        const videosHtml = ch.videos.map((vid, vIdx) => {
          const isDone = GateApp.isWatched(vid.id);
          return `
            <div class="video-card ${isDone ? 'watched' : ''}" id="vcard-${vid.id}">
              <!-- Thumbnail with Play button (Clicking plays in Master Player at top) -->
              <div class="video-thumb" id="thumb-wrap-${vid.id}" onclick="GateApp.playInSubjectMasterPlayer('${subject.id}', ${cIdx}, ${vIdx})">
                <img src="${vid.thumbnail}" alt="${vid.title}" loading="lazy" />
                <div class="play-overlay-btn" title="Play Video">
                  <i class="fa-solid fa-play"></i>
                </div>
              </div>

              <div class="video-info">
                <div class="video-title" title="${vid.title}">${vid.title}</div>
                
                <div class="video-bottom-meta">
                  <label class="watch-check-label">
                    <input type="checkbox" ${isDone ? 'checked' : ''} onchange="GateApp.handleVideoCheck('${vid.id}', this.checked, '${subject.id}')" />
                    <span>Watched</span>
                  </label>

                  <div style="display:flex; gap:6px;">
                    <button class="theater-mode-btn" title="Play in Master Player" onclick="GateApp.playInSubjectMasterPlayer('${subject.id}', ${cIdx}, ${vIdx})">
                      <i class="fa-solid fa-play"></i> Play
                    </button>
                    <button class="theater-mode-btn" title="Open Fullscreen Theater Study Room" onclick="GatePlayer.openTheater('${subject.id}', ${cIdx}, ${vIdx})">
                      <i class="fa-solid fa-expand"></i> Theater
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('');

        return `
          <div class="chapter-card open" id="chapter-card-${cIdx}">
            <div class="chapter-header" onclick="GateApp.toggleChapter(${cIdx})">
              <div class="chapter-title-group">
                <div class="chapter-num-badge">${cIdx + 1}</div>
                <div>
                  <div class="chapter-title-text">${ch.title}</div>
                  <div class="chapter-meta-sub">${ch.video_count} lectures • ${chapterDoneCount}/${ch.video_count} watched</div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 16px;">
                <i class="fa-solid fa-chevron-down chapter-collapse-btn"></i>
              </div>
            </div>

            <div class="chapter-body">
              <div class="videos-grid">
                ${videosHtml}
              </div>
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = `
        <div class="hero-banner" style="margin-bottom: 20px;">
          <div class="hero-tag"><i class="fa-solid fa-graduation-cap"></i> GATE DA Official Track</div>
          <h1 class="hero-title">${subject.title}</h1>
          <p class="hero-subtitle">${subject.description || 'Master all topics for GATE DA 2027 through structured video lectures and official textbooks.'}</p>

          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-bottom: 16px;">
            <button class="btn-primary" onclick="GateApp.openPdfViewer('${pdfPath}', '${subject.title} - Official GATE DA Handbook')">
              <i class="fa-solid fa-book-open"></i> Read Subject Handbook PDF
            </button>
            <a class="btn-secondary" href="${pdfPath}" download target="_blank">
              <i class="fa-solid fa-download"></i> Download PDF
            </a>
            <button class="btn-secondary" onclick="GatePlayer.openTheater('${subject.id}', 0, 0)">
              <i class="fa-solid fa-tv"></i> Theater Focus Room
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

        <!-- ==================== EMBEDDED MASTER VIDEO PLAYER ==================== -->
        <div class="hero-banner" id="subjectMasterPlayerSection" style="padding: 20px; background: var(--bg-card); margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div>
              <div style="font-size: 0.75rem; color: var(--accent-amber); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;" id="mainPlayerChapterBadge">
                ${firstCh ? firstCh.title : 'Lecture Player'}
              </div>
              <h2 style="font-size: 1.25rem; font-weight: 700;" id="mainPlayerVideoTitle">
                ${firstVid ? firstVid.title : 'Select a lecture below to play'}
              </h2>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              <button class="btn-secondary btn-sm" id="mainPlayerWatchedToggleBtn" onclick="GateApp.toggleMainPlayerWatched()">
                <i class="fa-regular fa-circle"></i> Mark as Done
              </button>
              <button class="btn-secondary btn-sm" onclick="GateApp.openMainVideoInTheater()" title="Expand to Theater Mode">
                <i class="fa-solid fa-expand"></i> Full Theater
              </button>
            </div>
          </div>

          <!-- 16:9 Responsive Embed Player -->
          <div style="position: relative; width: 100%; aspect-ratio: 16 / 9; max-height: 580px; background: #000; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow);">
            <iframe id="mainSubjectPlayerIframe" 
                    src="https://www.youtube.com/embed/${firstVid ? firstVid.id : ''}?autoplay=0&rel=0&modestbranding=1" 
                    style="width: 100%; height: 100%; border: 0;" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
            </iframe>
          </div>

          <!-- Video Navigation Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; gap: 8px;">
              <button class="btn-secondary btn-sm" onclick="GateApp.prevMainVideo()">
                <i class="fa-solid fa-backward-step"></i> Previous
              </button>
              <button class="btn-primary btn-sm" onclick="GateApp.nextMainVideo()">
                Next Lecture <i class="fa-solid fa-forward-step"></i>
              </button>
            </div>

            <div style="font-size: 0.8rem; color: var(--text-muted);">
              <i class="fa-solid fa-circle-info"></i> Click any video card in the chapters below to switch lectures instantly.
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

      if (firstVid) {
        GateApp.updateMainPlayerWatchedButton(firstVid.id);
      }
    },

    playInSubjectMasterPlayer: function (subjectId, cIdx, vIdx) {
      const subject = (window.GATE_DA_SUBJECTS || []).find(s => s.id === subjectId || s.topic_key === subjectId);
      if (!subject) return;
      const chapter = subject.chapters[cIdx];
      if (!chapter) return;
      const video = chapter.videos[vIdx];
      if (!video) return;

      currentMainVideo = {
        subjectId,
        chapterIdx: cIdx,
        videoIdx: vIdx,
        video,
        chapterTitle: chapter.title
      };

      // Update Iframe
      const iframe = document.getElementById('mainSubjectPlayerIframe');
      if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`;
      }

      // Update Labels
      const badgeEl = document.getElementById('mainPlayerChapterBadge');
      const titleEl = document.getElementById('mainPlayerVideoTitle');
      if (badgeEl) badgeEl.textContent = `${subject.title} • ${chapter.title}`;
      if (titleEl) titleEl.textContent = video.title;

      GateApp.updateMainPlayerWatchedButton(video.id);

      // Scroll smoothly to player
      const playerSec = document.getElementById('subjectMasterPlayerSection');
      if (playerSec) {
        playerSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    updateMainPlayerWatchedButton: function (vidId) {
      const btn = document.getElementById('mainPlayerWatchedToggleBtn');
      if (!btn) return;
      const isDone = GateApp.isWatched(vidId);
      if (isDone) {
        btn.innerHTML = '<i class="fa-solid fa-circle-check" style="color:var(--emerald);"></i> Watched';
        btn.classList.add('active');
      } else {
        btn.innerHTML = '<i class="fa-regular fa-circle"></i> Mark as Done';
        btn.classList.remove('active');
      }
    },

    toggleMainPlayerWatched: function () {
      if (!currentMainVideo || !currentMainVideo.video) return;
      const vidId = currentMainVideo.video.id;
      const current = GateApp.isWatched(vidId);
      GateApp.setWatched(vidId, !current);
      GateApp.updateMainPlayerWatchedButton(vidId);
      
      // Update card in chapter list
      const card = document.getElementById(`vcard-${vidId}`);
      if (card) {
        card.classList.toggle('watched', !current);
        const cb = card.querySelector('input[type="checkbox"]');
        if (cb) cb.checked = !current;
      }
      GateApp.refreshAllProgress();
    },

    nextMainVideo: function () {
      if (!currentMainVideo) return;
      const subject = (window.GATE_DA_SUBJECTS || []).find(s => s.id === currentMainVideo.subjectId);
      if (!subject) return;

      // Flatten
      const flatList = [];
      subject.chapters.forEach((ch, cI) => {
        ch.videos.forEach((v, vI) => {
          flatList.push({ cI, vI, v });
        });
      });

      const currentIdx = flatList.findIndex(item => item.v.id === currentMainVideo.video.id);
      if (currentIdx !== -1 && currentIdx < flatList.length - 1) {
        const next = flatList[currentIdx + 1];
        GateApp.playInSubjectMasterPlayer(subject.id, next.cI, next.vI);
      }
    },

    prevMainVideo: function () {
      if (!currentMainVideo) return;
      const subject = (window.GATE_DA_SUBJECTS || []).find(s => s.id === currentMainVideo.subjectId);
      if (!subject) return;

      const flatList = [];
      subject.chapters.forEach((ch, cI) => {
        ch.videos.forEach((v, vI) => {
          flatList.push({ cI, vI, v });
        });
      });

      const currentIdx = flatList.findIndex(item => item.v.id === currentMainVideo.video.id);
      if (currentIdx > 0) {
        const prev = flatList[currentIdx - 1];
        GateApp.playInSubjectMasterPlayer(subject.id, prev.cI, prev.vI);
      }
    },

    openMainVideoInTheater: function () {
      if (!currentMainVideo) return;
      GatePlayer.openTheater(currentMainVideo.subjectId, currentMainVideo.chapterIdx, currentMainVideo.videoIdx);
    },

    toggleChapter: function (cIdx) {
      const card = document.getElementById(`chapter-card-${cIdx}`);
      if (card) card.classList.toggle('open');
    },

    scrollToChapter: function (cIdx) {
      const card = document.getElementById(`chapter-card-${cIdx}`);
      if (card) {
        card.classList.add('open');
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    handleVideoCheck: function (vidId, isChecked, subjectId) {
      GateApp.setWatched(vidId, isChecked);
      const card = document.getElementById(`vcard-${vidId}`);
      if (card) card.classList.toggle('watched', isChecked);
      if (currentMainVideo && currentMainVideo.video && currentMainVideo.video.id === vidId) {
        GateApp.updateMainPlayerWatchedButton(vidId);
      }
      GateApp.refreshAllProgress();
    },

    /* ---------------- DEDICATED LIVE COURSE PLAYER VIEW ---------------- */
    renderCoursePlayer: function () {
      const container = document.getElementById('playerViewContent');
      if (!container) return;

      const subjects = window.GATE_DA_SUBJECTS || [];
      const subject = subjects.find(s => s.id === playerSubjectId) || subjects[0];
      if (!subject) return;

      playerSubjectId = subject.id;
      const chapter = subject.chapters[playerChapterIdx] || subject.chapters[0];
      const video = chapter ? (chapter.videos[playerVideoIdx] || chapter.videos[0]) : null;

      // Flatten current subject videos
      const allVideos = [];
      subject.chapters.forEach((ch, cI) => {
        ch.videos.forEach((v, vI) => {
          allVideos.push({
            ...v,
            chapterTitle: ch.title,
            cI,
            vI
          });
        });
      });

      // Subject select options
      const subjOptionsHtml = subjects.map(s => `
        <option value="${s.id}" ${s.id === playerSubjectId ? 'selected' : ''}>${s.title} (${s.total_videos} videos)</option>
      `).join('');

      // Playlist items
      const playlistHtml = allVideos.map((v, idx) => {
        const isCurrent = video && v.id === video.id;
        const isDone = GateApp.isWatched(v.id);
        return `
          <div class="playlist-item ${isCurrent ? 'active' : ''}" onclick="GateApp.selectCoursePlayerVideo(${v.cI}, ${v.vI})" style="padding:8px 10px;">
            <img src="${v.thumbnail}" class="playlist-item-thumb" style="width:68px;" alt="" />
            <div class="playlist-item-info">
              <div class="playlist-item-title" style="font-size:0.82rem;">${v.title}</div>
              <div style="font-size:0.7rem; color:var(--text-faint); display:flex; gap:6px;">
                <span>${v.chapterTitle}</span>
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
            <h1 style="font-size:1.4rem; font-weight:800;">${subject.title}</h1>
          </div>

          <div style="display:flex; align-items:center; gap:10px;">
            <label style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">Subject:</label>
            <select style="background:var(--bg-card); color:var(--text-main); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:8px 12px; font-size:0.88rem; outline:none;" onchange="GateApp.switchCoursePlayerSubject(this.value)">
              ${subjOptionsHtml}
            </select>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 360px; gap:20px; @media(max-width:1024px){grid-template-columns:1fr;}">
          <!-- Video Stage -->
          <div>
            <div style="width:100%; aspect-ratio:16/9; background:#000; border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow); margin-bottom:14px;">
              <iframe id="liveCourseIframe" src="https://www.youtube.com/embed/${video ? video.id : ''}?autoplay=1&rel=0&modestbranding=1" style="width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>

            <!-- Controls bar -->
            <div class="player-controls-bar">
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

              <div style="font-size:0.85rem; font-weight:600; color:var(--text-main);">
                ${video ? video.title : ''}
              </div>
            </div>

            <!-- Personal Notes Pad for this Video -->
            <div class="stat-card" style="flex-direction:column; align-items:flex-start; margin-top:16px;">
              <div style="display:flex; justify-content:space-between; width:100%; margin-bottom:8px;">
                <span style="font-size:0.85rem; font-weight:700;"><i class="fa-solid fa-pencil" style="color:var(--accent-amber);"></i> Lecture Study Notes</span>
                <span style="font-size:0.75rem; color:var(--emerald); font-weight:600;" id="coursePlayerNotesStatus"></span>
              </div>
              <textarea id="coursePlayerNotesInput" class="notes-textarea" placeholder="Take personal study notes for this lecture (auto-saved to your study journal)..." oninput="GateApp.saveCoursePlayerNotes('${video ? video.id : ''}')"></textarea>
            </div>
          </div>

          <!-- Playlist Sidebar -->
          <div class="stat-card" style="flex-direction:column; align-items:flex-start; padding:14px; height:calc(100vh - 220px); min-height:550px;">
            <div style="font-size:0.9rem; font-weight:700; margin-bottom:12px; display:flex; justify-content:space-between; width:100%;">
              <span><i class="fa-solid fa-list-ul" style="color:var(--accent-amber);"></i> Course Lectures</span>
              <span class="brand-badge">${allVideos.length} Videos</span>
            </div>
            <div style="overflow-y:auto; width:100%; flex-grow:1;">
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

    selectCoursePlayerVideo: function (cI, vI) {
      playerChapterIdx = cI;
      playerVideoIdx = vI;
      GateApp.renderCoursePlayer();
    },

    nextCoursePlayerVideo: function () {
      const subject = (window.GATE_DA_SUBJECTS || []).find(s => s.id === playerSubjectId);
      if (!subject) return;

      const allVideos = [];
      subject.chapters.forEach((ch, cI) => {
        ch.videos.forEach((v, vI) => {
          allVideos.push({ cI, vI });
        });
      });

      const currentFlatIdx = allVideos.findIndex(item => item.cI === playerChapterIdx && item.vI === playerVideoIdx);
      if (currentFlatIdx !== -1 && currentFlatIdx < allVideos.length - 1) {
        const next = allVideos[currentFlatIdx + 1];
        playerChapterIdx = next.cI;
        playerVideoIdx = next.vI;
        GateApp.renderCoursePlayer();
      }
    },

    prevCoursePlayerVideo: function () {
      const subject = (window.GATE_DA_SUBJECTS || []).find(s => s.id === playerSubjectId);
      if (!subject) return;

      const allVideos = [];
      subject.chapters.forEach((ch, cI) => {
        ch.videos.forEach((v, vI) => {
          allVideos.push({ cI, vI });
        });
      });

      const currentFlatIdx = allVideos.findIndex(item => item.cI === playerChapterIdx && item.vI === playerVideoIdx);
      if (currentFlatIdx > 0) {
        const prev = allVideos[currentFlatIdx - 1];
        playerChapterIdx = prev.cI;
        playerVideoIdx = prev.vI;
        GateApp.renderCoursePlayer();
      }
    },

    toggleCoursePlayerWatched: function (vidId) {
      if (!vidId) return;
      const current = GateApp.isWatched(vidId);
      GateApp.setWatched(vidId, !current);
      GateApp.renderCoursePlayer();
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
            <div style="display: flex; align-items: center; gap: 12px; padding: 8px 12px; background: var(--bg-secondary); border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 6px;">
              <input type="checkbox" ${isDone ? 'checked' : ''} onchange="GateApp.toggleSyllabusTopic('${t.id}', this.checked)" style="accent-color: var(--emerald); width: 16px; height: 16px; cursor: pointer;" />
              <span style="font-size: 0.86rem; ${isDone ? 'text-decoration: line-through; color: var(--text-faint);' : 'color: var(--text-main);'} flex-grow: 1;">${t.title}</span>
              ${t.highYield ? '<span class="brand-badge" style="font-size: 0.65rem; padding: 2px 6px;">High Yield</span>' : ''}
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
            <div class="chapter-body" style="display: block;">
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
          <ul style="padding-left: 20px; font-size: 0.84rem; color: var(--text-muted); line-height: 1.6;">
            ${r.milestones.map(m => `<li>${m}</li>`).join('')}
          </ul>
        </div>
      `).join('');

      container.innerHTML = `
        <div class="hero-banner">
          <div class="hero-tag"><i class="fa-solid fa-compass"></i> Strategy Blueprint</div>
          <h1 class="hero-title">Official GATE DA 2027 Syllabus & Strategy</h1>
          <p class="hero-subtitle">Section-by-section breakdown, subject weightage based on GATE DA 2024 & 2025 examinations, and a 4-phase master roadmap to score 70+ marks.</p>
        </div>

        <h3 class="section-title" style="margin-bottom: 14px;"><i class="fa-solid fa-chart-pie" style="color:var(--accent-amber);"></i> Subject-Wise Weightage Analysis</h3>
        ${weightageTableHtml}

        <h3 class="section-title" style="margin-bottom: 14px;"><i class="fa-solid fa-road" style="color:var(--emerald);"></i> 4-Phase Master Preparation Roadmap</h3>
        <div style="margin-bottom: 28px;">${roadmapHtml}</div>

        <h3 class="section-title" style="margin-bottom: 14px;"><i class="fa-solid fa-list-check" style="color:var(--blue);"></i> Interactive Topic-by-Topic Syllabus Tracker</h3>
        ${sectionsHtml}
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

    /* ---------------- FORMULAS VIEW ---------------- */
    renderFormulas: function () {
      const container = document.getElementById('formulasViewContent');
      if (!container) return;

      const formulasData = window.GATE_DA_FORMULAS || [];

      let html = `
        <div class="hero-banner">
          <div class="hero-tag"><i class="fa-solid fa-square-root-variable"></i> Rapid Revision Sheets</div>
          <h1 class="hero-title">GATE DA High-Yield Formula Cheatsheets</h1>
          <p class="hero-subtitle">Essential mathematical identities, theorems, machine learning loss functions, and database formulas for quick daily morning revision.</p>
        </div>
      `;

      formulasData.forEach(cat => {
        html += `
          <div style="margin-bottom: 32px;">
            <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 16px; color: var(--accent-amber); display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-atom"></i> ${cat.category}
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
              ${cat.items.map(item => `
                <div class="formula-card">
                  <div class="formula-name">${item.name}</div>
                  <div class="formula-math" style="font-size:1.05rem; overflow-x:auto;">$$${item.formula}$$</div>
                  <div class="formula-notes">${item.notes}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      });

      container.innerHTML = html;
      GateApp.renderMath(container);
    },

    renderMath: function (containerEl) {
      const target = containerEl || document.body;
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(target, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
          ],
          throwOnError: false
        });
      } else {
        // Retry if KaTeX script is still loading
        setTimeout(() => {
          if (typeof renderMathInElement === 'function') {
            renderMathInElement(target, {
              delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false },
                { left: '\\(', right: '\\)', display: false },
                { left: '\\[', right: '\\]', display: true }
              ],
              throwOnError: false
            });
          }
        }, 500);
      }
    },

    /* ---------------- NOTES & BOOKMARKS VIEW ---------------- */
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
              videoTitle: foundVid ? foundVid.title : 'Lecture Note',
              subjectTitle: foundSubj ? foundSubj.title : 'GATE DA'
            });
          }
        }
      }

      let notesHtml = '';
      if (!notesList.length) {
        notesHtml = `
          <div style="padding: 48px; text-align: center; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
            <i class="fa-regular fa-note-sticky" style="font-size: 2.5rem; color: var(--text-faint); margin-bottom: 12px; display: block;"></i>
            <h3 style="font-size: 1.1rem; margin-bottom: 6px;">No study notes created yet</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); max-width: 460px; margin: 0 auto 16px;">
              Open any lecture in the Live Player or Theater Study Room to type notes that automatically save here for quick revision.
            </p>
          </div>
        `;
      } else {
        notesHtml = `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
            ${notesList.map(n => `
              <div class="stat-card" style="flex-direction: column; align-items: flex-start;">
                <div style="font-size: 0.75rem; color: var(--accent-amber); font-weight: 700; margin-bottom: 4px;">${n.subjectTitle}</div>
                <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 10px;">${n.videoTitle}</h4>
                <div style="background: var(--bg-primary); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); width: 100%; font-size: 0.85rem; line-height: 1.5; white-space: pre-wrap; margin-bottom: 12px; color: var(--text-main);">
                  ${n.noteText}
                </div>
                <div style="display: flex; gap: 8px; width: 100%; justify-content: flex-end;">
                  <button class="btn-secondary btn-sm" onclick="GateApp.deleteNote('${n.vidId}')">
                    <i class="fa-solid fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }

      container.innerHTML = `
        <div class="hero-banner">
          <div class="hero-tag"><i class="fa-solid fa-pencil"></i> Personal Study Journal</div>
          <h1 class="hero-title">My Lecture Notes & Bookmarks</h1>
          <p class="hero-subtitle">Review all your personal timestamped notes taken during video lectures across all 9 subjects.</p>
          <div style="display:flex; gap:12px;">
            <button class="btn-primary btn-sm" onclick="GateApp.exportNotes()">
              <i class="fa-solid fa-file-export"></i> Export Notes (Markdown)
            </button>
            <button class="btn-secondary btn-sm" onclick="GateApp.exportProgress()">
              <i class="fa-solid fa-download"></i> Backup Study Progress
            </button>
          </div>
        </div>

        ${notesHtml}
      `;
    },

    deleteNote: function (vidId) {
      if (confirm('Are you sure you want to delete this note?')) {
        localStorage.removeItem(`gx-note:${vidId}`);
        GateApp.renderNotesView();
      }
    },

    exportNotes: function () {
      let md = '# GATE DA 2027 - My Personal Study Notes\n\n';
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
            action: () => {
              GateApp.showSubject(s.id);
              setTimeout(() => GateApp.scrollToChapter(cI), 300);
            }
          });

          ch.videos.forEach((v, vI) => {
            searchIndex.push({
              type: 'Lecture',
              title: v.title,
              subtitle: `${s.title} • ${ch.title}`,
              action: () => {
                GateApp.showSubject(s.id);
                setTimeout(() => GateApp.playInSubjectMasterPlayer(s.id, cI, vI), 300);
              }
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
