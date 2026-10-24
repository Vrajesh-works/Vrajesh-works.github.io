# Cinematic scroll upgrade

The existing static HTML architecture, two-page navigation, ivory/blue/gold palette, project dialogs, matki interaction and content are retained. GSAP 3.15.0 and ScrollTrigger are vendored locally; there is no build requirement or runtime CDN request.

## Scene map

- Home: the peacock scene is the portfolio's first section. Scroll position scrubs the copy's depth and the landscape's camera movement. The bird and tail stay still.
- Projects: the three existing featured projects retain their screenshots, descriptions, technology lists, detail dialogs and external links. Desktop scenes pin below the navigation while their image masks open, perspective flattens and text settles. Reverse scrolling reverses the timeline.
- Approach: typography, the existing flowing SVG path and the decorative feather follow scroll progress.
- Contact: the existing golden matki and cream card resolve through a scrubbed mask and scale transition. The pot remains independently interactive.
- About: the portrait gains subtle scroll depth; education and skill rows have reversible reveals. The existing three description-free experience entries form a scroll-driven timeline.

## Responsive and accessibility behavior

Project/experience pins require at least 1000px viewport width and 800px height. Mobile, tablet and short windows use natural document flow with shorter scrub sequences. GSAP matchMedia contexts revert inline styles and pin spacers when modes change. Native scrolling is retained; there is no Lenis, wheel interception, snap forcing or intro overlay. Deep links, repeated hash navigation and cross-page links account for pin spacing. Motion-off and system reduced motion restore the static layout. Missing animation scripts leave the HTML readable.

## Verification

- Content preservation compares Home and About text, links and existing anchors with the prior published checkout.
- Existing structural, motion-preference and decorative-scene checks pass.
- Browser review covers desktop 1280×900, tablet 768×1024 and mobile 390×844; no settled horizontal overflow or broken images was observed.
- Forward/reverse scrolling was checked using native keyboard input. The hero and project remain at their pin positions while opacity/masks change with scroll position.
- Project dialog opening/Escape dismissal, mobile navigation, motion-off removal of all pins, re-enable without duplicate spacers, and browser back/forward across both pages were checked.
- Performance work limits animation to transforms, opacity, small SVG path progress and a small number of clip masks; there is no per-frame layout-measurement loop. No device-wide 60 FPS guarantee or cross-browser benchmark is claimed.
