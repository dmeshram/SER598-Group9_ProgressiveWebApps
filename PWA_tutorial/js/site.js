
(function () {
    'use strict';

    function filenameFromPath(p) {
        if (!p) return '';
        if (p.endsWith('/')) return 'index.html';
        var parts = p.split('/');
        return parts[parts.length - 1] || 'index.html';
    }

    function highlightCurrentItem() {
        var tocItems = document.querySelectorAll('.toc-item');
        var currentFile = filenameFromPath(window.location.pathname);
        if (!currentFile) currentFile = 'index.html';

        tocItems.forEach(function (li) {
            var page = li.getAttribute('data-page') || '';
            if (!page) {
                var link = li.querySelector('.toc-link');
                if (link) {
                    var href = link.getAttribute('href');
                    page = href ? href.split('/').pop() : '';
                }
            }

            if (page) {
                if (page === currentFile || (page === 'index.html' && (currentFile === '' || currentFile === 'index.html'))) {
                    li.classList.add('toc-current');
                    li.setAttribute('aria-current', 'page');
                } else {
                    li.classList.remove('toc-current');
                    li.removeAttribute('aria-current');
                }
            }
        });
    }

    function setupSidebarToggle() {
        var toggle = document.getElementById('navToggle');
        var sidebar = document.getElementById('sidebar');

        if (!toggle || !sidebar) return;

        function setExpanded(isExpanded) {
            toggle.setAttribute('aria-expanded', String(isExpanded));
            if (isExpanded) {
                sidebar.classList.add('open');
            } else {
                sidebar.classList.remove('open');
            }
        }

        toggle.addEventListener('click', function (e) {
            var expanded = toggle.getAttribute('aria-expanded') === 'true';
            setExpanded(!expanded);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                setExpanded(false);
                toggle.focus();
            }
        });

        document.addEventListener('click', function (e) {
            if (!sidebar.classList.contains('open')) return;
            var target = e.target;
            if (!sidebar.contains(target) && target !== toggle) {
                setExpanded(false);
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 900) {
                setExpanded(false);
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        highlightCurrentItem();
        setupSidebarToggle();
    });

})();
