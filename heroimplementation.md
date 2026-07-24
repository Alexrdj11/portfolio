Read and understand the entire codebase first before making any changes.

Do not rewrite the project from scratch. Reuse as much of the existing architecture, styling, components and animations as possible.

The goal is to completely redesign ONLY the Hero section while preserving the overall design language of the portfolio.

======================================================
DESIGN GOAL
======================================================

The Hero section should feel cinematic, premium, modern and minimal.

Think:
- Apple
- OpenAI
- Vercel
- Linear

NOT:
- Cyberpunk
- RGB gamer
- Hacker aesthetic
- Overly futuristic AI dashboard

Everything should feel clean, intentional and elegant.

======================================================
BACKGROUND
======================================================

The Hero section background should be pure black (#000000).

Reuse the existing interactive particle system already present in the portfolio.

The particles should:

- move slowly
- be sparse
- remain subtle
- connect naturally
- react to mouse movement exactly like the current implementation
- create a premium floating depth effect

Do NOT increase particle density.

Keep the interaction elegant.

The particles should never overpower the content.

======================================================
RIGHT SIDE
======================================================

Replace the current terminal with a looping MP4 animation.

The video is a MetaHuman rendered against a black background.

The video should:

- autoplay
- muted
- playsInline
- loop forever
- object-fit: contain
- never show controls
- never stretch
- remain responsive

The video should occupy roughly 45-50% of the hero.

It should blend naturally into the black background.

No borders.

No container.

No shadows.

The MetaHuman should feel like it is emerging from darkness.

======================================================
LEFT SIDE
======================================================

Minimal typography.

Small heading:

Hello, I'm

Main Heading:

HARSHA JAIN

Use a modern premium font.

Preferred fonts:

Space Grotesk
General Sans
Sora

Do NOT use futuristic AI fonts.

Do NOT use ASCII fonts for the main heading.

The heading should feel premium and timeless.

Below the name:

Java Backend Developer • AI Engineer • Creative Builder

Then a concise one-line description.

use the same navbar tht exists

======================================================
ANIMATION TIMELINE
======================================================

The hero should behave like a short cinematic.

When the page first opens:

0-4 seconds

Only the MetaHuman is visible.

No text.

No buttons.

No navbar.

The visitor should simply observe the character.

Around 4 seconds

As the MetaHuman turns toward the viewer,

fade in:

Hello, I'm

HARSHA JAIN

Subtitle

Description

Buttons

Use soft opacity fades.

No aggressive slide animations.

If the user moves the mouse before 4 seconds:

Immediately reveal all UI.

Do not force the user to wait.

======================================================
NAVBAR
======================================================

Navbar starts hidden.

If mouse moves:
Show immediately.

Otherwise:
Automatically fade in around 6 seconds.

Never wait longer.

======================================================
MICRO INTERACTIONS
======================================================

Keep all interactions subtle.

Mouse movement should slightly influence:

- particle system
- button glow
- text depth

Do NOT rotate or skew the MP4 video.

Do NOT fake 3D rotation on the video.

The MetaHuman animation itself should remain untouched.

======================================================
RESPONSIVENESS
======================================================

Desktop:

Text left.

MetaHuman right.

Tablet:

Scale proportionally.

Mobile:

Stack vertically with the MetaHuman above the text.

Keep animations and timing consistent.

======================================================
STYLE
======================================================

Minimal.

Elegant.

Cinematic.

Modern.

Professional.

The Hero section should immediately communicate that this is the portfolio of an AI engineer and software developer, without relying on flashy effects.

Before making changes, inspect the current hero implementation and reuse any existing particle animation, motion libraries, and responsive utilities wherever possible instead of replacing them.