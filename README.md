# Vrajesh Nasit — Portfolio

A personal software engineering portfolio with a continuous monsoon landscape, a stationary peacock, and restrained motion inspired by Krishna's stories. The first scene contains the portfolio introduction; normal scrolling leads directly to the projects without an intro overlay.

Built with plain HTML, CSS, and JavaScript, with GSAP/ScrollTrigger hosted locally. No build step or package installation is required to serve the site. GitHub Pages serves the repository root.

## Preview

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000.

## Files

- `index.html`: semantic page content, project detail templates, and accessible contact illustration.
- `about.html`: separate About page with background, education, toolkit, and the design story.
- `assets/css/style.css`: design tokens, responsive layouts, animation, and accessibility preferences.
- `assets/css/world.css`: immersive scenery, alternating project layouts, and responsive scene styling.
- `assets/js/world-scroll.js`: reversible GSAP/ScrollTrigger scenes, responsive pinning, deep-link alignment, and motion cleanup.
- `assets/css/cinematic.css`: cinematic enhancements layered over the existing design.
- `assets/vendor/gsap/`: locally hosted GSAP 3.15.0 and ScrollTrigger; no CDN or build step is required.
- `assets/js/main.js`: pointer-responsive feather, scroll reveals, mobile navigation, project dialogs, and motion controls.
- `assets/img/`: optimized hero artwork and real screenshots from the featured projects.
- `DESIGN.md`: design choices, artwork provenance, and verification notes.
- `404.html`: matching not-found page.

## Content updates

Project summaries and their detail templates live in `index.html`. Update both when a project changes. Screenshot captures are snapshots, not live market or prediction feeds. The Market Data Service and AI Study Assistant link to their source repositories.

The portfolio content remains readable without JavaScript. Interactive project details and the makhan pot are progressively enabled. Normal browser scrolling and native dialog focus behavior are preserved.

## Motion and accessibility

The footer motion button saves the visitor's preference locally. The operating system's reduced-motion setting takes priority. GSAP contexts revert all animated styles and remove pin spacers when motion is disabled. At 1000px wide and 800px tall or larger, project scenes pin while their masks, perspective, image scale, and text scrub with native scrolling. Smaller screens use unpinned, shorter scrub sequences. About retains its separate route, portrait, skills, and description-free experience entries. The larger-screen experience timeline also pins. Keyboard users can skip navigation, open project dialogs, dismiss them with Escape, and open the matki with Enter or Space. Native wheel/touch behavior and browser history are preserved; Lenis is deliberately unnecessary.

## Deploy

Push the reviewed changes to `main`; the existing GitHub Pages configuration publishes the repository root. A local preview does not publish the changes.
