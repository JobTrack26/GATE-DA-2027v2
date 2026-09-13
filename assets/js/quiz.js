/**
 * GATE DA 2027 Practice Quiz & Mock Arena Engine
 */

(function () {
  'use strict';

  let currentSubjectFilter = 'all';
  let userResponses = {}; // questionId -> selected options or numeric input
  let evaluatedQuestions = {}; // questionId -> boolean (isEvaluated)

  window.GateQuiz = {
    init: function () {
      GateQuiz.renderQuestions();
    },

    filterSubject: function (subj) {
      currentSubjectFilter = subj;
      GateQuiz.renderQuestions();
    },

    renderQuestions: function () {
      const container = document.getElementById('quizQuestionsList');
      if (!container) return;

      const questions = (window.GATE_DA_QUESTIONS || []).filter(q => {
        if (currentSubjectFilter === 'all') return true;
        return q.subject.toLowerCase().includes(currentSubjectFilter.toLowerCase());
      });

      if (!questions.length) {
        container.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--text-muted);">No questions found for this subject filter.</div>';
        return;
      }

      container.innerHTML = questions.map((q, idx) => {
        const isEval = evaluatedQuestions[q.id];
        const userAns = userResponses[q.id];

        let optionsHtml = '';

        if (q.type === 'MCQ' || q.type === 'MSQ') {
          optionsHtml = `
            <div class="quiz-options-group">
              ${(q.options || []).map((opt, oIdx) => {
                const optLetter = opt.trim().charAt(0); // 'A', 'B', etc.
                let isSelected = false;
                if (q.type === 'MCQ') isSelected = (userAns === optLetter);
                if (q.type === 'MSQ') isSelected = (Array.isArray(userAns) && userAns.includes(optLetter));

                let statusClass = '';
                if (isEval) {
                  if (q.type === 'MCQ') {
                    if (optLetter === q.correctAnswer) statusClass = 'correct';
                    else if (isSelected) statusClass = 'incorrect';
                  } else if (q.type === 'MSQ') {
                    const isCorrectOption = q.correctAnswer.includes(optLetter);
                    if (isCorrectOption) statusClass = 'correct';
                    else if (isSelected && !isCorrectOption) statusClass = 'incorrect';
                  }
                }

                return `
                  <div class="quiz-option ${isSelected ? 'selected' : ''} ${statusClass}" onclick="GateQuiz.selectOption('${q.id}', '${optLetter}', '${q.type}')">
                    <span style="font-weight: 700; width: 24px;">${optLetter}.</span>
                    <span>${opt.slice(3)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          `;
        } else if (q.type === 'NAT') {
          let natStatus = '';
          if (isEval) {
            const val = parseFloat(userAns);
            const isCorrect = (val >= q.tolerance[0] && val <= q.tolerance[1]);
            natStatus = isCorrect ? 'style="border-color:var(--emerald);color:var(--emerald);"' : 'style="border-color:var(--red);color:var(--red);"';
          }

          optionsHtml = `
            <div style="margin: 16px 0;">
              <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Enter Numerical Answer:</label>
              <div style="display: flex; gap: 12px; max-width: 320px;">
                <input type="number" step="any" class="form-control" id="nat-input-${q.id}" value="${userAns || ''}" ${isEval ? 'disabled' : ''} ${natStatus} style="background:var(--bg-primary); border:1px solid var(--border-color); color:var(--text-main); padding:8px 12px; border-radius:var(--radius-sm); width:100%; font-family:monospace;" placeholder="e.g. 27.94" onchange="GateQuiz.setNatAnswer('${q.id}', this.value)" />
              </div>
              ${isEval ? `<div style="font-size:0.8rem; margin-top:6px; color:var(--text-muted);">Accepted range: <strong>${q.tolerance[0]} to ${q.tolerance[1]}</strong></div>` : ''}
            </div>
          `;
        }

        return `
          <div class="quiz-card" id="quiz-card-${q.id}">
            <div class="quiz-header">
              <div style="display:flex; align-items:center; gap:10px;">
                <span class="quiz-badge-type">${q.type}</span>
                <span style="font-size:0.82rem; color:var(--text-faint); font-weight:600;">${q.subject} • ${q.topic}</span>
              </div>
              <span style="font-size:0.82rem; font-weight:700; color:var(--accent-amber);">${q.marks} Mark${q.marks > 1 ? 's' : ''}</span>
            </div>

            <div class="quiz-question-text">
              <strong>Q${idx + 1}.</strong> ${q.question.replace(/\n/g, '<br>')}
            </div>

            ${optionsHtml}

            <div style="display:flex; align-items:center; gap:12px; margin-top:16px;">
              ${!isEval ? `
                <button class="btn-primary btn-sm" onclick="GateQuiz.checkAnswer('${q.id}')">
                  <i class="fa-solid fa-check"></i> Check Answer
                </button>
              ` : `
                <button class="btn-secondary btn-sm" onclick="GateQuiz.resetQuestion('${q.id}')">
                  <i class="fa-solid fa-rotate-left"></i> Try Again
                </button>
              `}
            </div>

            <div class="quiz-explanation" id="expl-${q.id}" style="${isEval ? 'display:block;' : ''}">
              <div style="font-weight:700; margin-bottom:6px; color:var(--emerald); display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-circle-info"></i> Official Solution & Explanation:
              </div>
              <div style="white-space:pre-line; line-height:1.6; color:var(--text-main);">
                ${q.explanation}
              </div>
            </div>
          </div>
        `;
      }).join('');

      if (window.GateApp && window.GateApp.renderMath) {
        window.GateApp.renderMath(container);
      }
    },

    selectOption: function (qId, letter, type) {
      if (evaluatedQuestions[qId]) return;

      if (type === 'MCQ') {
        userResponses[qId] = letter;
      } else if (type === 'MSQ') {
        let arr = userResponses[qId] || [];
        if (!Array.isArray(arr)) arr = [];
        if (arr.includes(letter)) {
          arr = arr.filter(l => l !== letter);
        } else {
          arr.push(letter);
        }
        userResponses[qId] = arr;
      }

      GateQuiz.renderQuestions();
    },

    setNatAnswer: function (qId, val) {
      userResponses[qId] = val.trim();
    },

    checkAnswer: function (qId) {
      const q = (window.GATE_DA_QUESTIONS || []).find(item => item.id === qId);
      if (!q) return;

      if (q.type === 'NAT') {
        const input = document.getElementById(`nat-input-${qId}`);
        if (input) userResponses[qId] = input.value.trim();
      }

      if (userResponses[qId] === undefined || userResponses[qId] === '') {
        alert('Please select or enter an answer before checking.');
        return;
      }

      evaluatedQuestions[qId] = true;
      GateQuiz.renderQuestions();
    },

    resetQuestion: function (qId) {
      delete userResponses[qId];
      delete evaluatedQuestions[qId];
      GateQuiz.renderQuestions();
    }
  };
})();
