(function () {
  const LS_KEY = 'pwa_activities_progress_v1';


  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  function loadState() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn('Could not read saved progress', e);
      return {};
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save progress', e);
    }
  }

  function toggleLab(button) {
    const targetId = button.dataset.target;
    if (!targetId) return;
    const body = document.getElementById(targetId);
    if (!body) return;

    const expanded = button.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      body.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      button.textContent = 'Open';
    } else {
      body.hidden = false;
      button.setAttribute('aria-expanded', 'true');
      button.textContent = 'Close';
    }
  }
  function toggleComplete(button) {
    const labId = button.dataset.lab;
    if (!labId) return;
    const state = loadState();
    state[labId] = !state[labId];
    saveState(state);
    applyState();
  }

  function applyState() {
    const state = loadState();
    $$('.lab-complete').forEach(btn => {
      const labId = btn.dataset.lab;
      const completed = !!state[labId];
      btn.setAttribute('aria-pressed', String(completed));
      btn.textContent = completed ? 'Completed ✓' : 'Mark complete';
      // Add subtle visual marker to lab element
      const labEl = document.getElementById(labId);
      if (labEl) {
        if (completed) labEl.classList.add('lab-done');
        else labEl.classList.remove('lab-done');
      }
    });
  }


  function gradeQuiz() {
    const resultEl = document.getElementById('quiz-result');
    if (!resultEl) return;
    const answers = { q1: 'b', q2: 'c', q3: 'a' };
    let score = 0;
    let total = 0;

    Object.keys(answers).forEach(q => {
      total += 1;
      const sel = document.querySelector(`input[name="${q}"]:checked`);
      if (sel && sel.value === answers[q]) score += 1;
    });

    resultEl.setAttribute('aria-live', 'polite');
    const pct = Math.round((score / total) * 100);
    let message = `You scored ${score}/${total} (${pct}%).`;
    if (pct === 100) message += ' Great job — you nailed it!';
    else if (pct >= 66) message += ' Good work — review the labs to hit 100%.';
    else message += ' Keep practicing — try the labs again.';
    resultEl.textContent = message;

    const state = loadState();
    state.__quiz = { score, total, ts: Date.now() };
    saveState(state);
  }

  function resetQuiz() {
    document.getElementById('quiz-form').reset();
    const r = document.getElementById('quiz-result');
    if (r) r.textContent = '';
    const state = loadState();
    delete state.__quiz;
    saveState(state);
  }

  function restoreUI() {
    applyState();

    const state = loadState();
    if (state.__quiz && state.__quiz.score != null) {
      const resultEl = document.getElementById('quiz-result');
      if (resultEl) {
        resultEl.textContent = `Previous score: ${state.__quiz.score}/${state.__quiz.total}.`;
      }
    }
  }

  document.addEventListener('click', function (ev) {
    const t = ev.target;
    const toggleBtn = t.closest('.lab-toggle');
    if (toggleBtn) {
      toggleLab(toggleBtn);
      return;
    }

    const completeBtn = t.closest('.lab-complete');
    if (completeBtn) {
      toggleComplete(completeBtn);
      return;
    }

    if (t.id === 'submit-quiz') {
      gradeQuiz();
      return;
    }
    if (t.id === 'reset-quiz') {
      resetQuiz();
      return;
    }

  });

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {

      if (!navigator.clipboard) return;
      const target = btn.dataset.target;
      if (!target) return;
      const el = document.getElementById(target);
      if (!el) return;
      const text = el.innerText || el.textContent;
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copied ✓';
        setTimeout(() => btn.textContent = orig, 1200);
      }).catch(() => {
        btn.textContent = 'Copy failed';
        setTimeout(() => btn.textContent = 'Copy', 1200);
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    restoreUI();

    $$('.lab-toggle').forEach(b => {
      const tid = b.dataset.target;
      const body = document.getElementById(tid);
      const expanded = body && !body.hidden;
      b.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      b.textContent = expanded ? 'Close' : 'Open';
    });
  });

  window.PWAActivities = { loadState, saveState, resetQuiz };
})();
