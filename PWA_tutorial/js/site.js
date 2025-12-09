/* js/site.js
 - Highlights the current sidebar item based on URL (filename or '/')
 - Adds accessible mobile toggle behavior for the sidebar
*/

(function () {
    'use strict';

    // Helper: get filename from a path (e.g. /foo/index.html -> index.html)
    function filenameFromPath(p) {
        if (!p) return '';
        // if path ends with /, return index.html (or just '')
        if (p.endsWith('/')) return 'index.html';
        var parts = p.split('/');
        return parts[parts.length - 1] || 'index.html';
    }

    // Highlight current TOC item
    function highlightCurrentItem() {
        var tocItems = document.querySelectorAll('.toc-item');
        var currentFile = filenameFromPath(window.location.pathname);
        // If running from file:// or path has no filename, fall back to index.html
        if (!currentFile) currentFile = 'index.html';

        tocItems.forEach(function (li) {
            // data-page attribute used on each toc-item
            var page = li.getAttribute('data-page') || '';
            if (!page) {
                // try to find contained link href
                var link = li.querySelector('.toc-link');
                if (link) {
                    var href = link.getAttribute('href');
                    page = href ? href.split('/').pop() : '';
                }
            }

            if (page) {
                // match loosely: index.html vs /index.html or index
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

    // Sidebar toggle for mobile
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

        // Toggle on click
        toggle.addEventListener('click', function (e) {
            var expanded = toggle.getAttribute('aria-expanded') === 'true';
            setExpanded(!expanded);
        });

        // Close on Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                setExpanded(false);
                toggle.focus();
            }
        });

        // Click outside to close (only when open and small screen)
        document.addEventListener('click', function (e) {
            if (!sidebar.classList.contains('open')) return;
            var target = e.target;
            if (!sidebar.contains(target) && target !== toggle) {
                setExpanded(false);
            }
        });

        // Collapse when resizing to large screens
        window.addEventListener('resize', function () {
            if (window.innerWidth > 900) {
                setExpanded(false);
            }
        });
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function () {
        highlightCurrentItem();
        setupSidebarToggle();
    });

})();
