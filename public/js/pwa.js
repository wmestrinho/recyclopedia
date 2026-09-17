// Registers the service worker and holds on to the browser's install prompt
// so the Lens can offer it once, after a first successful scan (Card D.1).
// Additive only: the site and the camera work the same without any of this.
(function () {
  'use strict';
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  });

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    window.__rcyInstallPrompt = e;
  });

  window.addEventListener('appinstalled', function () {
    window.__rcyInstallPrompt = null;
  });
})();
