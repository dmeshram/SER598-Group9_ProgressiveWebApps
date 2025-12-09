document.addEventListener('click', function (e) {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    const targetId = btn.getAttribute('data-target');
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (!el) return;


    const text = el.innerText || el.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const original = btn.textContent;
        btn.textContent = 'Copied ✓';
        setTimeout(() => { btn.textContent = original; }, 1400);
    }).catch((err) => {
        console.error('Copy failed', err);
        btn.textContent = 'Copy failed';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1400);
    });
});
