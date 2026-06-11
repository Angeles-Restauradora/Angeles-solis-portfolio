# Asset Guidelines

## Naming conventions

All filenames must be:
- **Lowercase only** — no capitals
- **Hyphens** as separators — no underscores, no spaces
- **Descriptive** — name describes content, not date or camera number
- **Extensions lowercase** — `.jpg`, `.mp4`, not `.JPG`, `.MP4`

## Images

### Homepage key images

| Expected filename | Content | Recommended size |
|---|---|---|
| `hall-hero.jpg` | Museum hall / entrance context | 2400×1600px min |
| `sculpture-room.jpg` | Sculpture gallery / room reference | 2400×1600px min |
| `painting-room.jpg` | Painting studio / gallery reference | 2400×1600px min |
| `portrait-placeholder.jpg` | Professional portrait of Ángeles Solís Parra | 1200×1500px (portrait) |
| `sculpture-plaster-detail-01.jpg` | Close-up of plaster cast surface or detail | 1600×1200px |
| `sculpture-process-01.jpg` | Process photograph from a sculpture project | 1600×1200px |
| `sculpture-before-after-01.jpg` | Before or comparison photograph | 1600×1200px |
| `painting-surface-detail-01.jpg` | Painting surface close-up | 1600×1200px |
| `painting-process-01.jpg` | Painting conservation process | 1600×1200px |
| `painting-before-after-01.jpg` | Before or comparison, painting | 1600×1200px |

### Project hero images

Pattern: `proj-{project-id}-hero.jpg`

| File | Project |
|---|---|
| `proj-vaciados-rabasf-hero.jpg` | RABASF plaster cast collection |
| `proj-premios-roma-hero.jpg` | Premios y Envíos de Roma |
| `proj-sevilla-hero.jpg` | Universidad de Sevilla |
| `proj-mnra-hero.jpg` | Museo de Reproducciones Artísticas |
| `proj-pompeya-hero.jpg` | Pompeii |
| `proj-prado-hero.jpg` | Museo del Prado |
| `proj-retablos-hero.jpg` | Retablos y madera policromada |
| `proj-san-andres-hero.jpg` | Cúpula de San Andrés |
| `proj-pintura-rabasf-hero.jpg` | Pintura RABASF |
| `proj-malaga-hero.jpg` | Museo de Málaga |
| `proj-granada-hero.jpg` | Museo de Granada |
| `proj-campo-valdes-hero.jpg` | Campo Valdés |
| `proj-somosierra-hero.jpg` | Somosierra |
| `proj-zamora-hero.jpg` | Catedral de Zamora |
| `proj-particulares-hero.jpg` | Colecciones privadas |
| `proj-anjusil-hero.jpg` | Anjusil® methodology |
| `proj-premios-hero.jpg` | Premios y reconocimientos |

### Project gallery images

Pattern: `proj-{id}-{type}-{n}.jpg`

Where type is one of: `before`, `during`, `after`, `detail`, `process`, `site`

Examples:
- `proj-vaciados-rabasf-before-01.jpg`
- `proj-vaciados-rabasf-process-02.jpg`
- `proj-vaciados-rabasf-after-01.jpg`

## Formats and sizes

| Context | Format | Max width | Quality |
|---|---|---|---|
| Hero images | JPEG | 2400px | 85% |
| Room stage images | JPEG | 1800px | 85% |
| Project card thumbnails | JPEG | 900px | 82% |
| Gallery images | JPEG | 1800px | 85% |
| Portrait | JPEG | 1200px | 88% |

Use **WebP** if you can control browser targets. Add JPEG as fallback.

## Videos

| File | Duration | Quality notes |
|---|---|---|
| `hall-to-sculpture.mp4` | 3–8 seconds | 1920×1080, H.264, no audio |
| `sculpture-to-painting.mp4` | 3–8 seconds | 1920×1080, H.264, no audio |

Optional WebM versions (smaller, better browser compression):
- `hall-to-sculpture.webm`
- `sculpture-to-painting.webm`

### Video encoding guidelines
- Codec: H.264 (MP4) + VP9 (WebM)
- No audio track (muted playback)
- Frame rate: 24fps
- Bitrate: 2–4 Mbps is sufficient for a loop transition
- Keep files under 8MB each

### Video content
Both videos are first-person walking shots through museum corridors:
- `hall-to-sculpture.mp4`: Moving from the entry hall towards the sculpture gallery
- `sculpture-to-painting.mp4`: Moving from the sculpture area towards the painting gallery

The videos play in reverse for the return journey (Back to Hall, Back to Sculpture Room).

## Image optimization before uploading

Recommended workflow:
1. Export from raw/TIFF at full resolution
2. Crop to subject
3. Export JPEG at 85% quality
4. Resize to target width using ImageMagick or Squoosh
5. Check file size: hero images should be under 400KB, thumbnails under 120KB
