# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.7.8-alpha.1] - 2026-09-05
### Added
- Automatic dark mode (follows OS/browser `prefers-color-scheme`) for the
  home, privacy, lbg landing, and academy directory/lesson pages, which
  share the `body.lbg-site` token system in `public/css/lbg-theme.css`.
  Colors are hue-preserving dark variants of the real lettuce/beet/
  grapefruit brand palette, not invented. Also fixed two hardcoded colors
  (`site-header` background, hero lede text) that would have broken in
  dark mode, and a stray off-palette nav-hover color in `style.css`.

### Known gap
- The Academy module pages (`src/layouts/LbgaModule.astro`, 13 pages) and
  the `diy/*.astro` pages use their own fully-hardcoded-hex `<style>`
  blocks, independent of `lbg-theme.css` — they don't yet support dark
  mode. Tokenizing them is a separate follow-up.

## [0.7.7-alpha.1] - 2026-09-05
### Added
- Added standardized social footer links (Instagram/LinkedIn/GitHub) to recyclopedia.cc pages.

## [0.7.6-alpha.1] - 2026-09-05
### Added
- `@astrojs/sitemap` integration and `public/robots.txt` for SEO baseline compliance (run `npm install` to pick up the new dependency).
- Open Graph and Twitter Card tags across all page templates.

## [0.7.5-alpha.1] - 2026-09-05
### Added
- Initial changelog baseline.
