/* Pause decorative CSS motion when offscreen, during the intro, or in a hidden tab. */
(() => {
  'use strict';
  const root = document.documentElement;
  const scenes = [...document.querySelectorAll('.motion-art')];
  if (!scenes.length) return;
  const visible = new Map(scenes.map(scene => [scene, false]));
  function sync() {
    const enabled = root.dataset.motion === 'on' && !root.dataset.intro && !document.hidden;
    scenes.forEach(scene => { scene.dataset.running = String(enabled && visible.get(scene)); });
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => visible.set(entry.target, entry.isIntersecting));
      sync();
    });
    scenes.forEach(scene => observer.observe(scene));
  } else {
    scenes.forEach(scene => visible.set(scene, true));
  }
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-motion', 'data-intro'] });
  document.addEventListener('visibilitychange', sync);
  sync();
})();
