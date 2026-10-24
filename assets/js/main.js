(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');
  const systemMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const motionButton = document.getElementById('motion-toggle');
  const sceneButton = document.getElementById('scene-toggle');
  let savedMotion = null;
  try { savedMotion = localStorage.getItem('portfolio-motion'); } catch { /* Storage is optional. */ }
  let motionEnabled = !systemMotion.matches && savedMotion !== 'off';
  let revealObserver;
  let featherFrame = 0;
  let featherVisible = true;
  let x = 0, y = 0, vx = 0, vy = 0, targetX = 0, targetY = 0, previousTime = 0;
  const feather = document.getElementById('feather-float');

  function stopFeather() {
    cancelAnimationFrame(featherFrame);
    featherFrame = 0;
    previousTime = 0;
    x = y = vx = vy = targetX = targetY = 0;
    if (feather) feather.style.transform = '';
  }

  function applyMotion() {
    root.dataset.motion = motionEnabled ? 'on' : 'off';
    motionButton.setAttribute('aria-pressed', String(motionEnabled));
    document.getElementById('motion-label').textContent = motionEnabled ? 'Motion on' : 'Motion off';
    if (sceneButton) {
      sceneButton.setAttribute('aria-pressed', String(!motionEnabled));
      document.getElementById('scene-motion-label').textContent = systemMotion.matches ? 'Reduced motion' : motionEnabled ? 'Pause motion' : 'Play motion';
      sceneButton.querySelector('.scene-toggle-icon').textContent = motionEnabled ? 'Ⅱ' : '▷';
    }
    if (!motionEnabled) {
      stopFeather();
      document.querySelectorAll('.is-waiting').forEach(el => el.classList.remove('is-waiting'));
      document.getAnimations().forEach(animation => animation.cancel());
    }
    updateScroll();
  }

  // Keep system reduced motion authoritative, even if a previous visit enabled motion.
  motionButton.hidden = false;
  function toggleMotion() {
    if (systemMotion.matches) {
      motionEnabled = false;
      document.getElementById('motion-label').textContent = 'Reduced by system';
      return;
    }
    motionEnabled = !motionEnabled;
    try { localStorage.setItem('portfolio-motion', motionEnabled ? 'on' : 'off'); } catch { /* No persistence required. */ }
    applyMotion();
  }
  motionButton.addEventListener('click', toggleMotion);
  if (sceneButton) {
    sceneButton.hidden = false;
    sceneButton.addEventListener('click', toggleMotion);
  }
  systemMotion.addEventListener('change', () => {
    let preference = null;
    try { preference = localStorage.getItem('portfolio-motion'); } catch { /* Use the system preference. */ }
    motionEnabled = !systemMotion.matches && preference !== 'off';
    applyMotion();
  });

  // Progressive enhancement: content is visible without JavaScript or observer support.
  if ('IntersectionObserver' in window && motionEnabled && !(window.gsap && window.ScrollTrigger)) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('is-waiting');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.06, rootMargin: '0px 0px 30px 0px' });
    document.querySelectorAll('.reveal').forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add('is-waiting');
      revealObserver.observe(element);
    });
  }

  // A critically damped spring follows the pointer and stops when settled.
  function animateFeather(time) {
    if (!feather || !motionEnabled || !finePointer.matches || !featherVisible || document.hidden) { stopFeather(); return; }
    const dt = Math.min((time - (previousTime || time - 16.67)) / 1000, 1 / 30);
    previousTime = time;
    const stiffness = 115, damping = 22;
    vx += ((targetX - x) * stiffness - vx * damping) * dt;
    vy += ((targetY - y) * stiffness - vy * damping) * dt;
    x += vx * dt;
    y += vy * dt;
    feather.style.transform = `translate3d(${x * 9}px, ${y * 6}px, 0) rotate(${x * 3.5}deg)`;
    if (Math.abs(targetX - x) + Math.abs(targetY - y) + Math.abs(vx) + Math.abs(vy) < 0.002) {
      featherFrame = 0;
      previousTime = 0;
      return;
    }
    featherFrame = requestAnimationFrame(animateFeather);
  }
  function requestFeatherFrame() {
    if (feather && !featherFrame && motionEnabled && finePointer.matches && featherVisible) featherFrame = requestAnimationFrame(animateFeather);
  }
  const hero = document.querySelector('.hero');
  hero?.addEventListener('pointermove', event => {
    if (!motionEnabled || !finePointer.matches) return;
    const rect = hero.getBoundingClientRect();
    targetX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    targetY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
    requestFeatherFrame();
  }, { passive: true });
  hero?.addEventListener('pointerleave', () => { targetX = targetY = 0; requestFeatherFrame(); });
  if (hero && feather && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      featherVisible = entries[0].isIntersecting;
      if (!featherVisible) stopFeather();
    }).observe(hero);
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopFeather(); });
  finePointer.addEventListener('change', stopFeather);

  // Native page scrolling drives one decorative path, without changing scroll behavior.
  const approach = document.getElementById('approach');
  const melody = document.querySelector('.melody-line');
  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const navSections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
  let scrollFrame = 0;
  function updateScroll() {
    if (approach && melody && !(window.gsap && window.ScrollTrigger)) {
      const rect = approach.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * 0.72)));
      melody.style.setProperty('--line-progress', motionEnabled ? 1 - progress : 0);
    }
    let active = -1;
    navSections.forEach((section, index) => { if (section && section.getBoundingClientRect().top <= 170) active = index; });
    navLinks.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollFrame = 0;
  }
  const scheduleScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); };
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll, { passive: true });

  const menu = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('nav-links');
  menu.hidden = false;
  function setMenu(open, restoreFocus = false) {
    menu.setAttribute('aria-expanded', String(open));
    menu.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
    navigation.classList.toggle('is-open', open);
    if (restoreFocus) menu.focus();
  }
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('click', event => { if (!event.target.closest('.nav')) setMenu(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  const mobileMenu = window.matchMedia('(max-width: 520px)');
  mobileMenu.addEventListener('change', () => setMenu(false));

  // Native dialogs provide focus containment, Escape dismissal and focus restoration.
  const dialog = document.getElementById('project-dialog');
  let previousOverflow = '';
  if (dialog && typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-project]').forEach(button => {
      button.hidden = false;
      button.addEventListener('click', () => {
        const template = document.getElementById(`detail-${button.dataset.project}`);
        if (!template) return;
        document.getElementById('dialog-content').replaceChildren(template.content.cloneNode(true));
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        dialog.showModal();
        dialog.scrollTop = 0;
        if (motionEnabled) dialog.animate([{ opacity: 0, transform: 'translateY(18px) scale(.98)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }], { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' });
      });
    });
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => { document.body.style.overflow = previousOverflow; });
  }

  const pot = document.getElementById('matki-button');
  if (pot) pot.disabled = false;
  pot?.addEventListener('click', () => {
    const open = pot.getAttribute('aria-expanded') !== 'true';
    pot.setAttribute('aria-expanded', String(open));
    pot.setAttribute('aria-label', open ? 'Close the little makhan pot' : 'Open the little makhan pot');
    document.getElementById('matki-message').hidden = !open;
  });
  document.getElementById('year').textContent = new Date().getFullYear();
  applyMotion();
})();
