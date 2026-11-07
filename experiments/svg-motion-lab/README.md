# VisualBliis Motion Lab 01

A small, isolated, browser-based motion-graphics experiment built with [SVG.js](https://github.com/svgdotjs/svg.js). The production VisualBliis image editor is not modified.

## Features

- A portrait 9:16 (540 x 960 design space) SVG motion graphic
- Editable two-line headline, supporting copy and highlight color
- Staggered SVG.js animations and a replay control
- Exports a **static** 1080 x 1920 PNG still frame
- No accounts, secrets, backend or build step required

**Not included:** animated MP4/GIF export, server-side processing, long-form video editing, OpenToonz, Friction or Theatre.js integration. Saving a PNG does not capture motion.

## Run on Windows

1. Open PowerShell and clone this repository if you do not already have it:

   ```powershell
   git clone https://github.com/aduroja-akintade/VisualBliis-Studio.git
   cd VisualBliis-Studio
   git switch feature/svg-motion-lab-2026-11
   ```

2. Start a local web server from the repository root:

   ```powershell
   py -m http.server 8080
   ```

3. Open http://localhost:8080/experiments/svg-motion-lab/ in your browser.
4. Edit the headline and color, select **Apply and replay**, then select **Export still frame as PNG**.

If you already cloned this repository, use `git fetch origin` and `git switch feature/svg-motion-lab-2026-11` instead of cloning again.

## Technology and licensing

- SVG.js version 3.2.8, MIT licensed
- Import is currently a version-pinned [jsDelivr](https://www.jsdelivr.com/) ES module, so the initial page load **requires internet access**.
- For a production React/Vite integration, install `npm install @svgdotjs/svg.js`, import from npm, include the dependency in the app's lockfile and test bundling.
- No project images, fonts or third-party animation clips are embedded.

## Next validation steps

- [ ] Load the experiment in Chrome or Edge on Windows
- [ ] Verify initial animation and replay
- [ ] Change title, subtitle and accent color
- [ ] Export a 1080 x 1920 PNG and inspect readability
- [ ] Check mobile responsive layout
- [ ] Add unit/integration tests if promoting beyond a demo
- [ ] Define a separate MP4 render pipeline if video export is required

## Relationship to other repositories

Friction, Synfig and OpenToonz are standalone animation applications; FreeMoCap is motion-capture infrastructure; Natron handles node-based compositing; Effekseer creates particle effects; OpenVDB is a volumetric data library; Theatre.js is a separate visual timeline system. None are installed or vendored by this prototype.
