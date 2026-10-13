# Opening artwork and choreography

Generated with the built-in image-generation tool on 2026-10-13. These are original illustrated layers, animated in-browser as a 2.5D scene, not filmed or AI-generated video.

## Final project assets

- `C:/Users/vraje/OneDrive/Documents/GitHub/Vrajesh-works.github.io/assets/img/monsoon-clearing.webp` — 1536 × 1024, 379500 bytes.
- `C:/Users/vraje/OneDrive/Documents/GitHub/Vrajesh-works.github.io/assets/img/peacock-fan.webp` — 1000 × 667, 289806 bytes, alpha preserved.
- `C:/Users/vraje/OneDrive/Documents/GitHub/Vrajesh-works.github.io/assets/img/peacock-body.webp` — 360 × 540, 28544 bytes, alpha preserved.
- The flying feather reuses `assets/img/morpankh.webp`, the existing generated hero artwork.

Original PNGs are preserved under `C:/Users/vraje/.codex/generated_images/01a1358d-2f53-7eb3-ace6-a552ca3fb919/`: landscape `exec-41738465-6f8e-4672-8744-17686d7fd9f6.png`, fan `exec-53478d4f-3055-44f5-9a3c-835e8912f545.png`, body `exec-8d7c1510-2078-4054-8140-738a5d692c54.png`. Delivery copies were resized and WebP-encoded with ffmpeg without altering the artwork.

## Sequence

1. Forest clearing fades in. The peacock body, feet, and fully spread tail fan remain still, with no camera zoom, stepping, or fan movement. Rain and mist provide atmosphere; the separate feather carries the transition.
2. Wind enters at 3.4 seconds.
3. At 4.3 seconds, the morpankh lifts from the fan, rotates through the foreground, then travels toward the measured position of the homepage feather.
4. The landscape dissolves through warm ivory into the existing portfolio. The native dialog closes at 8.1 seconds and restores focus and document scrolling.

The intro runs once per tab session on a non-anchored homepage visit. Watch the opening replays it. Deep links, reduced-motion users, or visitors who switched motion off enter directly. Skip intro and Escape exit immediately. Asset decoding is capped at 4.5 seconds; failures reveal the portfolio. A separate animation watchdog prevents a trapped overlay. Hidden tabs end the intro. No automatic sound. The still image layers use about 682 KiB total and load only when the opening starts.

## Final generation prompts

### landscape

Use case: illustration-story. Asset type: full-screen scenic background plate for a premium 2.5D animated portfolio intro inspired by Krishna and a peacock dancing before monsoon rain. Generate one cinematic wide landscape, 1536x1024 composition. A lush Indian woodland clearing at the edge of a tranquil pond, old graceful trees framing both sides, distant soft forest, mist between trees, delicate monsoon clouds and luminous cool sky-blue dawn light with restrained warm golden rays. Wet dark earth and low grass in the foreground. A flat empty patch in the lower center will hold an animated peacock as a separate layer; leave this area unobstructed. Camera at peacock eye level, forest environment recedes in depth, serene beautiful rich scenery. Refined painterly realism, detailed natural textures, sophisticated cinematic art, not cartoon or flat vector. No bird, no peacock, no people, no deity, no buildings, no lettering, no watermarks. Do not paint streaks of falling rain; rain will be animated separately.

### fan

Use case: illustration-story. Asset type: isolated transparent animation layer, peacock tail fan ONLY, no bird body. Create an exceptionally beautiful realistic Indian peacock's fully spread upright tail fan, viewed straight on, symmetrical semicircular rounded fan, hundreds of delicate iridescent barbs, blue and emerald eye spots, restrained antique golden edges. The feather stems converge at the bottom center. Entire fan visible with a little transparent margin, no cropping. Near-square wide composition. Soft cool monsoon dawn lighting from upper left, refined painterly realism with believable feather microdetail, designed for compositing into a lush Indian forest clearing. No body, no head, no legs, no ground, no scenery, no shadow backdrop, no lettering, no watermark. Genuinely transparent background.

### body

Use case: illustration-story. Asset type: isolated transparent animation layer, body of a male Indian blue peacock WITHOUT its large tail fan (fan will be layered behind it separately). One entire graceful peacock body, upright long royal blue neck, small elegant head with blue crest, white facial markings, beak facing slightly left, chest facing camera, compact iridescent cobalt and teal torso, folded small wings, two realistic slim legs and feet visible in a poised courtship-dance stance. No trailing train and NO spread tail feathers. Whole body centered, neck head torso and feet fully visible, portrait composition. Soft cool monsoon dawn lighting from upper left, refined painterly realism with fine detailed feathers, matching cinematic Indian woodland scene. Genuinely transparent background. No scenery, no ground, no props, no words, no watermark.

