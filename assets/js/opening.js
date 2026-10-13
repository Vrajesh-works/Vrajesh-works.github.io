(() => {
  'use strict';
  const root = document.documentElement;
  const dialog = document.getElementById('opening');
  const replay = document.getElementById('intro-replay');
  if (!dialog || typeof dialog.showModal !== 'function' || typeof dialog.animate !== 'function') { delete root.dataset.intro; return; }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const skip = document.getElementById('opening-skip');
  const chapter = document.getElementById('opening-chapter');
  const flight = dialog.querySelector('.opening-feather');
  const timers = new Set();
  const animations = new Set();
  let run = 0, playing = false, previousFocus, previousOverflow = '';
  const later = (callback, delay) => { const id = setTimeout(() => { timers.delete(id); callback(); }, delay); timers.add(id); };
  function animate(element, frames, options) {
    const animation = element.animate(frames, { fill: 'both', ...options });
    animations.add(animation); return animation;
  }
  function finish() {
    if (!playing) { delete root.dataset.intro; return; }
    playing = false; run++;
    timers.forEach(clearTimeout); timers.clear();
    animations.forEach(animation => animation.cancel()); animations.clear();
    delete dialog.dataset.playing; delete dialog.dataset.stage; delete root.dataset.intro;
    document.body.style.overflow = previousOverflow;
    if (dialog.open) dialog.close();
    try { sessionStorage.setItem('portfolio-opening-seen', '1'); } catch { /* Optional. */ }
    const target = previousFocus === replay ? replay : document.getElementById('hero-title');
    if (target) { if (target.tagName !== 'BUTTON') target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
  }
  async function start() {
    if (playing) return;
    if (reduced.matches || root.dataset.motion !== 'on') { delete root.dataset.intro; return; }
    playing = true; const thisRun = ++run;
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    root.dataset.intro = 'loading';
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.overflow = 'hidden';
    chapter.textContent = '01 / THE STILLNESS';
    try { dialog.showModal(); } catch { finish(); return; }
    skip.focus({ preventScroll: true });
    // Fail open: an unavailable or slow illustration must never block the portfolio.
    later(finish, 4500);
    try {
      await Promise.all([...dialog.querySelectorAll('img[data-src]')].map(img => {
        if (!img.getAttribute('src')) img.src = img.dataset.src;
        return img.decode();
      }));
    } catch { if (thisRun === run) finish(); return; }
    if (thisRun !== run || !playing) return;
    timers.forEach(clearTimeout); timers.clear();
    later(finish, 8500); // Independent fail-open deadline, including unexpected animation errors.
    root.dataset.intro = 'playing'; dialog.dataset.playing = 'true';
    animate(dialog.querySelector('.opening-world'), [{opacity:0},{opacity:1,offset:.12},{opacity:1}], {duration:6400});
    animate(dialog.querySelector('.opening-copy'), [{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)',offset:.18},{opacity:1,offset:.65},{opacity:0,transform:'translateY(-10px)'}], {duration:6200});
    later(() => { chapter.textContent = '02 / A MOMENT IN THE RAIN'; }, 1300);
    later(() => { dialog.dataset.stage = 'wind'; chapter.textContent = '03 / A FEATHER TAKES FLIGHT'; }, 3400);
    later(() => {
      const fan = dialog.querySelector('.peacock-fan').getBoundingClientRect();
      const target = document.querySelector('.hero-feather').getBoundingClientRect();
      flight.style.width = `${target.width}px`; flight.style.height = `${target.height}px`;
      const transform = (cx, cy, rotation, scale) => `translate3d(${cx - target.width / 2}px,${cy - target.height / 2}px,0) rotate(${rotation}deg) scale(${scale})`;
      animate(flight, [
        {opacity:0,transform:transform(fan.left+fan.width*.72,fan.top+fan.height*.35,-32,.16)},
        {opacity:1,transform:transform(fan.left+fan.width*.83,fan.top+fan.height*.12,12,.3),offset:.18},
        {opacity:1,transform:transform(innerWidth*.5,innerHeight*.30,105,.55),offset:.48},
        {opacity:1,transform:transform(target.left+target.width*.48,target.top+target.height*.45,-12,.88),offset:.78},
        {opacity:1,transform:transform(target.left+target.width/2,target.top+target.height/2,0,1)}
      ], {duration:3400,easing:'cubic-bezier(.3,.05,.2,1)'});
    }, 4300);
    later(() => {
      chapter.textContent = '04 / WELCOME TO MY WORLD';
      animate(dialog.querySelector('.opening-wash'), [{opacity:0},{opacity:1,offset:.43},{opacity:1,offset:.64},{opacity:0}], {duration:2200});
      animate(dialog.querySelector('.opening-world'), [{opacity:1},{opacity:0}], {duration:1300});
      animate(dialog, [{backgroundColor:'#102c50'},{backgroundColor:'transparent'}], {duration:1300});
      animate(dialog.querySelector('.opening-top'), [{opacity:1},{opacity:0}], {duration:1000,delay:900});
      animate(dialog.querySelector('.opening-bottom'), [{opacity:1},{opacity:0}], {duration:1000,delay:900});
    }, 5700);
    later(finish, 8100);
  }
  skip.addEventListener('click', finish);
  dialog.addEventListener('cancel', event => { event.preventDefault(); finish(); });
  replay.addEventListener('click', start);
  function syncPreference() {
    replay.hidden = reduced.matches || root.dataset.motion !== 'on';
    if (replay.hidden && playing) finish();
  }
  reduced.addEventListener('change', syncPreference);
  new MutationObserver(syncPreference).observe(root, {attributes:true,attributeFilter:['data-motion']});
  document.addEventListener('visibilitychange', () => { if (document.hidden && playing) finish(); });
  window.addEventListener('pagehide', finish);
  window.addEventListener('resize', () => { if (playing && dialog.dataset.stage === 'wind') finish(); });
  syncPreference();
  if (root.dataset.intro === 'pending') start();
})();
