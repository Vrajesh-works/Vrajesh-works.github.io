/* Native scrolling moves the landscape gently; content never waits on a timeline. */
(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let pending = false;
  function paint() {
    pending = false;
    const enabled = !reduced.matches && root.dataset.motion === 'on';
    root.style.setProperty('--world-travel', enabled ? `${Math.min(55, scrollY * .025)}px` : '0px');
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(paint); } }
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule, {passive:true});
  reduced.addEventListener('change', schedule);
  new MutationObserver(schedule).observe(root, {attributes:true,attributeFilter:['data-motion']});
  paint();
})();
