# slidev-theme-db-theme

[![NPM version](https://img.shields.io/npm/v/slidev-theme-db-theme?color=3AB9D4&label=)](https://www.npmjs.com/package/slidev-theme-db-theme)

A [Slidev](https://github.com/slidevjs/slidev) theme for the new Deutsche Bahn
corporate design ("Neues Design"): the official colour palette, DB Neo Screen
typography, the Schwelle rebuilt from the construction drawings, the logo with
sender, DB motion curves and a set of layouts that follow the portal's layout
rules. Reference: <https://marketingportal.extranet.deutschebahn.com/neues-design>.

<!--
  run `npm run dev` to check out the slides for more details of how to start writing a theme
-->

## Install

Add the following frontmatter to your `slides.md`. Start Slidev then it will prompt you to install the theme automatically.

<pre><code>---
theme: <b>db-theme</b>
---</code></pre>

Learn more about [how to use a theme](https://sli.dev/guide/theme-addon#use-theme).

## Configuration

Everything is set in the headmatter of the deck:

```yaml
---
theme: db-theme
colorSchema: auto             # auto | light | dark
classification: internal      # internal | confidential | strictly-confidential (omit to hide)
themeConfig:
  sender: Systel              # "Logozusatz" next to the DB logo, "" for none
  logoColor: red              # red | white
  logo: true                  # logo top-right on content slides
  schwelle: true              # Schwelle on content slides: true | false | subtle | lilac | white
  footer: ""                  # footer text, bottom-left of content slides
  pageNumbers: true           # "3 / 21" next to the footer text
  progress: false             # true: progress strip instead of the Schwelle on content slides
  primary: "#EC0016"          # Slidev's primary colour (DB Red 500)
transition: db-slide | db-slide-back   # theme default; use `fade`, `none`, … to override
---
```

Per slide, the frontmatter can switch the frame elements off or change them:

```yaml
---
logo: false          # no logo on this slide
schwelle: subtle     # grey Schwelle (or false | lilac | white | red)
footer: false        # no footer / page number (or a string for this slide only)
progress: true       # progress strip instead of the Schwelle on this slide
---
```

## Dark mode

The theme supports both colour schemes. Choose one per presentation with the
`colorSchema` headmatter option:

<pre><code>---
theme: db-theme
colorSchema: auto   # auto | light | dark
---</code></pre>

- `auto` – follow the OS preference and show a toggle in the navigation bar
- `light` – White background, Black body text, Cold Black headlines
- `dark` – Cold Black background, White text

The surfaces are driven by the semantic tokens in `styles/tokens.css`
(`--db-background`, `--db-foreground`, `--db-headline`, …). Override them in
your deck's `style.css` to customise either scheme.

## Confidentiality classification

Add a `classification` headmatter option to stamp a marker in the top-left
corner of every slide (also in exports):

<pre><code>---
theme: db-theme
classification: confidential   # internal | confidential | strictly-confidential
---</code></pre>

Omit the option to hide the marker. Text is never coloured in the DB design,
so the marker uses the muted grey token `--db-classification`, which reaches
4.5:1 in both colour schemes. The marker lives in
`components/Classification.vue` and is rendered by `slide-top.vue`.

## Layouts

Content layouts share one frame (`components/DbSlide.vue`): logo top-right,
footer with page number bottom-left, S-variant Schwelle bottom-right (or the
progress strip, see `DbProgress`).

| Layout | Use | Options (frontmatter) |
| --- | --- | --- |
| `cover` | Title slide: logo with sender, title block, animated Schwelle | `image`, `overlay: darken \| dark-gradient \| light-gradient \| none`, `animation: in \| loop \| none` |
| `default` | Content slide with the frame | `logo`, `schwelle`, `footer` |
| `center` | Content vertically centred | |
| `intro` | Centred content without logo | |
| `section` | Chapter divider on an inverted surface, big Schwelle | `number: "01"`, `inverted: false`, `animation` |
| `agenda` | Title plus an ordered list with big numbers | |
| `two-cols` | Two columns, `::right::` slot | `class`, `layoutClass` |
| `two-cols-header` | Headline across both columns, `::left::` / `::right::` | |
| `image` | Full-bleed image with text on top and an overlay for 4.5:1 | `image`, `overlay`, `align: left \| right`, `backgroundSize` |
| `image-left` / `image-right` | Image panel with a white Schwelle, text on the other side | `image`, `imageWidth: 45%`, `backgroundSize` |
| `quote` | Quote with a vertical Schwelle as typographic connector | |
| `fact` | One big figure (first headline) with a description | |
| `statement` | One big statement in DB Screen Head Black | |
| `end` | Closing slide with logo, closing line, contact block, full Schwelle | `animation` |

Slidev's other built-in layouts (`full`, `none`, `iframe`, …) still work but
don't get the frame.

## Components

### `<Schwelle>`

The Schwelle is drawn from the portal's construction drawings. With the height
split into 30 units, every bar plus the gap after it is 15 units; the bars grow
linearly:

| Variant | Bars | Widths | Gaps | Length |
| --- | --- | --- | --- | --- |
| `standard` | 15 | 1 … 15 | 14 … 1 | 7.5 × height |
| `s` | 11 | 3 … 13 | 12 … 3 | 5.43 × height |

```html
<Schwelle variant="standard" height="2rem" color="lilac" :stretch="1.5" animate />
<Schwelle variant="standard" height="3rem" animate="loop" />
<Schwelle orientation="vertical" height="0.875rem" />
```

| Prop | Default | Notes |
| --- | --- | --- |
| `variant` | `auto` | `standard`, `s`, or `auto` (S below 32 px, as the portal prescribes) |
| `height` | `2rem` | any CSS length; thickness for `vertical` |
| `color` | `auto` | `red`, `white`, `lilac`, `subtle` (grey) — the only allowed colours |
| `stretch` | `1` | horizontal stretch, clamped to 1 … 2 (never compressed) |
| `orientation` | `horizontal` | or `vertical`; never rotated |
| `animate` | `false` | `true` / `in`: official build-up when the slide is shown; `loop`: build-up, hold, breakdown, repeat (presentation only) |

The animation is traced frame by frame from the Schwelle loop on the
[Motion Branding](https://marketingportal.extranet.deutschebahn.com/neues-design/Motion-Branding)
page: a front reveals the Schwelle left to right in 0.96 s on the primary
curve; behind it every bar starts as wide as its grid cell, so the Schwelle
surges in as a solid block, and then shrinks towards its right edge to its
final width, so the gaps open step by step and the thin bars settle last. The
breakdown shrinks every bar to nothing towards its right edge, linear, 0.4 s
plus 0.05 s per bar. `cover`, `section` and `end` expose this as the
`animation` frontmatter option (`in` by default, `loop`, or `none`).

### `<DbLogo>`

```html
<DbLogo height="3rem" />                   <!-- sender from themeConfig -->
<DbLogo additive="InfraGO" />              <!-- other sender -->
<DbLogo additive="" color="white" />       <!-- logo only, white -->
```

`height` (default `--db-logo-height`), `color` (`auto` | `red` | `white`),
`additive` (overrides `themeConfig.sender`).

### `<DbProgress>`

Deck progress after the "Feedback / Live-Interaktion" pattern on the Motion
Branding page: one thin bar per slide, the bars around the current slide grow
around their centre with a linear falloff over four neighbours, a small grey
marker sits above the current one. Passed slides are DB Red, upcoming ones
grey. On a slide change the pointer travels from the previous slide to the
new one, the bars bulge as it passes and the passed ones turn red, with the
timing of the clip (about 0.13 s per bar, at least 0.5 s, eased in and out).
Hovering moves the pointer with the mouse, like the clip, and shows the slide
number and title; a click goes to that slide.
Opt in with `themeConfig.progress: true` (or `progress: true` on a slide): it
then takes the place of the small Schwelle bottom-right on the content slides. Props `current` and `total` override the deck values, e.g.
`<DbProgress :current="7" :total="20" />`.
Sizes come from `--db-progress-height`, `--db-progress-step`,
`--db-progress-width`.

### `<DbSlide>`

The frame used by the content layouts. Wrap your own layout in it to get
logo, footer and Schwelle: `<DbSlide layout="my-layout" center>…</DbSlide>`.
Props: `layout`, `logo`, `schwelle`, `footer`, `center`, `class`.

### `<Classification>`

See [Confidentiality classification](#confidentiality-classification).

## Design tokens

`styles/tokens.css` defines the complete DB palette as CSS variables:
`--db-grey-*`, `--db-red-*`, `--db-lilac-*`, `--db-green-*` in the steps
25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, plus the named colours
`--cold-black` (Grey 900), `--db-red` (Red 400), `--db-red-ui` (Red 500),
`--lilac` (Lilac 200) and `--s-bahn-green` (Green 500).

Semantic tokens: `--db-background`, `--db-foreground`, `--db-headline`,
`--db-muted`, `--db-border`, `--db-surface`, `--db-link`, `--db-logo`,
`--db-schwelle`, `--db-schwelle-subtle`, `--db-classification`.

Motion: `--db-ease-primary` `cubic-bezier(0.25, 0, 0.35, 1)`,
`--db-ease-secondary` `cubic-bezier(0, 0, 0.2, 1)`, `--db-duration`.

Grid: `--db-margin-x`, `--db-margin-y`, `--db-logo-height`,
`--db-logo-height-cover`.

Rules from the portal that the styles encode: White and Cold Black are the
only surfaces; body text is Black or White, Cold Black is for headlines;
red text only for links (with underline as second cue); no rounded corners,
no drop shadows; headlines at 1.1 × line height, body copy at 1.3 ×.

## Fonts

`assets/fonts` ships DB Neo Screen Head (Light, Regular, Black) and DB Neo
Screen Sans (Regular, Bold), registered in `styles/db-font.css` as
`"DB Screen Head"` and `"DB Screen Sans"`. Code uses Fira Code from Google
Fonts (there is no DB monospace font). Check the
[font licence](https://marketingportal.extranet.deutschebahn.com/neues-design/Lizenzbedingungen-Schriften-14025358)
("Lizenzbedingungen DB Type") before publishing the package outside DB.

## Roadmap – status against the new DB design

Gap analysis against the DB Marketingportal
["Neues Design"](https://marketingportal.extranet.deutschebahn.com/neues-design)
(state: 2026-09-11). Checked items are implemented.

### Done

- [x] Complete colour palette (Grey, DB Red, Lilac, Green, 25 … 900) as tokens, with the official hex values
- [x] DB Red 400 for logo and Schwelle, DB Red 500 for links and UI on white, `#FF002B` for red text on Cold Black
- [x] Grey tokens for the subtle Schwelle (Grey 50 / Grey 800)
- [x] WCAG 2.1 contrast: classification marker, muted text, links and code colours all ≥ 4.5:1 in both modes
- [x] No coloured body text, no fills in DB Red / Lilac, no gradients on surfaces
- [x] Body copy in DB Neo Screen Sans, headlines in DB Neo Screen Head Black, all shipped faces registered
- [x] Line heights 1.1 (headlines) / 1.3 (body), DB heading scale h1 … h6, no all-caps overlines
- [x] Text colour: Black on White, Cold Black for headlines, White on Cold Black
- [x] Sender / Logozusatz via `themeConfig.sender`, logo in DB Red or White, logo on inner slides
- [x] Schwelle rebuilt from the construction drawings: fixed bar sequence, S variant below 32 px, stretch ≤ 200 %, horizontal / vertical, allowed colours only
- [x] Schwelle sized relative to the logo (⅔ of the logo height on cover / end / image)
- [x] Schwelle build-up, breakdown and loop, traced from the official loop video (front on the primary curve, gaps opening step by step)
- [x] Layouts: section, agenda, end, image with overlays, image-left / -right, two-cols, two-cols-header, quote, fact, statement, center
- [x] One grid: `--db-margin-x/y`, logo and Schwelle frame the slide
- [x] Footer with page number and footer text
- [x] Deck progress strip after the "Feedback / Live-Interaktion" UI pattern (Motion Branding)
- [x] No rounded corners, no shadows: code blocks, inline code, kbd, blockquote, images
- [x] Links, tables, blockquotes, lists in a flat, angular DB style; `themeConfig.primary` = DB Red 500
- [x] Code highlighting in DB colours (`setup/shiki.ts`), Mermaid palette on the official values
- [x] Motion: DB easing curves for clicks and the colour-scheme change, `db-slide` transition along one axis
- [x] Classification marker in every export page (`slide-top.vue`)

### Open

- [ ] Icons: the "Icon Basic Starter Kit" needs the portal download (login); `assets/fonts/icon-ecmx-woff-data.woff` is shipped but unmapped
- [ ] Signature Graphics: no assets available without login; a component would only make sense with the official files
- [ ] Schwelle as typographic connector inside a headline (S variant between two words)
- [ ] Schwelle animation: the order in which the gaps open is simplified (the original opens them from the middle outwards); the loop's overlap of breakdown and build-up is not reproduced
- [ ] Two-colour divider transition from Motion Branding (video-oriented; not mapped to slides yet)
- [ ] Variable fonts (`…VF…woff2`) are shipped but not registered
- [ ] Compare with the official PowerPoint master (easySlides / download section, login): footer contents, classification position, 16:9 details
- [ ] Font licence check before publishing to npm

## Contributing

- `npm install`
- `npm run dev` to start theme preview of `example.md`
- Edit the `example.md` and style to see the changes
- `npm run export` to generate the preview PDF
- `npm run screenshot` to generate the preview PNG
