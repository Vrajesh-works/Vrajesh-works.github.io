/* Paint a quiet curtain before first render; never trap the site if startup fails. */
(() => {
  try {
    if (location.hash || matchMedia('(prefers-reduced-motion: reduce)').matches ||
        localStorage.getItem('portfolio-motion') === 'off' || sessionStorage.getItem('portfolio-opening-seen')) return;
    document.documentElement.dataset.intro = 'pending';
    setTimeout(() => {
      if (document.documentElement.dataset.intro === 'pending') delete document.documentElement.dataset.intro;
    }, 5000);
  } catch { /* Storage restrictions must not block access. */ }
})();
