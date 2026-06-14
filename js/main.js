(function () {
  'use strict';

  var nav = document.querySelector('.site-nav');
  var menuToggle = document.querySelector('.menu-toggle');
  var pages = document.querySelectorAll('.page[data-page]');
  var pageTitles = {
    home:         "Recyclopedia — The World's Most Complete Recycling Resource",
    academy:      'Academy | Recyclopedia',
    recyclopedia: 'Search | Recyclopedia',
    donate:       'Donate Electronics | Recyclopedia',
    about:        'About | Recyclopedia'
  };

  function closeMenu() {
    if (!nav || !menuToggle) return;
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  function activatePage(page) {
    if (!pageTitles[page]) page = 'home';
    pages.forEach(function (s) {
      s.classList.toggle('is-active', s.dataset.page === page);
    });
    document.querySelectorAll('.site-nav a[data-page]').forEach(function (l) {
      l.classList.toggle('is-active', l.dataset.page === page);
    });
    document.title = pageTitles[page];
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[data-page], button[data-page]');
    if (!link) return;
    var page = link.dataset.page;
    if (!page || !pageTitles[page]) return;
    e.preventDefault();
    history.pushState(null, '', '#' + page);
    activatePage(page);
  });

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  window.addEventListener('popstate', function () {
    activatePage(window.location.hash.replace('#', '') || 'home');
  });

  activatePage(window.location.hash.replace('#', '') || 'home');
})();
