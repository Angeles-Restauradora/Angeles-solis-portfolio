# Design Direction

## Concept

**A curated museum journey through the work of Ángeles Solís Parra.**

The site operates as a visit to three rooms of a contemporary museum:
1. Museum Hall (Homepage Hero)
2. Sculpture Room
3. Painting Room

The journey is not automatic — the user decides when to enter each room by pressing a button. Video transitions mark the passage between spaces. After the rooms, the visit continues through About, Recognition and Research as a natural continuation.

## Tonal direction

The site must feel like:
- A contemporary museum with institutional weight
- A senior professional's curated archive
- A catalogue of significant work, not a promotional brochure
- Confident, restrained, precise

It must NOT feel like:
- A lifestyle portfolio
- A blog or CV website
- A technology demonstration
- Decorative or cozy

## Visual language

### Color
- `#F8F6F3` — warm museum white (walls, background)
- `#1A1714` — deep warm charcoal (type, borders, dark panels)
- `#6B6158` — warm mid-grey (secondary text, metadata)
- `#5C3B26` — deep terracotta / institutional brown (accent, buttons)
- `#141210` — near-black (hero panels, recognition section)

The warm tones prevent the site from feeling cold or technological. The terracotta accent echoes conservation materials (plaster, earth, ochre) without being decorative.

### Typography
- **Cormorant Garamond** (display): 300–500 weight, for headings. Brings institutional, scholarly elegance without romanticism.
- **DM Sans** (body): 300–700 weight, for text and UI. Clean, contemporary, highly legible.
- **DM Mono** (metadata/labels): Small caps treatment, used for category tags, dates, section labels. Precision without coldness.

### Grid
Strict 1px border system. All panels have 1px solid `var(--fg)` borders. Shadows are also 1px offset solid shadows (`box-shadow: 16px 16px 0 color`), not blur-based. This gives the site the feel of a printed catalogue.

### Images
- All images filtered: `grayscale(0.08) saturate(0.82) contrast(1.22)` — desaturates slightly for coherence but preserves material presence.
- Images frame the work, not the conservator.
- Large, architectural compositions.

## Spatial logic

### Museum Hall (Hero)
Dark panel on the left. Large image on the right. The split communicates: entering a space that is both institutional and intimate. The "Enter Sculpture Room" button is the primary call to action — it initiates the journey.

### Room Sections
Each room is a full-viewport section. The room number watermark (01, 02) gives spatial orientation. The stage (right column) is a static image composition — no scroll movement. Navigation buttons at the bottom close the experience and offer an explicit path forward or back.

### Dark panels
The deep charcoal panels (hero copy, method card, recognition section) are literal museum walls — the text sits on them like exhibition labels.

## Video transitions

The transitions are museum corridor videos: the camera moves through a physical space. They mark a real change of room, not just a scroll position. The user can skip at any time. prefers-reduced-motion users never see the video.

## What this site is NOT

- No parallax
- No scroll-triggered animations beyond basic reveals
- No gradients used decoratively
- No rounded corners
- No shadow blur (shadows are solid offset lines)
- No purple
- No lifestyle photography
- No decorative emoji or illustration
