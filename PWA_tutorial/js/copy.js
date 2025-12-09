// js/copy.js
// Small copy-to-clipboard helper used by code blocks with .copy-btn and data-target

document.addEventListener('click', function (e) {
    var btn = e.target.closest('.copy-btn');
    if (!btn) return;
    var targetId = btn.getAttribute('data-target');
    if (!targetId) return;
    var el = document.getElementById(targetId);
    if (!el) return;

    // copy the text content (preserve formatting)
    var text = el.innerText || el.textContent;
    navigator.clipboard.writeText(text).then(function () {
        var previous = btn.textContent;
        btn.textContent = 'Copied ✓';
        setTimeout(function () { btn.textContent = previous; }, 1400);
    }).catch(function (err) {
        console.error('Copy failed', err);
        btn.textContent = 'Copy failed';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1400);
    });
});
