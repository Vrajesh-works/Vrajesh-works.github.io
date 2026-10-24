/* GSAP owns scroll transforms; scrolling, links and dialogs remain native. */
(() => {
  'use strict';
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const header = () => document.querySelector('.site-header')?.offsetHeight || 80;
  const $ = selector => document.querySelector(selector);
  const all = selector => gsap.utils.toArray(selector);
  const world = $('.scenic-world');
  // Fixed scenery cannot live inside a pinned/transformed ancestor.
  if (world) document.body.insertBefore(world, $('main'));
  const media = gsap.matchMedia();
  let enabled = false, initialized = false, refreshFrame = 0, breakpointReading, lastReading, resizeTimer;
  function captureReading() {
    const element = all('.project, #experience, #about, #contact, .scenic-hero').find(el => {
      const rect = el.getBoundingClientRect();
      return rect.top < header() + 180 && rect.bottom > header() + 180;
    });
    return element ? { element, top: element.getBoundingClientRect().top } : null;
  }
  function restoreReading(reading) {
    if (reading) window.scrollTo({ top: scrollY + reading.element.getBoundingClientRect().top - reading.top, behavior: 'instant' });
  }
  const start = () => `top ${header() + 28}px`;
  function reveal(targets, trigger, from = {}, to = {}) {
    if (!targets || !trigger || (Array.isArray(targets) && !targets.length)) return;
    return gsap.fromTo(targets, { y: 35, opacity: .3, ...from }, {
      y: 0, opacity: 1, ease: 'none', stagger: .1, ...to,
      scrollTrigger: { trigger, start: 'top 92%', end: 'top 50%', scrub: .45 }
    });
  }
  function build(desktop) {
    root.classList.add('cinematic');
    all('.is-waiting').forEach(el => el.classList.remove('is-waiting'));
    if ($('.scenic-hero')) {
      // No timed entrance: the first frame is already the portfolio.
      gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
        id: 'hero-journey', trigger: '.scenic-hero', start: () => `top ${header()}px`,
        end: () => `+=${innerHeight * (desktop ? .85 : .45)}`,
        pin: desktop && innerHeight >= 800, pinSpacing: true, scrub: .55, invalidateOnRefresh: true
      }}).to('.hero-copy', { y: desktop ? -65 : -25, scale: .94, opacity: .25, duration: 1 }, 0)
        .to('.hero-foot', { opacity: .25, y: -20, duration: 1 }, 0);
      // The environment moves; the peacock and its tail remain still.
      gsap.fromTo('.scenic-background', { scale: 1.12, yPercent: 0 }, {
        scale: 1.3, yPercent: -5, ease: 'none',
        scrollTrigger: { trigger: '#main', start: 'top top', end: 'bottom bottom', scrub: .7 }
      });
      gsap.to('.scenic-shade', { opacity: .65, ease: 'none',
        scrollTrigger: { trigger: '#projects', start: 'top bottom', end: 'top 20%', scrub: .6 }});
      reveal(all('.section-heading > *'), $('.section-heading'));
    }
    all('.project').forEach((project, index) => {
      const visual = project.querySelector('.project-visual');
      const frame = project.querySelector('.browser-frame');
      const copy = project.querySelector('.project-copy');
      if (!visual || !frame || !copy) return;
      const pin = desktop && innerHeight >= 800;
      const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
        id: `project-scene-${index + 1}`, trigger: project, start: pin ? start : 'top 88%',
        end: pin ? () => `+=${innerHeight * .85}` : 'bottom 35%',
        pin, pinSpacing: true, scrub: .55, anticipatePin: 1, invalidateOnRefresh: true
      }});
      timeline.fromTo(visual, { clipPath: 'inset(8% 7% 8% 7% round 22px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: .5 }, 0)
        .fromTo(frame, { scale: 1.13, rotationY: index % 2 ? -7 : 7, rotationZ: -2 },
          { scale: 1, rotationY: 0, rotationZ: 0, duration: .7 }, 0)
        .fromTo(copy, { x: desktop ? (index % 2 ? 40 : -40) : 0, y: desktop ? 0 : 24, opacity: .55 },
          { x: 0, y: 0, opacity: 1, duration: .4 }, 0)
        .to({}, { duration: .3 });
      if (pin) timeline.to(frame, { scale: 1.025, duration: .2 }, .85);
    });
    reveal(all('.more-work .work-row'), $('.more-work'));
    if ($('#approach')) {
      reveal(all('.approach-top > *'), $('.approach-top'));
      reveal(all('.steps > li'), $('.steps'), { y: 55 }, { stagger: .16 });
      gsap.fromTo('.melody-line', { '--line-progress': 1 }, { '--line-progress': 0, ease: 'none',
        scrollTrigger: { trigger: '#approach', start: 'top 75%', end: 'bottom 65%', scrub: .5 }});
      gsap.fromTo('.approach-feather', { y: 45, rotation: 19 }, { y: -45, rotation: 29, ease: 'none',
        scrollTrigger: { trigger: '#approach', start: 'top bottom', end: 'bottom top', scrub: .7 }});
    }
    if ($('.contact-card')) {
      gsap.fromTo('.contact-card', { clipPath: 'inset(10% 5% 10% 5% round 45px)', scale: .94 }, {
        clipPath: 'inset(0% 0% 0% 0% round 24px)', scale: 1, ease: 'none',
        scrollTrigger: { trigger: '#contact', start: 'top 90%', end: 'top 25%', scrub: .6 }});
      reveal($('.contact-copy'), $('#contact'));
      gsap.fromTo('.matki-scene', { y: 45, rotation: -5 }, { y: 0, rotation: 0, ease: 'none',
        scrollTrigger: { trigger: '#contact', start: 'top 85%', end: 'top 25%', scrub: .5 }});
    }
    if ($('.about-page')) {
      gsap.fromTo('.about-portrait img', { scale: 1.07, yPercent: 2 }, { scale: 1, yPercent: -2, ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top top', end: 'bottom 25%', scrub: .6 }});
      reveal(all('.about-copy > p:not(.eyebrow)'), $('.about-copy'), { y: 16, opacity: .8 });
      reveal($('.education'), $('.education'));
      all('.toolkit dl > div').forEach(row => reveal(row, row, { x: -24, y: 0, opacity: .4 }, { x: 0 }));
      const pin = desktop && innerHeight >= 800;
      const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
        id: 'experience-journey', trigger: '#experience', start: pin ? start : 'top 85%',
        end: pin ? () => `+=${innerHeight * .7}` : 'bottom 60%',
        pin, pinSpacing: true, scrub: .5, invalidateOnRefresh: true
      }});
      all('.experience-row').forEach((row, index) => {
        timeline.fromTo(row, { x: 30, opacity: .4 }, { x: 0, opacity: 1, duration: .35 }, index * .24);
      });
      timeline.to({}, { duration: .2 });
      reveal($('.about-next'), $('.about-next'));
    }
  }
  function refresh() {
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(() => { if (enabled) ScrollTrigger.refresh(); });
  }
  function sync() {
    const next = root.dataset.motion === 'on' && !reduced.matches;
    if (world) world.dataset.running = String(next && !document.hidden);
    if (next === enabled) { initialized = true; return; }
    // Preserve the section being read when pin spacers are added/removed by preferences.
    const reading = initialized && captureReading();
    initialized = true;
    enabled = next;
    media.revert();
    root.classList.remove('cinematic');
    if (enabled) {
      media.add({ desktop: '(min-width: 1000px)', mobile: '(max-width: 999px)' }, entry => {
        const context = gsap.context(() => build(entry.conditions.desktop));
        if (breakpointReading) {
          ScrollTrigger.refresh();
          restoreReading(breakpointReading);
          breakpointReading = null;
        }
        refresh();
        return () => {
          if (enabled) breakpointReading = captureReading();
          context.revert();
        };
      });
      ScrollTrigger.refresh();
    }
    restoreReading(reading);
  }
  all('img').forEach(img => { if (!img.complete) img.addEventListener('load', refresh, { once: true }); });
  document.fonts?.ready.then(refresh);
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', () => {
    if (world) world.dataset.running = String(enabled && !document.hidden);
  });
  addEventListener('pageshow', refresh);
  ScrollTrigger.addEventListener('scrollEnd', () => {
    if (!resizeTimer) lastReading = captureReading();
  });
  addEventListener('resize', () => {
    // ScrollTrigger rebuilds pins across breakpoints; keep the last settled section in view.
    const reading = lastReading;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      restoreReading(reading);
      resizeTimer = null;
    }, 350);
  }, { passive: true });
  addEventListener('pagehide', event => { if (!event.persisted) { media.revert(); cancelAnimationFrame(refreshFrame); clearTimeout(resizeTimer); } });
  function alignHash() {
    // An explicit navigation always wins over a pending resize restoration.
    clearTimeout(resizeTimer);
    resizeTimer = null;
    breakpointReading = null;
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = id && document.getElementById(id);
    if (!target) return;
    const scene = ScrollTrigger.getAll().find(item => item.pin === target);
    const top = scene ? scene.start : target.getBoundingClientRect().top + scrollY - header() - 20;
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
    ScrollTrigger.update();
  }
  addEventListener('hashchange', () => requestAnimationFrame(alignHash));
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.getAttribute('href') === location.hash) {
      event.preventDefault();
      alignHash();
    }
  });
  sync();
  function restoreDeepLink() {
    if (!location.hash) return;
    requestAnimationFrame(() => { ScrollTrigger.refresh(); requestAnimationFrame(alignHash); });
  }
  // Let native fragment positioning finish before correcting for the added pin spacing.
  if (document.readyState === 'complete') restoreDeepLink();
  else addEventListener('load', restoreDeepLink, { once: true });
})();
