# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Selected direction

- Build the third ideation direction: an editorial campus-atlas / field-guide website.
- The final desktop experience is designed as full-screen 16:9 chapters with vertical scroll snapping.
- Preserve the CUHK-Shenzhen purple, warm paper, coordinate stamps, map-route motif, real portrait, and restrained motion language.
- The five full-screen chapters are opening, about, official programme courses (B1), the user's personal course map (B2), and experience; the deployed version also includes a same-origin backend endpoint for dynamic orientation advice.
- Keep B1 as three list columns: shared required courses, AA electives, and PA electives. Keep B2 as a dedicated editable 24-month personal course-plan page rather than combining it with the official programme page.
- B2 covers the four formal semesters only (2025, 2026, 2026, 2027); omit the summer pre-course because the orientation audience has already enrolled.
- B1 must support an animated 2025-to-2026 curriculum transition. The 2026 curriculum uses 6 main courses plus 6 electives, and moves Chinese Tax Law from the required-course list into the PA elective list; retain manual year switching after the automatic transition.
- B2 links to a dedicated Term 1 course-notes screen. Keep all personal course introductions together on that screen, provide a required/elective toggle, emphasize the four elective-course reviews and text-based assessment breakdowns, and return the user to B2 from the back control.
- Keep the experience chapter title concise as “建议”. Include a restrained, automatically looping “项目剪影” photo reel using the `pics/` source photos in natural numeric filename order; publish optimized web copies rather than the raw originals.
- Do not show the random orientation-advice feature in the website UI. Keep the experience photo reel visually prominent and larger than its initial compact treatment.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
