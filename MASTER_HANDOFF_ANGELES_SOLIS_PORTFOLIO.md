# MASTER_HANDOFF_ANGELES_SOLIS_PORTFOLIO

**Fecha de handoff:** 2026-08-26  
**Proyecto:** `angeles-solis-portfolio`  
**Estado:** proyecto existente en GitHub, recuperado mediante ZIP y revisado localmente.  
**Objetivo inmediato:** asegurar continuidad antes de clonar, tocar código o iniciar una nueva iteración visual.

---

## 1. Executive Summary

Este proyecto es una web portfolio para **Ángeles Solís Parra**, conservadora-restauradora senior de patrimonio cultural. La web está concebida como una experiencia museística premium: el usuario entra en un **Hall**, avanza a una **Sala de Vaciados** y después a una **Sala de Pintura** mediante botones que activan vídeos de transición.

La lógica funcional actual está bien planteada:

- Hall / Home.
- Entrada a Vaciados con vídeo `hall-to-sculpture.mp4`.
- Vuelta de Vaciados a Hall usando el mismo vídeo en reverso.
- Entrada de Vaciados a Pintura con vídeo `sculpture-to-painting.mp4`.
- Vuelta de Pintura a Vaciados usando el mismo vídeo en reverso.
- Archive y Project Detail dinámicos desde `assets/data/projects.json`.

El principal pendiente no es la arquitectura funcional, sino el **acabado visual**: necesita más dirección de arte, más diseño, más jerarquía editorial, mejor composición de salas, mejor tratamiento de cards, y una sensación más clara de museo contemporáneo premium.

---

## 2. Project Purpose

La web no debe ser un CV ni una simple galería. Su objetivo es posicionar a Ángeles Solís Parra como una profesional senior con autoridad institucional y técnica.

Debe comunicar:

- Más de tres décadas de práctica profesional.
- Especialización en escultura y vaciados históricos en yeso.
- Experiencia en pintura, pintura mural y colecciones institucionales.
- Premios y reconocimiento: Premio Nacional 2004 y Europa Nostra 2006.
- Investigación aplicada y metodología propia, especialmente Anjusil®.
- Capacidad de trabajar con museos, academias, patrimonio, colecciones privadas e instituciones.

Concepto central:

> A curated museum journey through the work of Ángeles Solís Parra.

---

## 3. Target Audience

Público previsto:

- Museos.
- Instituciones culturales.
- Academias.
- Fundaciones patrimoniales.
- Responsables de patrimonio.
- Coleccionistas privados.
- Comisarios.
- Profesionales senior del sector cultural.
- Potenciales clientes o colaboradores.

Implicación UX importante: parte del público puede ser mayor o poco acostumbrado a experiencias web experimentales. Por eso se descartó depender de parallax y se eligió un flujo más explícito: **botón → vídeo → sala**.

---

## 4. Current Uploaded / Inspected Files

El ZIP inspeccionado contiene el repo completo descargado de GitHub:

```txt
angeles-solis-portfolio-main.zip
```

Estructura real encontrada:

```txt
angeles-solis-portfolio-main/
├── README.md
├── index.html
├── complete-archive.html
├── project-detail.html
├── assets/
│   ├── css/
│   │   ├── animations.css
│   │   ├── components.css
│   │   ├── layout.css
│   │   ├── main.css
│   │   ├── style.css
│   │   └── typography.css
│   ├── data/
│   │   ├── navigation.json
│   │   └── projects.json
│   ├── images/
│   │   └── 32 image files
│   ├── js/
│   │   ├── archive.js
│   │   ├── main.js
│   │   ├── micro.js
│   │   └── transitions.js
│   └── videos/
│       ├── hall-to-sculpture.mp4
│       └── sculpture-to-painting.mp4
└── docs/
    ├── asset-guidelines.md
    └── design-direction.md
```

Notas:

- `README.md` y `docs/` ya documentan parte del concepto, pero este handoff debe ser la fuente de continuidad más completa.
- El HTML actual importa `assets/css/style.css` como CSS principal.
- Existen CSS modulares (`main.css`, `layout.css`, `components.css`, `typography.css`, `animations.css`), pero en la implementación actual parecen no ser los CSS principales importados por las páginas. Revisar antes de editar para evitar cambios en archivos que no impacten.

---

## 5. Current Technical Structure

### Stack

- HTML estático.
- CSS.
- JavaScript vanilla.
- Sin backend.
- Pensado para GitHub Pages.

### Páginas principales

| Archivo | Función |
|---|---|
| `index.html` | Home / experiencia de museo por salas. |
| `complete-archive.html` | Archivo completo con filtros y grid dinámico. |
| `project-detail.html` | Plantilla dinámica para proyectos concretos. |

### Datos

| Archivo | Función |
|---|---|
| `assets/data/projects.json` | Fuente principal para Archive y Project Detail. Contiene 17 proyectos. |
| `assets/data/navigation.json` | Estructura de navegación prevista/documental. No parece ser consumida por el HTML actual. |

### JS

| Archivo | Función actual |
|---|---|
| `assets/js/transitions.js` | Sistema de transición entre salas, reproducción de vídeo normal/reversa, cambio de panel activo. |
| `assets/js/main.js` | Wiring de botones `room-nav`, navegación directa por salas, nav active state. |
| `assets/js/micro.js` | Scroll reveal de elementos con `data-reveal`. |
| `assets/js/archive.js` | Filtro de cards para una versión posiblemente anterior; la página actual usa JS inline. |

### CSS

| Archivo | Estado |
|---|---|
| `assets/css/style.css` | CSS principal real usado por las páginas actuales. Tiene 1774 líneas. |
| `assets/css/main.css`, `layout.css`, `components.css`, `typography.css`, `animations.css` | Existen pero no parecen estar importados directamente. Podrían ser de una versión anterior o documentación modular pendiente. |

---

## 6. Current User Experience Flow

### Flow principal

```txt
Hall / Home
→ Enter Sala de Vaciados
→ reproduce assets/videos/hall-to-sculpture.mp4 normal
→ muestra panel Vaciados

Vaciados
→ Back to Museum Hall
→ reproduce assets/videos/hall-to-sculpture.mp4 en reverso
→ muestra panel Hall

Vaciados
→ Enter Sala de Pintura
→ reproduce assets/videos/sculpture-to-painting.mp4 normal
→ muestra panel Pintura

Pintura
→ Back to Sala de Vaciados
→ reproduce assets/videos/sculpture-to-painting.mp4 en reverso
→ muestra panel Vaciados

Pintura
→ View Complete Archive
→ abre complete-archive.html
```

### Decisión importante

La experiencia principal **no depende de scroll parallax**. Se basa en salas de pantalla completa y vídeos de transición activados por botones.

---

## 7. Current Page-by-Page Breakdown

## 7.1 `index.html`

### Estado actual

`index.html` tiene:

- `html lang="es"` aunque el contenido principal está mayoritariamente en inglés con algunos términos en español. Revisar si debe pasar a `lang="en"` o si se acepta un híbrido deliberado.
- Navegación fija superior.
- `#room-stage` a pantalla completa.
- Imagen de fondo `#stage-bg`.
- Vídeo de transición `#stage-video`.
- Overlay oscuro `#stage-dark`.
- Panel activo `.room-panel.is-active`.
- Tres paneles principales:
  - `#rp-home`
  - `#rp-vaciados`
  - `#rp-pintura`
- Secciones de scroll posteriores:
  - About.
  - Recognition.
  - Research & Methodology.
  - Archive CTA.
  - Contact.

### Hall / Home actual

Contenido:

- Eyebrow: `Conservation Portfolio · Madrid`.
- Nombre: `Ángeles Solís Parra`.
- Role: `Senior Conservator-Restorer of Cultural Heritage`.
- Description: especialista en historical plaster casts, sculpture and institutional collections.
- Stats:
  - 36+.
  - 2004.
  - 2006.
  - Major institutions.
- Botón de entrada a Vaciados.

### Vaciados actual

Contenido:

- Eyebrow: `Sala I`.
- Título: `Vaciados`.
- Subtitle: `Historical plaster casts, sculpture collections and institutional heritage.`
- Texto: `A study of volume, surface and restoration...`
- Proyectos destacados:
  - `vaciados-rabasf`
  - `museo-reproducciones-madrid`
  - `pompeya`
  - `museo-del-prado`

### Pintura actual

Contenido:

- Eyebrow: `Sala II`.
- Título: `Pintura`.
- Subtitle: `Painting restoration, mural conservation and institutional collections.`
- Texto: `Care of painted surfaces across time...`
- Proyectos destacados:
  - `pintura-rabasf`
  - `museo-malaga`
  - `catedral-zamora`
  - `museo-granada`
- Botón de vuelta a Vaciados.
- Botón hacia Complete Archive.

### Observación crítica

La lógica del flujo es correcta y debe conservarse. El rediseño pendiente debe centrarse en dirección visual, no en rehacer la navegación.

---

## 7.2 `complete-archive.html`

### Estado actual

La página incluye:

- Navegación superior.
- Header del archivo con título `The Work`.
- Descripción del archivo.
- Filtros por categoría.
- Grid dinámico `#archive-grid`.
- Contador `#archive-count`.
- Nota editorial final.
- Footer.
- JS inline que carga `assets/data/projects.json`, construye cards y filtra por categoría.

### Categorías actuales

- All.
- Sculpture.
- Painting.
- Archaeological & Mural.
- Institutional.
- Private.
- Research.
- Awards.

### Observación crítica

La lógica dinámica funciona conceptualmente. Lo pendiente es elevar la presentación visual para que parezca un catálogo curado, no un grid funcional.

---

## 7.3 `project-detail.html`

### Estado actual

La página:

- Lee `id` desde query param: `project-detail.html?id=...`.
- Carga `assets/data/projects.json`.
- Busca el proyecto por ID.
- Actualiza título de documento.
- Rellena hero, categoría, título, metadatos, contenido, tags, galería y navegación anterior/siguiente.
- Soporta parámetro `from` para volver a `index.html?room=vaciados` o `index.html?room=pintura`.

### Observación crítica

La estructura dinámica está bien para un MVP. Visualmente debe evolucionar hacia una ficha tipo catálogo de museo / case study institucional.

---

## 8. Homepage Architecture

La arquitectura ideal y actual de la home es:

1. Hall / Home.
2. Vaciados / Sculpture Room.
3. Pintura / Painting Room.
4. About Ángeles.
5. Recognition.
6. Research & Methodology.
7. CTA to Complete Archive.
8. Contact.

En versiones anteriores se hablaba de `Professional positioning` como sección separada; en la versión actual está integrada dentro del Hall mediante stats 36+, 2004, 2006 y Major Institutions.

Recomendación: no añadir otra sección redundante si el Hall ya resuelve esto, salvo que el rediseño necesite separar el bloque para mejor jerarquía.

---

## 9. Room Navigation System

### Elementos HTML clave

- `#room-stage` como contenedor general.
- `#stage-bg` para imagen fija del espacio activo.
- `#stage-video` para transiciones.
- `#stage-dark` como overlay de lectura.
- `.room-panel` para cada sala.
- `.room-nav` para botones de movimiento.

### Atributos de navegación

Cada botón de transición usa:

```html
<button class="room-nav"
  data-to="rp-vaciados"
  data-video="assets/videos/hall-to-sculpture.mp4"
  data-reverse="false">
```

Campos:

- `data-to`: panel destino.
- `data-video`: vídeo a reproducir.
- `data-reverse`: `true` o `false`.

---

## 10. Video Transition System

Archivo principal:

```txt
assets/js/transitions.js
```

Lógica descrita por el propio código:

1. Current room content fades out.
2. Video plays full-viewport.
3. Video freezes on last frame.
4. Dark overlay fades in.
5. New room content fades in.
6. Stage dark + video fade out.

### Vídeos reales existentes

| Archivo | Resolución | FPS | Duración aprox. | Peso |
|---|---:|---:|---:|---:|
| `assets/videos/hall-to-sculpture.mp4` | 1920×1080 | 24 | 5.04 s | 4.5 MB |
| `assets/videos/sculpture-to-painting.mp4` | 1920×1080 | 24 | 5.04 s | 3.6 MB |

### Notas

- Son pesos razonables para desktop.
- Hay que testear en móvil.
- No existe botón `Skip transition` en la implementación actual observada. Se había previsto antes como requisito de accesibilidad; considerar añadirlo en siguiente iteración.

---

## 11. Reverse Playback Logic

`transitions.js` implementa reverso manual mediante `currentTime`, no mediante `playbackRate = -1`.

### Lógica actual inferida

- Para reproducción normal, el vídeo empieza en `currentTime = 0` y espera evento `ended`.
- Para reverso:
  - espera `loadedmetadata`.
  - posiciona el vídeo en `duration - 0.01`.
  - reduce `currentTime` en pasos de `1 / 22`.
  - usa evento `seeked` y `requestAnimationFrame`.
  - resuelve cuando llega a `currentTime <= 0.04`.

### Riesgos

- El reverso manual con `currentTime` puede ir a tirones en algunos navegadores o móviles.
- No hay gestión explícita de cancelación si el usuario cambia rápido de estado.
- El `STEP = 1 / 22` puede no coincidir exactamente con 24 fps; funciona, pero se puede optimizar.
- Sería deseable añadir fallback si el vídeo tarda en cargar o da error.

---

## 12. Complete Archive

### Objetivo

Debe ser la capa de consulta del portfolio completo. La home es curada; el archivo es el catálogo.

### Estado actual

`complete-archive.html` carga `projects.json` y renderiza cards dinámicamente.

Cada card muestra:

- Imagen hero.
- Categoría principal.
- Año.
- Título.
- Short description.
- CTA `View project →`.

### Pendientes visuales

- Dar más presencia editorial al header.
- Mejorar compactación y ritmo de cards.
- Diferenciar mejor categorías.
- Evitar sensación de grid estándar.
- Mejorar responsive.
- Revisar si el filtro debe usar `aria-pressed` para accesibilidad, no solo `.is-active`.

---

## 13. Project Detail Template

### Objetivo

Cada proyecto debe sentirse como una ficha de catálogo premium, no como una página técnica básica.

### Estado actual

`project-detail.html` carga datos desde `projects.json` y rellena:

- Hero image.
- Category labels.
- Title.
- Type.
- Institution.
- Location.
- Year.
- Long description.
- Tags.
- Gallery.
- Previous / Next.
- Back links.

### Pendientes

- Separar claramente `Context`, `Conservation Challenge`, `Intervention`, `Result`, `Professional Relevance` si el modelo de datos lo permite.
- Mejorar composición de metadatos.
- Mejorar gallery.
- Añadir navegación contextual más clara desde sala o archive.

---

## 14. Content Strategy

### Principio

La home no debe explicar todo. Debe ser una exposición curada.

### Jerarquía recomendada

- Hall: identidad, autoridad y entrada.
- Vaciados: especialidad diferencial.
- Pintura: amplitud técnica y patrimonial.
- About: perfil profesional senior.
- Recognition: autoridad institucional.
- Research: metodología, Anjusil®, docencia.
- Archive: amplitud completa de trayectoria.
- Detail: evidencia y caso concreto.

---

## 15. Sculpture / Vaciados Content

### Enfoque

La sala de Vaciados debe ser la más estratégica porque conecta con el diferencial principal de Ángeles:

- vaciados históricos en yeso;
- escultura;
- colecciones institucionales;
- superficie, volumen, fisura, pátina;
- recuperación de lectura formal;
- metodología aplicada;
- RABASF;
- Anjusil®.

### Texto actual base

```txt
Vaciados
Historical plaster casts, sculpture collections and institutional heritage.
A study of volume, surface and restoration: how institutional casts recover presence without erasing the evidence of time.
```

### Proyectos destacados actuales en sala

| ID | Proyecto | Motivo |
|---|---|---|
| `vaciados-rabasf` | Historical Plaster Cast Collection — RABASF | Proyecto protagonista. Conecta con yeso, institución, reconocimiento y método. |
| `museo-reproducciones-madrid` | Museo Nacional de Reproducciones Artísticas | Refuerza línea de colecciones de vaciados. |
| `pompeya` | Archaeological Conservation — Pompeii | Amplía a patrimonio arqueológico. |
| `museo-del-prado` | Sculpture Conservation — Museo Nacional del Prado | Refuerza autoridad institucional. |

### Nota estratégica

En conversaciones previas se había considerado incluir Universidad de Sevilla en sala. En la versión actual aparece Museo del Prado en lugar de Sevilla. Ambas opciones son válidas; decisión pendiente:

- Si queremos reforzar vaciados en yeso: incluir Universidad de Sevilla.
- Si queremos reforzar prestigio institucional: mantener Museo del Prado.

Anjusil® debe aparecer muy claramente en Research/Methodology y en el Archive. Puede aparecer en Vaciados como mención secundaria, pero no conviene convertir la sala en una lista larga.

---

## 16. Painting / Pintura Content

### Enfoque

La sala de Pintura debe comunicar:

- pintura de caballete;
- pintura mural;
- superficie pictórica;
- lienzo;
- pigmento;
- marco;
- craquelado;
- colecciones institucionales;
- colecciones privadas;
- patrimonio mural.

### Texto actual base

```txt
Pintura
Painting restoration, mural conservation and institutional collections.
Care of painted surfaces across time — from Renaissance panels to mural ensembles, from private to national institutions.
```

### Proyectos destacados actuales en sala

| ID | Proyecto | Motivo |
|---|---|---|
| `pintura-rabasf` | Painting Conservation — RABASF Collection | Conexión institucional y colección pictórica. |
| `museo-malaga` | Museo de Bellas Artes de Málaga | Pintura institucional. |
| `catedral-zamora` | Capilla del Cardenal, Catedral de Zamora | Patrimonio mural/religioso. |
| `museo-granada` | Museo de Bellas Artes de Granada | Pintura institucional. |

### Nota estratégica

Puede valorarse si incluir `colecciones-privadas` en la sala de Pintura o dejarlo solo en el Archive. Si el objetivo es atraer encargos privados, conviene darle visibilidad.

---

## 17. Recognition Content

### Estado actual

La sección Recognition incluye:

- 2004 — Premio Nacional de Conservación y Restauración del Patrimonio Cultural.
- 2006 — Europa Nostra Award.
- Prado — Fundación Botín scholarship at Museo Nacional del Prado.
- ® — Anjusil® methodology.

### Objetivo visual

Debe sentirse monumental, institucional y no decorativa.

Recomendaciones:

- Dar más peso tipográfico a 2004 y 2006.
- Reducir sensación de cards normales.
- Hacerla parecer una sección de autoridad o reconocimiento oficial.
- Usar contraste fuerte y mucho aire.

---

## 18. Research, Teaching & Methodology

### Estado actual

La versión actual ya incluye sección `#research`.

Contenidos actuales:

- `Anjusil® — Cleaning methodology for historical plaster casts`.
- `Material analysis and documentation of historical casts`.
- `Conservation pedagogy and institutional training`.

### Objetivo

Debe reforzar que Ángeles no solo restaura: investiga, documenta, desarrolla criterios, publica, enseña y transfiere conocimiento.

### Pendiente

Verificar datos exactos de publicaciones, conferencias y docencia si se quiere hacer la sección más factual. Si no hay datos concretos, mantener redacción institucional general.

---

## 19. Assets Inventory

### Imágenes actuales

| Archivo | Dimensiones | Peso |
|---|---:|---:|
| `diploma-europa-nostra.jpg` | 3657×3569 | 12992 KB |
| `hall-hero.jpg` | 1672×941 | 1732 KB |
| `painting-before-after-01.jpg` | 2592×1944 | 1775 KB |
| `painting-granada-after.jpg` | 664×461 | 54 KB |
| `painting-process-01.jpg` | 3872×2592 | 4930 KB |
| `painting-rabasf-site.jpg` | 2048×1536 | 1573 KB |
| `painting-room.jpg` | 1672×941 | 2071 KB |
| `painting-surface-detail-01.jpg` | 4402×3495 | 1567 KB |
| `portrait-placeholder.jpg` | 894×1539 | 234 KB |
| `proj-anjusil-hero.jpg` | 4000×6000 | 1488 KB |
| `proj-campo-valdes-hero.jpg` | 890×667 | 97 KB |
| `proj-granada-hero.jpg` | 1777×1193 | 477 KB |
| `proj-malaga-hero.jpg` | 1814×1315 | 373 KB |
| `proj-mnra-hero.jpg` | 2048×1536 | 1334 KB |
| `proj-particulares-hero.jpg` | 5184×3025 | 1794 KB |
| `proj-pintura-rabasf-hero.jpg` | 2873×2271 | 625 KB |
| `proj-pompeya-hero.jpg` | 1200×803 | 326 KB |
| `proj-prado-hero.jpg` | 3117×3619 | 1446 KB |
| `proj-premios-hero.jpg` | 1653×2336 | 483 KB |
| `proj-premios-roma-hero.jpg` | 5184×3888 | 7700 KB |
| `proj-retablos-hero.jpg` | 500×375 | 38 KB |
| `proj-san-andres-hero.jpg` | 6908×4551 | 6611 KB |
| `proj-sevilla-hero.jpg` | 3264×2448 | 2874 KB |
| `proj-somosierra-hero.jpg` | 7087×4808 | 1648 KB |
| `proj-vaciados-rabasf-hero.jpg` | 5184×3888 | 8887 KB |
| `proj-zamora-hero.jpg` | 6876×3962 | 10423 KB |
| `sculpture-ariadna-hero.jpg` | 1544×1081 | 220 KB |
| `sculpture-before-after-01.jpg` | 1536×2048 | 1935 KB |
| `sculpture-plaster-detail-01.jpg` | 3789×5432 | 1289 KB |
| `sculpture-prado-after.jpg` | 2993×2309 | 1298 KB |
| `sculpture-process-01.jpg` | 1536×1024 | 609 KB |
| `sculpture-room.jpg` | 1672×941 | 1842 KB |

### Vídeos actuales

| Archivo | Dimensiones | Duración | Peso |
|---|---:|---:|---:|
| `hall-to-sculpture.mp4` | 1920×1080 | 5.04 s | 4.5 MB |
| `sculpture-to-painting.mp4` | 1920×1080 | 5.04 s | 3.6 MB |

---

## 20. Missing Files / Dependencies

### No faltan archivos críticos para el estado actual

El ZIP incluye:

- HTML principal.
- CSS principal.
- JS principal.
- `projects.json`.
- Imágenes de home/proyectos.
- Dos vídeos de transición.

### Observaciones

- `archive.js` existe, pero `complete-archive.html` usa JS inline. Se puede refactorizar.
- Los CSS modulares existen, pero las páginas importan solo `style.css`. Si se edita `components.css`, por ejemplo, probablemente no habrá efecto salvo que se importe.
- `.DS_Store` está dentro del ZIP. Debería eliminarse del repo y añadirse a `.gitignore`.
- No se encontró `.gitignore` en el ZIP. Recomendada su creación.

### Referencias no problemáticas

Se detectaron referencias de ejemplo en documentación como `proj-id-hero.jpg` o `projects.js`. No son dependencias reales de la web actual.

---

## 21. Data Model / projects.json

### Campos actuales esperados

Los proyectos usan, como mínimo:

- `id`
- `title`
- `category`
- `type`
- `institution`
- `location`
- `year`
- `shortDescription`
- `longDescription`
- `heroImage`
- `gallery`
- `tags`

### Proyectos actuales (17)

| ID | Title | Categories | Year | Hero |
|---|---|---|---|---|
| `vaciados-rabasf` | Historical Plaster Cast Collection — RABASF | sculpture, institutional-collections | 2001–2006 | `assets/images/proj-vaciados-rabasf-hero.jpg` |
| `premios-envios-roma` | Premios y Envíos de Roma — RABASF Sculpture Collection | sculpture, institutional-collections | 2002–2007 | `assets/images/proj-premios-roma-hero.jpg` |
| `universidad-sevilla` | Plaster Cast Collection — Universidad de Sevilla | sculpture, institutional-collections | 2007–2009 | `assets/images/proj-sevilla-hero.jpg` |
| `museo-reproducciones-madrid` | Museo Nacional de Reproducciones Artísticas | sculpture, institutional-collections | 2009–2011 | `assets/images/proj-mnra-hero.jpg` |
| `pompeya` | Archaeological Conservation — Pompeii | sculpture, archaeological-mural | 2005 | `assets/images/proj-pompeya-hero.jpg` |
| `museo-del-prado` | Sculpture Conservation — Museo Nacional del Prado | sculpture, institutional-collections | 2003–2004 | `assets/images/proj-prado-hero.jpg` |
| `retablos-polychrome` | Retablos & Polychrome Wood Heritage | sculpture | 1995–2012 | `assets/images/proj-retablos-hero.jpg` |
| `cupula-san-andres` | Sculptural Ensemble — Cúpula de San Andrés | sculpture, archaeological-mural | 2008 | `assets/images/proj-san-andres-hero.jpg` |
| `pintura-rabasf` | Painting Conservation — RABASF Collection | painting, institutional-collections | 2004–2014 | `assets/images/proj-pintura-rabasf-hero.jpg` |
| `museo-malaga` | Painting Conservation — Museo de Bellas Artes de Málaga | painting, institutional-collections | 2010–2012 | `assets/images/proj-malaga-hero.jpg` |
| `museo-granada` | Painting Conservation — Museo de Bellas Artes de Granada | painting, institutional-collections | 2011–2014 | `assets/images/proj-granada-hero.jpg` |
| `campo-valdes-gijon` | Archaeological Mural — Museo-Yacimiento de Campo Valdés | painting, archaeological-mural | 2006 | `assets/images/proj-campo-valdes-hero.jpg` |
| `somosierra-mural` | Mural Painting — Casa de Diezmos, Somosierra | painting, archaeological-mural | 2007 | `assets/images/proj-somosierra-hero.jpg` |
| `catedral-zamora` | Mural Painting — Capilla del Cardenal, Catedral de Zamora | painting, archaeological-mural | 2009 | `assets/images/proj-zamora-hero.jpg` |
| `colecciones-privadas` | Private Collections — Esperanza Parada & José Nogué Massó | painting, private-collections | 2000–2018 | `assets/images/proj-particulares-hero.jpg` |
| `anjusil-metodologia` | Anjusil® — Patented Conservation Methodology | research-methodology | 2003–2006 | `assets/images/proj-anjusil-hero.jpg` |
| `premios-reconocimientos` | National Award 2004 & Europa Nostra 2006 | awards-grants | 2004–2006 | `assets/images/proj-premios-hero.jpg` |

---

## 22. Visual Direction

### Dirección deseada

La web debe sentirse como:

- museo contemporáneo premium;
- catálogo institucional de exposición;
- portfolio editorial de una profesional senior;
- archivo visual curado;
- diseño cultural serio y de alta gama.

Debe transmitir:

- autoridad;
- experiencia;
- precisión;
- patrimonio;
- criterio;
- sofisticación;
- silencio visual;
- elegancia;
- profundidad;
- confianza institucional.

Debe evitar:

- wireframe;
- prototipo funcional;
- template genérico;
- cards básicas;
- beige blando;
- estética cozy;
- diseño plano;
- falta de jerarquía;
- exceso de funcionalidad sin dirección de arte.

### Tipografía actual

La implementación actual carga:

- `Cormorant Garamond`.
- `DM Sans`.

Esto va en buena dirección. El pendiente está más en composición, uso de escala, jerarquía y detalles que en cambiar fuentes.

---

## 23. Current Design Problems

### Diagnóstico

La lógica del flujo está bien. El problema es que el acabado aún no alcanza el nivel esperado.

Problemas percibidos:

1. Las salas todavía pueden sentirse como fondo + texto + cards, no como una experiencia editorial curada.
2. Las project cards necesitan más dirección de arte.
3. La jerarquía entre contenido principal, proyectos y navegación puede ser más elegante.
4. Las secciones inferiores deben sentirse menos secundarias.
5. Recognition debe ganar autoridad visual.
6. Complete Archive debe parecer catálogo, no grid funcional.
7. Project Detail debe evolucionar a ficha premium de museo.
8. El CSS monolítico dificulta intervención fina.
9. El sistema visual todavía necesita una capa de refinamiento: espaciado, ritmo, microinteracciones, composición y detalles.

---

## 24. Pending Visual Redesign Tasks

Prioridad alta:

1. Rediseñar Hall como portada de catálogo / entrada de museo.
2. Hacer que Vaciados parezca la sala principal del portfolio, no una lista de proyectos.
3. Rediseñar Painting con coherencia pero una atmósfera algo más pictórica.
4. Mejorar cards de proyectos: imagen, meta, título, hover, proporción, ritmo.
5. Mejorar botones laterales de navegación.
6. Dar a Recognition presencia institucional.
7. Mejorar Research & Methodology para destacar Anjusil®.
8. Mejorar Complete Archive como catálogo curado.
9. Mejorar Project Detail como case study institucional.
10. Añadir/valorar botón `Skip transition` o fallback visible para accesibilidad.

Prioridad media:

1. Refactorizar JS inline de Archive hacia `archive.js`.
2. Refactorizar CSS o al menos documentar qué partes de `style.css` corresponden a cada página.
3. Añadir `.gitignore`.
4. Optimizar imágenes pesadas.
5. Revisar contraste y responsive móvil.

---

## 25. Accessibility Notes

### Lo positivo

- Uso de botones reales para navegación por salas.
- Videos muted + playsinline.
- Algunos `aria-label` presentes.
- `aria-live` en archive count.
- Reduced motion contemplado en `transitions.js`.

### Pendientes

- Añadir `Skip transition` en transiciones de vídeo.
- Revisar foco tras transición: actualmente no parece haber focus management explícito.
- Revisar `aria-current` en nav de index.
- Revisar si los links de sala en Archive/Detail deberían volver a `index.html?room=vaciados` / `index.html?room=pintura` en lugar de `index.html`.
- Revisar `lang`: `index.html` está como `es`, pero gran parte del contenido es inglés. Decidir idioma principal.
- Asegurar navegación móvil si la nav horizontal no cabe.

---

## 26. Responsive Notes

### Pendientes de test

Testear en:

- Desktop grande.
- MacBook.
- iPad/tablet.
- Mobile vertical.
- Mobile horizontal.

Puntos críticos:

- Nav fija superior.
- Room stage 100vh.
- Cards en Vaciados/Pintura.
- Botones laterales.
- Vídeo cover en móvil.
- Peso de imágenes grandes.
- Archive grid.
- Detail gallery.

---

## 27. GitHub Recovery / Clone Plan

### Objetivo

Clonar el proyecto actual sin perder el estado, crear una rama segura y trabajar sobre esa rama.

### Pasos

```bash
# 1. Ir a la carpeta de trabajo local
cd ~/ClaudeWorkspace

# 2. Clonar el repositorio
# Sustituir por la URL real del repo
git clone <REPO_URL>

# 3. Entrar al proyecto
cd angeles-solis-portfolio

# 4. Ver estado
git status

# 5. Crear rama de seguridad para rediseño visual
git checkout -b visual-redesign

# 6. Levantar servidor local
python3 -m http.server 8000

# 7. Abrir en navegador
# http://localhost:8000
```

### Comprobaciones tras clonar

```bash
ls
ls assets/css
ls assets/js
ls assets/data
ls assets/images | wc -l
ls assets/videos
```

Debe existir:

```txt
index.html
complete-archive.html
project-detail.html
assets/css/style.css
assets/js/transitions.js
assets/js/main.js
assets/js/micro.js
assets/data/projects.json
assets/images/*
assets/videos/hall-to-sculpture.mp4
assets/videos/sculpture-to-painting.mp4
```

### Antes de modificar

```bash
git status
git log --oneline --max-count=5
```

Después de cambios importantes:

```bash
git add .
git commit -m "Improve visual direction and room experience"
git push -u origin visual-redesign
```

---

## 28. Next Steps

### Siguiente paso recomendado

1. Clonar el repo desde GitHub.
2. Comprobar que coincide con este ZIP.
3. Crear rama `visual-redesign`.
4. Ejecutar local con `python3 -m http.server 8000`.
5. Revisar funcionamiento actual.
6. Pedir a Claude Code una iteración de diseño sin romper la lógica.

### No hacer todavía

- No rehacer desde cero.
- No eliminar el sistema de salas.
- No volver a parallax.
- No mezclar Complete Archive dentro de la home.
- No romper `projects.json`.
- No tocar assets pesados sin backup.

---

## 29. Prompts for Next Iteration

### 29.1 Prompt para clonar y revisar estructura

```txt
Tengo un proyecto en GitHub llamado angeles-solis-portfolio. Quiero clonarlo, revisar la estructura y confirmar que coincide con este MASTER_HANDOFF.

Primero:
1. Clona el repositorio.
2. Entra en la carpeta.
3. Ejecuta git status.
4. Lista la estructura principal.
5. Comprueba que existen index.html, complete-archive.html, project-detail.html, assets/css/style.css, assets/js/transitions.js, assets/js/main.js, assets/js/micro.js, assets/data/projects.json, assets/images y assets/videos.
6. No modifiques nada todavía.

Después dime:
- si el repo está completo,
- si falta algo,
- si hay diferencias con el MASTER_HANDOFF,
- cuál sería el siguiente paso seguro.
```

### 29.2 Prompt para mejorar visualmente sin romper lógica

```txt
Quiero mejorar de forma importante el diseño visual del proyecto sin romper la lógica actual.

La lógica actual está bien:
- Hall / Home.
- Vaciados.
- Pintura.
- Vídeos de transición normales e invertidos.
- Complete Archive aparte.
- Project Detail dinámico desde projects.json.

No quiero rehacer el proyecto desde cero.
No quiero volver a parallax.
No quiero eliminar secciones.
No quiero cambiar el flujo.

El problema actual es el acabado visual. Necesito más dirección de arte.

Objetivo visual:
- museo contemporáneo premium;
- catálogo institucional de exposición;
- portfolio editorial de profesional senior;
- más jerarquía;
- más diseño;
- más presencia;
- menos aspecto de wireframe/prototipo.

Trabaja sobre:
- index.html,
- complete-archive.html,
- project-detail.html,
- assets/css/style.css,
- JS solo si hace falta.

Prioridades:
1. Hall como portada potente de catálogo de museo.
2. Vaciados como sala principal y diferencial.
3. Pintura coherente pero más pictórica.
4. Cards más curatoriales y menos genéricas.
5. Recognition más institucional.
6. Research/Methodology más fuerte con Anjusil®.
7. Archive como catálogo curado.
8. Project Detail como ficha premium de museo.

No rompas:
- room-stage,
- stage-bg,
- stage-video,
- room-panel,
- data-to,
- data-video,
- data-reverse,
- projects.json,
- navegación hacia Archive y Detail.

Al terminar, explícame qué cambiaste y qué debo revisar primero.
```

### 29.3 Prompt para reconstruir o validar projects.json

```txt
Revisa assets/data/projects.json.

Necesito que valides:
- que el JSON es válido,
- que contiene 17 proyectos,
- que cada proyecto tiene id, title, category, type, institution, location, year, shortDescription, longDescription, heroImage, gallery y tags,
- que todas las heroImage existen en assets/images,
- que todas las gallery images existen,
- que los IDs usados en index.html y complete-archive.html existen en projects.json.

No inventes datos nuevos. Si falta algo, márcalo como MISSING / TO BE CONFIRMED.
```

### 29.4 Prompt para revisar assets faltantes y peso

```txt
Haz una auditoría de assets del proyecto.

Revisa:
- imágenes no usadas,
- imágenes demasiado pesadas,
- imágenes con dimensiones pequeñas,
- vídeos existentes,
- referencias rotas desde HTML/CSS/JS/JSON,
- posibles placeholders.

Genera una tabla con:
- archivo,
- dónde se usa,
- dimensiones,
- peso,
- estado,
- recomendación.

No borres nada sin confirmación.
```

### 29.5 Prompt para auditoría de diseño premium

```txt
Actúa como director de arte senior especializado en webs culturales, museos y portfolios institucionales.

Audita la web actual y dime qué impide que se vea premium.

Evalúa:
- Hall,
- Vaciados,
- Pintura,
- About,
- Recognition,
- Research,
- Archive CTA,
- Complete Archive,
- Project Detail,
- tipografía,
- jerarquía,
- ritmo,
- composición,
- cards,
- responsive.

Dame un diagnóstico duro y accionable.
No me digas que está bien si todavía parece prototipo.
```

### 29.6 Prompt para rama de rediseño en GitHub

```txt
Crea una rama nueva para trabajar el rediseño visual.

Pasos:
1. Comprueba git status.
2. Si hay cambios sin commitear, dime cuáles son y no hagas nada más.
3. Si está limpio, crea una rama llamada visual-redesign.
4. Confirma en qué rama estás.
5. No modifiques archivos todavía.
```

---

## 30. Open Questions / Unknowns

1. ¿Debe `index.html` usar `lang="en"` en vez de `lang="es"`? El contenido está mayoritariamente en inglés, pero hay términos en español como Vaciados/Pintura.
2. ¿Se mantiene “Vaciados” como término visible principal o se cambia a “Sculpture Room / Vaciados”?
3. ¿Debe la sala de Vaciados incluir Universidad de Sevilla o Museo del Prado como cuarto proyecto destacado?
4. ¿Debe Pintura incluir colecciones privadas como proyecto visible de sala?
5. ¿Se añaden datos reales de email/teléfono?
6. ¿Se dispone de retrato profesional real de Ángeles o se mantiene imagen de proceso?
7. ¿Conviene generar versiones WebM de los vídeos?
8. ¿Se va a optimizar el peso de imágenes antes de publicar en GitHub Pages?
9. ¿Se va a refactorizar `style.css` o mantenerlo monolítico para velocidad?
10. ¿Complete Archive debe mostrar los 17 proyectos en el orden actual o por categoría/curaduría?

---

## 31. Source-of-Truth Rules for Future Work

1. `projects.json` es la fuente de verdad de Archive y Project Detail.
2. No editar proyectos hardcodeados en Archive; se generan desde JSON.
3. Los proyectos destacados de salas sí están hardcodeados en `index.html`.
4. El sistema de transición depende de `data-to`, `data-video` y `data-reverse`.
5. No eliminar los dos vídeos existentes.
6. No crear vídeos inversos mientras el reverso actual funcione.
7. No reintroducir parallax como experiencia principal.
8. Mantener Complete Archive separado.
9. Mantener Project Detail como plantilla dinámica.
10. Antes de rediseñar, crear rama en Git.

---

## 32. Compact Context for a New Chat / Claude Code

```txt
Estamos trabajando en una web portfolio para Ángeles Solís Parra, conservadora-restauradora senior de patrimonio cultural. La web es una experiencia museística premium, no un CV ni una galería genérica.

Estructura actual:
- index.html: Hall → Vaciados → Pintura con vídeos de transición.
- complete-archive.html: archivo completo dinámico desde assets/data/projects.json.
- project-detail.html: plantilla dinámica por query param id.
- assets/js/transitions.js: reproduce vídeos normal/reverso y cambia paneles.
- assets/js/main.js: conecta botones y navegación.
- assets/js/micro.js: scroll reveal.
- assets/css/style.css: CSS principal real.
- assets/data/projects.json: 17 proyectos.

Vídeos:
- hall-to-sculpture.mp4: Hall → Vaciados y reverso Vaciados → Hall.
- sculpture-to-painting.mp4: Vaciados → Pintura y reverso Pintura → Vaciados.

Decisión clave:
- No parallax.
- Botón → vídeo → sala.
- Complete Archive separado.
- Project Detail dinámico.

Estado:
- La lógica funcional está bien.
- El principal pendiente es elevar el diseño visual: más museo contemporáneo premium, más catálogo institucional, menos prototipo.
```

---

## 33. Immediate Recommendation

El siguiente movimiento correcto es:

```txt
1. Clonar repo.
2. Crear rama visual-redesign.
3. Levantar servidor local.
4. Comprobar vídeos y navegación.
5. Hacer una iteración visual fuerte sin tocar la lógica.
```

No conviene reestructurar todo todavía. La base técnica es suficiente para iterar.

