(function () {
  'use strict';

  var toggle = document.querySelector('[data-lbg-menu-toggle]');
  var nav = document.querySelector('[data-lbg-nav]');

  if (!toggle || !nav) return;

  function close() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) close();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1100) close();
  });
})();
