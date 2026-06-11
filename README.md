# Ángeles Solís Parra — Conservation Portfolio

A premium, institutional web portfolio for Ángeles Solís Parra, Senior Conservator-Restorer of Cultural Heritage. Built as a static site for GitHub Pages.

## Concept

The site works as a museum visit in three rooms: **Museum Hall → Sculpture Room → Painting Room**. Video transitions between rooms are triggered by navigation buttons, not by scroll. The result is a controlled, immersive experience that works clearly for all audiences.

---

## Running locally

Open `index.html` in a browser directly, or serve with any static server:

```bash
# Python
python3 -m http.server 8080

# Node (if installed)
npx serve .
```

Then open `http://localhost:8080` in your browser.

> **Note:** Video transitions require a local server (browsers block `file://` video for security). Direct file opening shows the site but skips the videos — scroll navigation works normally.

---

## File structure

```
angeles-solis-portfolio/
├── index.html              ← Homepage (10 sections)
├── complete-archive.html   ← Full project archive with filters
├── project-detail.html     ← Project detail template
│
├── assets/
│   ├── css/
│   │   ├── main.css        ← Variables, reset, base
│   │   ├── typography.css  ← Fonts and text styles
│   │   ├── layout.css      ← All section/grid layouts
│   │   ├── components.css  ← Buttons, cards, overlay, room elements
│   │   └── animations.css  ← Reveals, transitions, motion
│   │
│   ├── js/
│   │   ├── transitions.js  ← MuseumTransitionOverlay + playMuseumTransition()
│   │   ├── main.js         ← Nav, scroll reveals, button event wiring
│   │   └── archive.js      ← Filter logic for complete-archive.html
│   │
│   ├── images/             ← All images (see naming guide below)
│   ├── videos/             ← Transition videos
│   └── data/
│       ├── projects.json   ← Full project data (17 projects)
│       └── navigation.json ← Navigation structure
│
└── docs/                   ← Design and asset documentation
```

---

## Adding images

Place images in `assets/images/`. Key images for the homepage:

| File | Purpose | Where it appears |
|------|---------|-----------------|
| `hall-hero.jpg` | Museum hall / homepage hero (right column) | Hero section |
| `sculpture-room.jpg` | Sculpture gallery reference | Sculpture Room stage |
| `painting-room.jpg` | Painting studio reference | Painting Room stage |
| `sculpture-plaster-detail-01.jpg` | Plaster detail shot | Sculpture Room stage |
| `sculpture-process-01.jpg` | Process photograph | Sculpture Room stage |
| `painting-surface-detail-01.jpg` | Painting surface detail | Painting Room stage |
| `painting-process-01.jpg` | Painting process | Painting Room stage |
| `portrait-placeholder.jpg` | Professional portrait | About section |

Current placeholders: AI-generated museum reference images. Replace with real photographs from the material_inicial folder.

---

## Adding videos

Place videos in `assets/videos/`:

| File | Transition |
|------|-----------|
| `hall-to-sculpture.mp4` | Hall → Sculpture (and reverse: Sculpture → Hall) |
| `sculpture-to-painting.mp4` | Sculpture → Painting (and reverse: Painting → Sculpture) |

Both files are already in place from material_inicial. WebM versions (for smaller file size) can be added as `hall-to-sculpture.webm` and `sculpture-to-painting.webm`.

---

## How video transitions work

Transitions are triggered by buttons with three `data-` attributes:

```html
<button
  data-transition-src="assets/videos/hall-to-sculpture.mp4"
  data-transition-target="#sculpture"
  data-transition-reverse="false"
>
  Enter Sculpture Room
</button>
```

`main.js` catches clicks on any element with `data-transition-src` and calls:

```javascript
playMuseumTransition({
  videoSrc:       'assets/videos/hall-to-sculpture.mp4',
  targetSelector: '#sculpture',
  reverse:        false
})
```

### Reverse playback

Reverse uses a frame-by-frame `seeked` event chain in `transitions.js`. The video steps backward through `currentTime` at approximately 22fps. Browsers that don't support negative `playbackRate` handle this correctly because we're seeking, not playing backwards.

### prefers-reduced-motion

If the user has reduced motion active, `playMuseumTransition()` skips the video entirely and scrolls directly to the target section.

---

## Adding projects to the archive

Edit `assets/data/projects.json`. Each project has this structure:

```json
{
  "id": "unique-id",
  "title": "Project Title",
  "category": ["sculpture", "institutional-collections"],
  "type": "Conservation & Restoration",
  "institution": "Institution name",
  "location": "City, Country",
  "year": "2000–2004",
  "shortDescription": "One sentence for the card.",
  "longDescription": "Full text for the project detail page.",
  "isSelected": true,
  "heroImage": "assets/images/proj-id-hero.jpg",
  "gallery": ["assets/images/proj-id-01.jpg"],
  "tags": ["tag1", "tag2"],
  "roomNumber": "01"
}
```

Add the project card HTML manually in `complete-archive.html` to match (the archive grid is static HTML for reliability on GitHub Pages without a build step).

---

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, root `/`
4. The site will be live at `https://USERNAME.github.io/REPOSITORY/`

For a custom domain, add a `CNAME` file at the root with the domain name.

---

## Naming conventions

- All lowercase, hyphens, no spaces
- Images: `proj-{id}-{role}.jpg` for project images, descriptive names for all others
- Videos: `{from}-to-{to}.mp4`
- All extensions lowercase (`.jpg`, `.mp4`, not `.JPG`, `.MP4`)
