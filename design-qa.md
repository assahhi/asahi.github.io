# Design QA

## Comparison target

- Source visual truth: `/Users/lcw/Documents/Codex/2026-07-28/new-chat/outputs/orientation-field-notes/design-reference.png`
- Browser-rendered implementation: `/Users/lcw/Documents/Codex/2026-07-28/new-chat/outputs/orientation-field-notes/implementation-hero-final.png`
- Full-view combined evidence: `/Users/lcw/Documents/Codex/2026-07-28/new-chat/outputs/orientation-field-notes/qa-comparison-full.png`
- Focused combined evidence: `/Users/lcw/Documents/Codex/2026-07-28/new-chat/outputs/orientation-field-notes/qa-comparison-focus.png`
- Source pixels: 1664 × 935
- Source normalization: resized to 1600 × 900 with Lanczos resampling
- Implementation pixels: 1600 × 900
- CSS viewport: 1600 × 900
- Device scale factor: 1
- State: opening chapter, animations settled, advice panel closed

## Evidence reviewed

### Full-view comparison

The implementation preserves the source's 16:9 composition, compact purple masthead, warm paper surface, two-column hero, condensed English display title, Chinese headline, coordinate stamp, oval portrait, purple travel route, chapter rail, and restrained gold accents. The main hierarchy and whitespace balance remain consistent with the source while using live HTML text and controls.

### Focused comparison

The focused hero comparison was required because identity, portrait crop, headline scale, crest treatment, CTA spacing, and route-line asset fidelity are central to the design. The final implementation uses the supplied portrait and official crest, a generated transparent route overlay, the selected paper/map texture, and a close freely available condensed display font. No visible source asset was replaced with custom SVG, CSS illustration, emoji, or placeholder art.

## Required fidelity surfaces

- Fonts and typography: Bebas Neue closely matches the selected condensed display language. Noto Sans SC provides readable Chinese hierarchy with stable 14–16 px body text. The implementation's English title is slightly more compact than the generated source but retains the same optical weight, wrapping, and dominance; this is acceptable responsive normalization.
- Spacing and layout rhythm: Header height, hero split, title/portrait balance, bottom chapter band, and 16:9 viewport fill align with the source. All four desktop chapters render at exactly one 1600 × 900 viewport with no horizontal overflow.
- Colors and visual tokens: CUHK purple, warm ivory, deep navy, muted gold, and the single red coordinate stamp match the source direction. Contrast remains sufficient for navigation and body text.
- Image quality and asset fidelity: The real portrait and official CUHK-Shenzhen crest are sharp and correctly cropped. The generated paper/map background and transparent route overlay match the source art direction. No visible transparency fringe, placeholder, stretching, or incorrect logo treatment remains.
- Copy and content: The opening copy matches the selected visual. The remaining chapters use resume-grounded education, project, internship, and skill content; the JD purchasing-and-sales experience is dated `2026.06 — 至今`. Programme facts are consistent with the official CUHK-Shenzhen MSc in Accounting overview.

## Interaction and runtime checks

- Primary interactions tested: “开始探索”, chapter rail navigation, “随机抽一条建议”, advice refresh/close, and return-to-opening navigation.
- The backend advice endpoint returned live JSON and populated the modal.
- Scroll snapping and active chapter count were verified at 01/04 through 04/04.
- Responsive viewport checked at 390 × 844 with no horizontal overflow.
- Reduced-motion styles and keyboard chapter navigation are implemented.
- Browser console warnings/errors checked: none.

## Comparison history

### Iteration 1

- [P2] About and experience headlines wrapped into visually weak single-character lines at 1600 × 900.
- Fix: adjusted desktop column ratios, reduced those chapter headline sizes, and changed the experience line break to preserve intentional phrase grouping.
- Post-fix evidence: `/Users/lcw/Documents/Codex/2026-07-28/new-chat/outputs/orientation-field-notes/implementation-about.png` and `/Users/lcw/Documents/Codex/2026-07-28/new-chat/outputs/orientation-field-notes/implementation-experience.png`.

- [P2] The first portrait crop was too close compared with the selected source and hid too much of the jacket/tie.
- Fix: changed the desktop portrait to a contained crop, reduced its width, preserved the oval stage, and retained a separate mobile crop.
- Post-fix evidence: `/Users/lcw/Documents/Codex/2026-07-28/new-chat/outputs/orientation-field-notes/qa-comparison-focus.png`.

## Findings

No actionable P0, P1, or P2 findings remain.

## Follow-up polish

- [P3] The generated source's compass rose is more illustrative than the icon-library compass used in controls. The implementation intentionally prioritizes a consistent icon system and retains the route-line motif as the stronger visual signature.

## Final result

passed
