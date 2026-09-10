# slidev-theme-db-theme

[![NPM version](https://img.shields.io/npm/v/slidev-theme-db-theme?color=3AB9D4&label=)](https://www.npmjs.com/package/slidev-theme-db-theme)

A (...) theme for [Slidev](https://github.com/slidevjs/slidev).

<!--
  Learn more about how to write a theme:
  https://sli.dev/guide/write-theme.html
--->

<!--
  run `npm run dev` to check out the slides for more details of how to start writing a theme
-->

<!--
  Put some screenshots here to demonstrate your theme

  Live demo: [...]
-->

## Install

Add the following frontmatter to your `slides.md`. Start Slidev then it will prompt you to install the theme automatically.

<pre><code>---
theme: <b>db-theme</b>
---</code></pre>

Learn more about [how to use a theme](https://sli.dev/guide/theme-addon#use-theme).

## Dark mode

The theme supports both colour schemes. Choose one per presentation with the
`colorSchema` headmatter option:

<pre><code>---
theme: db-theme
colorSchema: auto   # auto | light | dark
---</code></pre>

- `auto` – follow the OS preference and show a toggle in the navigation bar
- `light` – plain white background with cold-black (`--cold-black`) text
- `dark` – cold-black background with white text

Backgrounds and font colours are driven by the `--db-background` /
`--db-foreground` CSS variables defined in `styles/layout.css`; override them
there (or via `themeConfig`) to customise either scheme.

## Layouts

This theme provides the following layouts:

> TODO:

## Components

This theme provides the following components:

> TODO:

## Contributing

- `npm install`
- `npm run dev` to start theme preview of `example.md`
- Edit the `example.md` and style to see the changes
- `npm run export` to generate the preview PDF
- `npm run screenshot` to generate the preview PNG
