# Portfolio design notes

## Direction

Warm ivory, Krishna-inspired sky blue, deep ocean blue, and antique gold. Blue replaces the former green/teal UI palette across both pages, project surfaces, contact, focus states, and favicon. Sky-blue surfaces and details suggest openness; darker blue text and controls preserve readability. The natural peacock feather and original project screenshots retain their authentic colors. Large type, generous spacing, real project screenshots, and a small set of Krishna-inspired details. The supplied Apple Design reference informed immediate press feedback, restrained depth, natural settling, and interruptible interaction. It was treated as reference material.

The hero is a single original peacock feather. The approach section has a flowing line inspired by a bansuri. The contact illustration is a small makhan matki. The theme is explained in an optional note in the About section.

## Motion implementation

About is a dedicated `about.html` page, linked from the main navigation. Its background, education, toolkit, and design note were moved off the home page. Both pages share the same responsive header, footer, styles, and motion preference. Home-only animation and interaction initializers safely skip absent elements on About.

- CSS handles the finite hero entrance and reveal transitions.
- A critically damped JavaScript spring follows a fine pointer within the hero. Animation frames stop once it settles or is offscreen.
- A requestAnimationFrame-throttled scroll handler draws the decorative line and updates navigation state.
- Native HTML dialogs handle project detail focus, Escape, and return focus. Web Animations adds a short entrance when motion is enabled.
- The matki is an original inline SVG. Its lid responds to hover and to a keyboard-accessible toggle.
- Reduced-motion CSS and JavaScript disable movement. A persistent footer switch also allows visitors to turn motion off.

No animation framework is needed for these interactions; the site remains dependency-free.

### Visible motion graphics

- The homepage hero is a smaller, isolated morpankh over a faint sky-blue glow. The former canvas orbit lines and dots were removed after visual feedback; no per-frame canvas loop remains.
- A nine-second feather drift runs independently of pointer interaction, so touch visitors also see the scene move.
- The bansuri-inspired path has breathing blue echoes and a travelling golden highlight.
- A visible hero pause/play control sits beside the opening-replay control below the copy, outside the artwork, and shares the footer's persisted motion preference. System reduced motion remains authoritative.
- Decorative CSS loops pause offscreen, during the opening, and while the document is hidden. Reduced motion preserves static artwork.
- The matki card retains its warm golden-cream background; the blue site palette is unchanged.

## Asset provenance

The peacock opening uses three generated image layers, atmospheric rain, a stationary peacock body and tail fan, and a flying-feather handoff to the homepage. See [INTRO-ARTWORK.md](INTRO-ARTWORK.md) for asset provenance, final prompts, timing, and accessibility/failure behavior. It is an illustrated 2.5D sequence, not a video.

- `assets/img/morpankh.webp`: generated using the built-in image-generation tool on 2026-10-13. Original transparent PNG preserved in the generation output; delivery asset converted to an 800 × 1200 WebP with alpha, about 290 KiB.
- `assets/img/bindbench.jpg`: actual public BindBench ranked-results screen, captured 2026-10-13.
- `assets/img/equity-terminal.jpg`: actual public Equity Terminal screen, captured 2026-10-13. Values in the screenshot are a snapshot, not current quotes.
- `assets/img/sor-lab.jpg`: actual public SOR Lab dashboard, captured 2026-10-13 after waking the Streamlit app. The screenshot shows its synthetic-book demo.
- `assets/img/favicon.svg` and the inline matki: original vector artwork authored for this site.

### Final image-generation prompt

> Use case: product-mockup. Asset type: original hero artwork for Vrajesh Nasit's minimalist personal software engineering portfolio, inspired by Krishna's morpankh. Generate ONE exceptionally refined realistic peacock feather, isolated on a genuinely transparent background. Full feather from slender long golden tan quill at bottom to delicate fine wispy barbs at top, graceful gentle curve, predominantly upright tilted about 18 degrees to the right, with the eye in the upper third. Jewel-like midnight indigo, deep emerald and peacock teal eye with restrained antique gold filaments. Natural micro-detail, individual filaments, elegant organic irregularities, soft studio light with luminous fine edges. Contemporary luxury botanical photography, beautiful believable physical material, tasteful restrained saturated color concentrated at the eye. Entire feather visible with some transparent padding. Tall portrait composition. No vase, no other feathers, no shadows on a background, no hands, no lettering, no text, no watermarks, no symbols, no backdrop, no decorative objects. This will sit at large scale on warm ivory and must have clean alpha edges.

## Content scope

Project descriptions were carried forward from the existing portfolio and cross-checked against the public featured apps. No new work history, performance metrics, or personal biographical details were invented. Northeastern University is retained as the existing education attribution without adding a current enrollment claim.

Public project pages checked: BindBench, Equity Terminal, and SOR Lab. Streamlit may put an inactive demo back to sleep. Source repositories remain linked in the project details.

## Review checklist

- Desktop, tablet, and mobile: hierarchy, overflow, loaded images, and responsive navigation.
- Keyboard: menu, project dialog, Escape dismissal, focus restoration, matki, and motion preference.
- Reduced motion: system preference and visitor override; all content visible with motion disabled.
- Static checks: JavaScript syntax, local assets, anchors, duplicate IDs, external-link attributes.
- Network and console: no missing local assets or application errors.

### Verification completed on 2026-10-13

- Browser review at 320, 390, 520, 521, 600, 760, 768, 1024, and 1440 CSS-pixel target widths. Fixed a decorative-ring overflow at narrow tablet sizes.
- Desktop and phone project dialogs: correct content, focus on close control, Escape dismissal, restored trigger focus, restored document scrolling.
- Phone menu: opens, selects a section, and closes after navigation.
- Matki: keyboard Enter toggles the lid, message visibility, and expanded state.
- Motion toggle: hides no content, clears pointer movement, and persists across reloads.
- Isolated JavaScript checks: system reduced motion overrides a saved on preference; changes apply live; visitor off survives system changes; blocked localStorage does not prevent initialization.
- Static checks: JavaScript parses; all 23 main-document IDs are unique; every local resource and anchor resolves; all images reserve dimensions and have alt text; external new-tab links isolate the opener.
- Initial page and referenced assets total approximately 593 KiB before HTTP compression. Hero image: approximately 290 KiB. No runtime or font CDN dependency.
- Public project/source HTTP checks returned 200 for the checked GitHub, BindBench, and Equity Terminal URLs. The Streamlit URL did not respond to the command-line fetch but was successfully opened, woken, inspected, and captured in the browser.
- No application console errors during browser review. Small-label contrast was checked and adjusted.

Publishing is separate from local implementation and review.
