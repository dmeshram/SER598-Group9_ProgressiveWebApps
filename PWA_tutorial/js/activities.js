// js/activities.js
// Handles lab accordion, mark-complete with localStorage, and quiz logic

(function () {
  'use strict';

  // LAB ACCORDION TOGGLE
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.matches('.lab-toggle')) {
      var id = t.getAttribute('data-target');
      var body = document.getElementById(id);
      var expanded = t.getAttribute('aria-expanded') === 'true';
      if (!body) return;
      if (expanded) {
        body.hidden = true;
        t.setAttribute('aria-expanded', 'false');
        t.textContent = 'Open';
      } else {
        body.hidden = false;
        t.setAttribute('aria-expanded', 'true');
        t.textContent = 'Close';
      }
    }

    // Mark complete toggles
    if (t.matches('.lab-complete')) {
      var labKey = t.getAttribute('data-lab'); // e.g., lab-manifest
      toggleLabComplete(labKey, t);
    }
  });

  // Toggle mark complete: store boolean in localStorage and update UI
  function toggleLabComplete(key, btn) {
    if (!key) return;
    var storageKey = 'activity:' + key;
    var completed = localStorage.getItem(storageKey) === 'true';
    completed = !completed;
    localStorage.setItem(storageKey, completed ? 'true' : 'false');
    updateLabButton(key, btn);
  }

  // Update buttons on init and after change
  function updateLabButton(key, btnIfProvided) {
    var storageKey = 'activity:' + key;
    var completed = localStorage.getItem(storageKey) === 'true';
    var btn = btnIfProvided;
    if (!btn) {
      // find the button
      var selector = '.lab-complete[data-lab="' + key + '"]';
      btn = document.querySelector(selector);
    }
    if (!btn) return;
    if (completed) {
      btn.textContent = 'Completed ✓';
      btn.disabled = false;
      btn.style.background = '#e6f7ea';
      btn.style.color = '#0b6b2b';
    } else {
      btn.textContent = 'Mark complete';
      btn.style.background = '';
      btn.style.color = '';
    }
  }

  // Initialize lab states on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    var labButtons = document.querySelectorAll('.lab-complete');
    labButtons.forEach(function (b) {
      var key = b.getAttribute('data-lab');
      updateLabButton(key, b);
    });

    // Set any lab bodies to hidden initially (unless button is "Open")
    var toggles = document.querySelectorAll('.lab-toggle');
    toggles.forEach(function (t) {
      var id = t.getAttribute('data-target');
      var body = document.getElementById(id);
      if (body) body.hidden = true;
      t.setAttribute('aria-expanded', 'false');
      t.textContent = 'Open';
    });
  });

  // QUIZ LOGIC
  var quizAnswers = {
    q1: 'b', // manifest.json
    q2: 'c', // stale-while-revalidate
    q3: 'a'  // mvn spring-boot:run
  };

  document.getElementById('submit-quiz').addEventListener('click', function () {
    var resultEl = document.getElementById('quiz-result');
    resultEl.innerHTML = '';
    var score = 0;
    var total = Object.keys(quizAnswers).length;
    Object.keys(quizAnswers).forEach(function (q) {
      var els = document.getElementsByName(q);
      var selected = null;
      for (var i = 0; i < els.length; i++) {
        if (els[i].checked) { selected = els[i].value; break; }
      }
      if (selected === quizAnswers[q]) score++;
    });

    var pct = Math.round((score / total) * 100);
    var summary = document.createElement('div');
    summary.innerHTML = '<strong>Score:</strong> ' + score + '/' + total + ' (' + pct + '%)';
    resultEl.appendChild(summary);

    // friendly feedback
    var feedback = document.createElement('div');
    feedback.style.marginTop = '8px';
    if (score === total) {
      feedback.textContent = 'Excellent — you got all answers correct.';
    } else if (score >= total - 1) {
      feedback.textContent = 'Good job — one small mistake. Revisit the labs if unsure.';
    } else {
      feedback.textContent = 'Keep practicing — review the labs and try again.';
    }
    resultEl.appendChild(feedback);

    // Save quiz result to localStorage
    localStorage.setItem('activity:quiz-score', score.toString());
  });

  // Reset quiz
  document.getElementById('reset-quiz').addEventListener('click', function () {
    var form = document.getElementById('quiz-form');
    form.reset();
    var resultEl = document.getElementById('quiz-result');
    resultEl.innerHTML = '';
    localStorage.removeItem('activity:quiz-score');
  });

})();
