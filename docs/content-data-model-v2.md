# Arquitectura de Datos V2 — Ángeles Solís Portfolio

**Estado:** Propuesta técnica/documental. No implementada.
**Fecha:** 2026-08-31
**Depende de:** `AUDITORIA_CONTENIDO_2026-08-31.md` (client-source)
**No modifica:** `index.html`, `complete-archive.html`, `project-detail.html`, `assets/data/projects.json`, CSS, JS, `assets/`, ni el contenido fuente del cliente. Ningún commit, ningún push.

---

## 1. Por qué el modelo plano ya no basta

`projects.json` es hoy un array de 17 objetos planos: un proyecto = una entrada = una fecha (string libre) = una galería (lista plana de imágenes sin rol). Este modelo asumía implícitamente que:

- cada proyecto es una intervención única con una franja de fechas razonablemente continua;
- las imágenes de una galería son intercambiables, sin necesidad de saber si son "antes", "durante" o "detalle";
- no existe una unidad intermedia entre "proyecto" y "archivo de imágenes sueltas".

El material entregado por Ángeles (auditado el 2026-08-31) rompe las tres asunciones:

1. **Fechas reales discontinuas** — Universidad de Sevilla: 2009, 2010, 2014, 2015. Granada: 2003, 2005–2010, 2013–2014. Prado: 1996, 1998, 1999, 2000, 2001. Ninguna es un rango continuo.
2. **Imágenes con rol semántico real** — cada intervención trae secuencias `before_XX` / `during_XX` / `process_XX` / `after_XX` explícitas, muchas veces por obra individual, no por proyecto.
3. **Una unidad intermedia real: la obra (Work)** — dentro de "RABASF — Colección de vaciados antiguos" no hay una sola foto de "antes/después", hay seis obras nombradas (Ariadna, Crátera Estabia, Flora Farnese, Puerta del Paraíso, Venus del Pomo, Venus Médici), cada una con su propia secuencia de restauración.

De ahí la jerarquía objetivo:

```
CATEGORY
  └─ PROJECT
       └─ WORK / INTERVENTION   (opcional — no todos los proyectos la necesitan)
            └─ IMAGES: hero / before / during / process / after / detail
```

La unidad visible en Complete Archive sigue siendo **PROJECT**. `WORK` vive dentro de Project Detail, como contenido de profundización, no como tarjeta de archivo independiente.

---

## 2. Modelo conceptual

```
Category (concepto transversal, no un archivo propio)
  ├─ deriva de project.primaryCategory / project.categories[]
  └─ agrupa Projects para el filtro del Archive

Project (assets/data/projects.json — sigue siendo la fuente única de proyectos)
  ├─ metadatos institucionales (institution, location, dateDisplay, years[])
  ├─ narrativa (shortDescription, longDescription)
  ├─ imágenes de proyecto (heroImage, gallery[]) — para proyectos sin desglose por obra
  └─ works[] (0..n) — para proyectos con obras individuales documentadas

Work (vive anidado dentro de Project.works[], no es un archivo ni una colección propia)
  ├─ identidad (id, title, author, inventoryCode)
  ├─ metadatos propios si difieren del proyecto (dateDisplay, materials, intervention)
  └─ images { hero, before[], during[], process[], after[], detail[] }

Publication (assets/data/publications.json — nuevo, independiente de Project)
Recognition (assets/data/recognitions.json — nuevo, independiente de Project)
Profile     (assets/data/profile.json — nuevo, independiente de Project)
```

`Publication`, `Recognition` y `Profile` NO cuelgan de `Project` porque no son intervenciones de conservación: son evidencia de trayectoria (medios, premios, biografía). Meterlas dentro de `projects.json` obligaría a inventar un "proyecto" ficticio para cada una, contaminando el modelo de conservación con contenido editorial.

---

## 3. Esquema — PROJECT

`projects.json` sigue siendo un array de objetos. **Los campos existentes no se tocan.** Los campos nuevos son aditivos y opcionales durante la migración (ver §9).

### Campos actuales (sin cambios, confirmados leyendo el archivo real)

| Campo | Tipo | Ejemplo actual |
|---|---|---|
| `id` | string | `"vaciados-rabasf"` |
| `title` | string | `"Historical Plaster Cast Collection — RABASF"` |
| `category` | string[] | `["sculpture", "institutional-collections"]` |
| `type` | string | `"Conservation & Restoration"` |
| `institution` | string | `"Real Academia de Bellas Artes de San Fernando"` |
| `location` | string | `"Madrid, Spain"` |
| `year` | string (display libre) | `"2001–2006"` |
| `shortDescription` | string | — |
| `longDescription` | string | — |
| `isSelected` | boolean | featured en la sala |
| `heroImage` | string (ruta) | `"assets/images/proj-vaciados-rabasf-hero.jpg"` |
| `gallery` | string[] (rutas) | sin rol semántico |
| `tags` | string[] | — |
| `roomNumber` | string | `"01"` |

**Nota de compatibilidad de nombres — importante para tu decisión (ver §11):** lo que pides como `categories[]` y `dateDisplay` **ya existe hoy** bajo los nombres `category` (ya es array) y `year` (ya es texto libre, no un rango tipado). Añadir `categories[]`/`dateDisplay` como campos nuevos duplicaría exactamente lo mismo con otro nombre. Dos opciones:

- **A (recomendada, cero riesgo):** no crear `categories[]` ni `dateDisplay` nuevos. Tratar `category` como el campo "categories[]" y `year` como el campo "dateDisplay" que ya pedías, y añadir solo lo que es genuinamente nuevo: `primaryCategory` y `years[]`.
- **B:** renombrar `category`→`categories` y `year`→`dateDisplay` literalmente. Esto es un cambio de nombre de campo que rompe `complete-archive.html` y `project-detail.html` (leen `p.category` y `p.year` directamente, ver §9) hasta que se actualice ese JS. No es destructivo si se hace en una fase dedicada, pero no es gratis.

Este documento asume la opción A por defecto y lo señala explícitamente como decisión pendiente en §11.

### Campos nuevos propuestos

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `primaryCategory` | string | No (se puede derivar) | Categoría dominante para la tarjeta de Archive. Hoy `complete-archive.html` ya calcula esto en runtime con una función `primaryCategory(cats)` y un orden de prioridad fijo (línea ~104). Persistirlo como campo explícito hace la regla auditable y editable a mano sin tocar código. |
| `years[]` | array de `number \| {start:number, end:number}` | No | Representación estructurada y **no continua** de las fechas reales. Ver §5. |
| `works[]` | array de `Work` (ver §4) | No | Vacío o ausente en proyectos sin desglose por obra. |
| `sources[]` | string[] | No | Trazabilidad interna: identificador neutro del origen de cada dato (p. ej. `"client-project-sheet"`). **Nunca se renderiza en la web pública.** Sirve para auditoría futura y para no perder la cadena de justificación de cada fecha/dato corregido. |
| `schemaVersion` | number | No | `2` en los proyectos migrados, ausente/`1` implícito en los no migrados. Permite que el JS de transición sepa si puede confiar en `years[]`/`works[]` o debe caer al comportamiento actual. |

---

## 4. Esquema — WORK / INTERVENTION

Vive únicamente dentro de `Project.works[]`. No es un archivo independiente ni tiene rutas propias en el sitio (no hay `work-detail.html`); se muestra como una subsección dentro de la ficha del proyecto en `project-detail.html`.

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| `id` | string | Sí | Único **dentro del proyecto** (no global). Convención aprobada (§15): `"<project-id>--<slug-obra>"`, p. ej. `"vaciados-rabasf--ariadna"`, para poder usarlo como ancla (`#ariadna`) y como `id` de imagen sin colisiones. |
| `title` | string | Sí | Nombre de la obra tal como aparece en la fuente. |
| `author` | string | No | Solo si el material lo indica (p. ej. obras de Premios y Envíos de Roma vienen con autor; los vaciados de RABASF, no). |
| `inventoryCode` | string | No | Código de inventario si existe (`"V-011"`, `"E-213"`, etc.). |
| `dateDisplay` | string | No | Solo si la obra tiene fecha propia distinta de la del proyecto. |
| `materials` | string | No | Tal como aparece en la ficha `_info.docx`, sin normalizar terminología. |
| `intervention` | string | No | Descripción del reto/intervención específico de esa obra, si el material lo separa del texto general del proyecto. |
| `images` | object | Sí (puede tener arrays vacíos) | Ver estructura abajo. |
| `notes` | string | No | Cualquier apunte que no encaje en los campos anteriores. |

```json
"images": {
  "hero": "path/o/null",
  "before": [],
  "during": [],
  "process": [],
  "after": [],
  "detail": []
}
```

Ningún campo de `images` es obligatorio a nivel de contenido — un `Work` puede tener solo `before`/`after` y nada más, o solo `detail`. La estructura fija (siempre las 6 claves presentes, arrays vacíos si no hay imagen) existe para que el código de renderizado no tenga que comprobar existencia de la clave, solo longitud del array.

---

## 5. Tratamiento de fechas discontinuas

Regla dura: **`years[]` nunca colapsa fechas discontinuas en un rango falso.** Un proyecto con actividad en 2003, luego 2005–2010, luego 2013–2014 no se convierte en `"2003–2014"` en ningún campo estructurado (solo `year`/`dateDisplay`, que es texto libre para humanos, puede escribirse así si así lo redacta el cliente).

`years[]` acepta dos tipos de entrada, mezclables en el mismo array:

- un `number` suelto → un año puntual de actividad;
- un objeto `{ "start": number, "end": number }` → un tramo **genuinamente continuo** documentado como tal en la fuente.

### Ejemplos reales (de la auditoría, sin inventar continuidad)

```json
// Universidad de Sevilla — 2009, 2010, 2014, 2015 (CV + sevilla_info.docx)
"years": [2009, 2010, 2014, 2015]

// Granada — 2003, 2005–2010, 2013–2014 (granada_info.docx + CV)
"years": [2003, { "start": 2005, "end": 2010 }, { "start": 2013, "end": 2014 }]

// Prado — 1996, 1998, 1999, 2000, 2001 (prado_info.docx + CV)
"years": [1996, 1998, 1999, 2000, 2001]
```

`dateDisplay` (hoy: campo `year`) sigue siendo el string libre pensado para lectura humana — puede decir `"2003, 2005–2010, 2013–2014"` textualmente. `years[]` es el que un futuro selector/orden cronológico del Archive puede recorrer con seguridad (`Math.min(...)`, `Math.max(...)`, comprobar solapamiento, etc.) sin tener que parsear texto libre.

Alternativa descartada: expandir cada rango a años individuales (`2005,2006,2007,2008,2009,2010`) — se descarta porque pierde la información de "esto fue una campaña continua de 6 años" frente a "seis años sueltos", que sí importa para contar la trayectoria.

---

## 6. `publications.json` (nuevo, independiente)

No cuelga de `projects.json`. Vive en `assets/data/publications.json`, mismo patrón que `projects.json` (array plano, sin categorías anidadas — 11 entradas no necesitan jerarquía).

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| `id` | string | Sí | Slug estable. |
| `title` | string | Sí | Tal como consta en el CV o en la portada. |
| `authors` | string[] | No | Solo si la fuente lo indica explícitamente; no asumir autoría única por defecto. |
| `year` | number | No | `null` si no es legible/confirmado. |
| `media` | string | Sí | Revista/boletín/editorial/congreso, tal como aparece. |
| `issue` | string | No | `"Nº 100-101"`, `"# 03"`, etc. — literal. |
| `pages` | string | No | Solo si consta. |
| `publisher` | string | No | Solo si consta (p. ej. De Gruyter, CICUS/Editorial Universidad de Sevilla). |
| `coverImage` | string | No | Referencia al archivo fuente (aún sin importar a `assets/`, ver §10). |
| `externalLink` | string | No | Ninguna publicación auditada trae enlace — dejar `null` hasta que exista uno real. |
| `verifiedSource` | enum | Sí | `"confirmed-by-cover"` \| `"cv-only"` \| `"unconfirmed"` |

`verifiedSource` existe precisamente porque la auditoría dejó estados distintos de certeza y no hay que perderlos al modelar:

```json
[
  {
    "id": "boletin-rabasf-100-101",
    "title": "Boletín de la Real Academia de Bellas Artes de San Fernando",
    "authors": null,
    "year": 2005,
    "media": "ACADEMIA — Boletín Real Academia de Bellas Artes de San Fernando",
    "issue": "Nº 100-101",
    "pages": null,
    "publisher": null,
    "coverImage": "Boletin 100-101.jpg",
    "externalLink": null,
    "verifiedSource": "confirmed-by-cover"
  },
  {
    "id": "gipsoteca-universidad-sevilla",
    "title": "Gipsoteca de la Universidad de Sevilla",
    "authors": ["Judit Gasca Miramón", "Ángeles Solís Parra", "Silvia Viana Sánchez"],
    "year": 2015,
    "media": "Catálogo, 1ª edición",
    "issue": null,
    "pages": null,
    "publisher": "CICUS / Editorial Universidad de Sevilla",
    "coverImage": "GIPSOTECA DE LA UNIVERSIDAD DE SEVILLA.jpg",
    "externalLink": null,
    "verifiedSource": "confirmed-by-cover"
  },
  {
    "id": "ars-magazine-08",
    "title": null,
    "authors": null,
    "year": null,
    "media": "Ars Magazine",
    "issue": "Nº 8",
    "pages": null,
    "publisher": null,
    "coverImage": "ARS MAGAZINE 8.jpeg",
    "externalLink": null,
    "verifiedSource": "unconfirmed"
  }
]
```

Nótese que `ars-magazine-08` tiene casi todo en `null`: es intencional, refleja exactamente lo que la auditoría pudo confirmar (existe el archivo, no se pudo confirmar que sea de Ángeles). No se completa con criterio propio.

---

## 7. `recognitions.json` (nuevo, independiente)

`assets/data/recognitions.json`. Reemplazaría, cuando se implemente, al bloque hoy hardcodeado en `#recognition` de `index.html` — pero eso es un paso posterior (§9), no parte de esta especificación.

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| `id` | string | Sí | — |
| `title` | string | Sí | — |
| `type` | enum | Sí | `"award"` \| `"scholarship"` \| `"other"` |
| `institution` | string | Sí | — |
| `recipients` | string[] | Sí | **Siempre array**, aunque tenga un único nombre — así el caso de equipo (Premio Nacional) no es una excepción de esquema, es el caso general. |
| `year` | number \| null | Condicional | `null` cuando no hay certeza (ver Europa Nostra abajo). |
| `yearCandidates` | number[] | No | Solo cuando `year` es `null` por conflicto de fuentes — lista las fechas en disputa, cada una trazable vía `sources`. |
| `dateDisplay` | string | Sí | Texto para mostrar; puede reflejar la incertidumbre explícitamente. |
| `confirmed` | boolean | Sí | `false` mientras `year` sea `null`. |
| `description` | string | No | — |
| `evidenceImage` | string | No | Referencia al documento escaneado. |
| `sources` | string[] | No | Igual que en Project — trazabilidad interna. |

### Europa Nostra — sin resolver, tal como pediste

```json
{
  "id": "europa-nostra-award",
  "title": "European Union Prize for Cultural Heritage / Europa Nostra Award",
  "type": "award",
  "institution": "Europa Nostra / European Commission",
  "recipients": ["Real Academia de Bellas Artes de San Fernando — 17th and 18th Century Plaster Casts"],
  "year": null,
  "yearCandidates": [2005, 2006],
  "dateDisplay": "2005 o 2006 — pendiente de confirmar con Ángeles",
  "confirmed": false,
  "description": null,
  "evidenceImage": "diploma-scan.jpg",
  "sources": [
    "client-source (diploma escaneado, dice 2005)",
    "client-cv (dice 2006)"
  ]
}
```

`recipients` aquí queda como el nombre de la institución/colección premiada porque el diploma auditado no lista un nombre individual (a diferencia del Premio Nacional) — esto también es una `DECISIÓN PENDIENTE` (§11.7): confirmar si Europa Nostra reconoce a Ángeles nominalmente o a la colección/institución.

### Premio Nacional — recipients múltiples, tal como pediste

```json
{
  "id": "premio-nacional-2004",
  "title": "Premio Nacional de Restauración y Conservación de Bienes Culturales",
  "type": "award",
  "institution": "Ministerio de Cultura, España",
  "recipients": ["equipo de tres profesionales, incluida Ángeles Solís Parra"],
  "year": 2004,
  "yearCandidates": null,
  "dateDisplay": "2004 (diploma firmado el 28 de marzo de 2005)",
  "confirmed": true,
  "description": null,
  "evidenceImage": "diploma-scan-2.jpg",
  "sources": ["client-source (diploma escaneado)"]
}
```

---

## 8. `profile.json` (nuevo) — perfil / CV

`assets/data/profile.json`. Objeto único (no array).

| Campo | Tipo | Notas |
|---|---|---|
| `name` | string | — |
| `specialty` | string | Equivalente al "role" actual del Hall. |
| `email` | string | Ya público en la web actual. |
| `phone` | `{ value: string, public: boolean }` | **`public` debe ser `false` por defecto.** El código de renderizado debe comprobar explícitamente `profile.phone.public === true` antes de mostrarlo — nunca mostrarlo por la mera presencia del campo. |
| `biography` | string | Texto largo tipo About. |
| `education` | array de objetos libres | Placeholder — el CV completo (client-cv) no se ha transcrito campo a campo en la auditoría; esta especificación define la forma, no el contenido. Transcribir es trabajo aparte, no incluido aquí para no inventar estructura sobre datos no revisados con ese nivel de detalle. |
| `teaching` | array de objetos libres | Idem. |
| `conferences` | array de objetos libres | Idem. |
| `professionalExperience` | array de objetos libres | Idem — nota: esto **no sustituye** a `projects.json`; es la cronología profesional en prosa/lista del CV, que puede solapar con proyectos pero no es la misma entidad. |

```json
{
  "name": "Ángeles Solís Parra",
  "specialty": "Senior Conservator-Restorer of Cultural Heritage",
  "email": "angsolis@gmail.com",
  "phone": { "value": "[número personal — no publicado]", "public": false },
  "biography": null,
  "education": [],
  "teaching": [],
  "conferences": [],
  "professionalExperience": []
}
```

Los cuatro arrays quedan vacíos deliberadamente en esta propuesta: poblarlos exige una pasada de transcripción dedicada del CV completo, fuera del alcance de "definir el esquema".

---

## 9. Relación Category → Project → Work y consumo en Complete Archive

`Category` no es un archivo: es un valor (`primaryCategory` / `category[]`) dentro de cada `Project`. El Archive sigue funcionando exactamente como hoy para el nivel Project:

- Los chips de filtro (`All / Sculpture / Painting / Archaeological & Mural / Institutional / Private / Research / Awards`) siguen operando sobre `category[]` de cada proyecto — sin cambios de comportamiento.
- Cada tarjeta del grid sigue siendo un `Project`, nunca un `Work` — las obras no generan tarjetas propias en el Archive.
- `works[]` es invisible en Complete Archive; solo se consume dentro de `project-detail.html`.

`ESTRUCTURA DEL ARCHIVO.docx` propone además una agrupación **por institución** (RABASF → Vaciados / Premios y Envíos / Escultura; Universidad de Sevilla; Prado; etc.) que es complementaria, no sustitutiva, del filtro por categoría transversal actual. Se podría representar sin tocar el esquema de `Project`, añadiendo un modo de vista alternativo en el Archive que agrupe las tarjetas existentes por `institution` en vez de por `category` — es un cambio de presentación en `complete-archive.html`, no de datos. No se implementa aquí; se deja anotado como posibilidad para cuando se aborde el Archive (fuera de alcance de este documento).

Publicaciones, Reconocimientos e Investigación/Metodología y CV, si en el futuro se quieren navegar desde el Complete Archive, se leerían como fuentes adicionales (`publications.json`, `recognitions.json`, ficha narrativa de investigación, `profile.json`) en secciones propias del Archive, no mezcladas como "categorías" de `Project` — hoy `awards-grants` y `research-methodology` ya existen como categorías de `Project` porque hay proyectos (`premios-reconocimientos`, `anjusil-metodologia`) que las representan narrativamente; eso puede convivir con las nuevas fuentes independientes sin conflicto, simplemente son dos formas de llegar a contenido relacionado.

---

## 10. Impacto en Project Detail

`project-detail.html` sigue navegando por `?id=<project-id>` exactamente igual. El modelo V2 permite, sin romper esa lógica, añadir (cuando se implemente, no ahora):

- Bloque de metadatos ampliado: `institution`, `location`, `dateDisplay` (=`year` hoy), y opcionalmente el desglose de `years[]` si se decide mostrar la discontinuidad explícitamente en vez de solo el texto libre.
- Sección "Obras" (`works[]`), renderizada solo si el array existe y tiene longitud > 0 — los 14 proyectos sin `works[]` no cambian de aspecto.
- Cada `Work` reutiliza el mismo componente de galería/lightbox que ya existe para `gallery[]` a nivel de proyecto, aplicado a `images.before/during/process/after/detail` — no hace falta un componente nuevo, solo alimentarlo con más de una fuente de imágenes.
- `gallery[]` de proyecto se conserva para los proyectos que no tienen desglose por obra (p. ej. Málaga, Granada, los 4 sitios de Retablos si no se separan en works).

Nada de esto requiere cambiar la URL, el query param, ni la función de búsqueda por `id` actual.

---

## 11. Compatibilidad y estrategia de migración

### Principio

`projects.json` sigue siendo hoy la única fuente que leen `complete-archive.html` y `project-detail.html`. La migración es **aditiva por fases**, cada fase revertible sin dejar el sitio roto a medio camino.

### Fase 0 — Congelar contradicciones (no toca código ni datos)
Cerrar con Ángeles las decisiones de §12 antes de escribir ni un dato nuevo en `projects.json`. Ninguna fase posterior debería empezar sin esto, porque escribir años/fechas ahora y corregirlos después duplica trabajo y riesgo de error.

### Fase 1 — Esquema aditivo, cero riesgo
Añadir a los proyectos existentes en `projects.json` únicamente los campos nuevos que no colisionan con nada: `primaryCategory`, `years[]`, `sources[]`, `schemaVersion: 2`. El HTML/JS actual ignora campos que no lee — cero cambio de comportamiento visible. `works[]` se añade vacío (`[]`) o ausente donde aún no se ha decidido su contenido.

### Fase 2 — Poblar `works[]` para los proyectos con obras documentadas
Empezar por `vaciados-rabasf` (6 obras ya identificadas con nombre e inventario) sin necesidad de tocar JS todavía — los datos pueden vivir en el JSON antes de que nada los renderice.

### Fase 3 — Actualizar JS de lectura (`project-detail.html`)
Añadir el bloque que renderiza `works[]` si existe. Es una adición de template, no una reescritura — el resto de la página sigue leyendo `p.category`, `p.year`, `p.gallery`, `p.tags` exactamente igual que hoy.

### Fase 4 — Nuevos archivos independientes
Crear `assets/data/publications.json`, `assets/data/recognitions.json`, `assets/data/profile.json` con los datos verificados en la auditoría. No requieren ningún cambio en `projects.json` ni en el código existente hasta que se decida consumirlos desde alguna página (Publications, Recognition).

### Fase 5 (opcional, posterior) — Resolución de nombres duplicados
Si se decide la opción B de §3 (renombrar `category`→`categories`, `year`→`dateDisplay`), hacerlo en una fase propia, actualizando en el mismo commit los tres puntos de lectura conocidos: `complete-archive.html:113,118`, `complete-archive.html:127`, `project-detail.html:143,150`. Hasta entonces, opción A (mantener nombres actuales) es la vía de menor riesgo.

### Reversibilidad
Cada fase es un commit independiente sobre una rama de trabajo; ninguna fase borra un campo existente. Si una fase introduce un problema, revertir ese commit deja el sitio exactamente como estaba, porque ninguna fase anterior depende de que la siguiente exista.

---

## 12. Decisiones pendientes

> **Superseded por §15.** Esta lista es el estado en el momento de escribir el modelo (2026-08-31). El 2026-09-01 se revisó, clasificó y en gran parte se resolvió — ver §15 para el estado definitivo. Se conserva aquí sin editar como registro histórico de cómo se llegó a esas conclusiones.

**Heredadas de la auditoría de contenido (sin resolver, no se decide aquí):**

1. Europa Nostra: ¿2005 (diploma) o 2006 (CV/web actual)?
2. ¿Se corrigen en `projects.json` las fechas de los 12 proyectos donde el material nuevo difiere de lo publicado?
3. Retablos: ¿un proyecto agregado o 4 proyectos independientes (Berzosa de Bureba, Grandas de Salime, Medina de Rioseco, San Juan de la Rambla)?
4. RABASF "3 ESCULTURA" (Alegoría de las Artes de Felipe Inza, Cristo Crucificado de Pompeo Leoni, Busto Masculino de Juan Pascual de Mena, Cristo Crucificado de Julio López): ¿proyecto nuevo, fusión con otro, o fuera por ahora?
5. Anjusil: ¿qué parte de la ficha técnica (que incluye precio y contacto comercial) se traduce a contenido público?
6. Teléfono personal: ¿se añade a Contact (`profile.phone.public`) o se mantiene `false`?
7. Premio Nacional: ¿se menciona la autoría compartida con el resto del equipo galardonado en el texto público?
8. Ars Magazine 8: confirmar si es una publicación de Ángeles antes de incluirla como `confirmed-by-cover`.
9. Publicaciones: ¿se publican las 11 del CV o solo las 8 verificadas visualmente contra portada?
10. `colecciones-privadas`: ¿se separan Esperanza Parada (2017–2020) y José Nogué (2015–2026, abierto) en dos proyectos, o se mantienen combinados con un rango que ahora mismo no cubre hasta 2026?
11. Epígrafe "INSTITUCIONES" suelto en `ESTRUCTURA DEL ARCHIVO.docx`: ¿qué contenido iba debajo?

**Nuevas, propias de este modelo de datos:**

12. Naming: ¿opción A (reusar `category`/`year` tal cual) u opción B (renombrar a `categories`/`dateDisplay` con el coste de tocar el JS de lectura)? Este documento asume A por defecto.
13. `Europa Nostra.recipients`: ¿institución/colección, o el nombre de Ángeles individualmente? El diploma auditado no lo deja claro por sí solo.
14. Convención de `id` de `Work` (`"<project-id>__<slug>"` propuesta aquí) — ¿aceptable, o se prefiere otro esquema si en el futuro una obra necesita URL propia?
15. ¿Se transcribe el CV completo a `profile.json` (education/teaching/conferences/professionalExperience) en una fase dedicada, o se deja fuera del alcance del sitio por ahora?

---

## 13. Riesgos

- **Deriva de esquema sin validación.** No se propone aquí ningún validador (JSON Schema, Zod, etc.) — mientras no exista, un campo mal escrito en `works[]` o `years[]` fallará en silencio en el render, no en tiempo de guardado. Si el volumen de datos crece (más de 17 proyectos, más obras), conviene añadir una validación mínima antes de la Fase 2.
- **Peso de assets aún no importados.** Varias portadas de publicaciones superan 13–20 MB y hay 2 archivos `.tif` — si se importan tal cual a `assets/`, degradan el rendimiento del Archive. La conversión/optimización debe ocurrir antes de escribir rutas reales en `coverImage`/`images.*`, no después.
- **Coste de sincronización manual category/categories y year/dateDisplay** si en algún momento se opta por mantener ambos nombres en paralelo en vez de decidir A o B de forma definitiva — es la peor combinación (duplicación sin resolución), debe evitarse quedándose indefinidamente en un estado intermedio.
- **Ambigüedad de `Europa Nostra.recipients`** puede filtrarse a la web si no se resuelve antes de la Fase 4 — el campo tal como está en el ejemplo (§7) es una suposición razonable, no un hecho confirmado.
- **Sobre-alcance del CV.** `profile.json` puede convertirse en un proyecto en sí mismo (transcripción completa de un CV extenso) si no se acota como fase separada — este documento lo deja explícitamente fuera para no ampliar el scope de "definir el modelo de datos" a "publicar el CV completo".
- **Confusión de unidad en el Archive.** Si en el futuro `works[]` se renderizara como tarjetas propias en Complete Archive (no lo pide esta especificación, pero es un error fácil de cometer al implementar), se perdería la jerarquía Category→Project→Work que es precisamente el objetivo de este rediseño.

---

## 14. Resumen de lo que este documento NO hace

- No modifica `projects.json`, HTML, CSS ni JS.
- No copia ningún asset del cliente a `assets/`.
- No resuelve ninguna de las contradicciones de la auditoría (Europa Nostra, fechas, Retablos, etc.).
- No transcribe el CV.
- No implementa Complete Archive ni Project Detail con el nuevo modelo — solo explica cómo podrían consumirlo.

---

## 15. Apéndice — Clasificación definitiva de decisiones pendientes (2026-09-01)

Revisión de las 15 decisiones de §12, clasificadas en A (requieren a Ángeles) / B (producto/UX/contenido, decidible por el equipo) / C (puramente técnicas), con ajustes aprobados el 2026-09-01. Esta clasificación sustituye a §12 como estado vigente.

### A. Decisiones que sí requieren a Ángeles (3, no 15)

**A1 — Europa Nostra: ¿2005 o 2006?**
- Problema: el diploma escaneado dice 2005; el CV entregado en el mismo paquete dice 2006 — contradicción dentro de su propio material, no resoluble por jerarquía de fuentes.
- Opciones: (a) 2005 (diploma); (b) 2006 (CV/web actual/MASTER_HANDOFF).
- Recomendación: preguntar directamente mostrando la foto del diploma como evidencia.
- Impacto: un premio institucional mal fechado es un error de credibilidad visible para el público objetivo (museos, instituciones).
- Bloquea: sí — cierre de Recognition. No bloquea el resto.

**A2 — Confirmación global de fechas de proyectos frente a `projects.json` (12 proyectos)**
- Problema: fichas nuevas/CV dan años distintos a los publicados, en varios casos con décadas de diferencia (Zamora: 19 años; Málaga: 10; San Andrés: 11).
- Opciones: (a) confiar en el material nuevo sin más confirmación; (b) confirmar con Ángeles antes de sobrescribir.
- Recomendación: (b), en un único envío consolidado (una tabla, no 12 preguntas sueltas) con columnas "web actual" / "documentación enviada", para que pueda confirmar en un solo paso o marcar excepciones.
- Impacto: corregir mal el CV público de una profesional senior es peor que tardar en confirmarlo.
- Bloquea: sí, la Fase 2 de la migración (poblar `years[]`/`year` con datos reales). No bloquea la Fase 1 (esquema aditivo).

**A3 — Anjusil®: ¿metodología profesional únicamente, o también información comercial del producto?**
- Problema: el material es una ficha técnica comercial (composición, toxicidad, envasado, datos de precio y contacto de venta), no una narrativa de investigación.
- Opciones: (a) solo narrativa/metodología (lo que hay hoy); (b) datos técnicos generales sin precio ni contacto comercial; (c) ficha completa con precio/venta.
- Recomendación: (b) como propuesta del equipo, pero la decisión de fondo (¿quiere posicionar Anjusil® como producto en venta o mantenerlo como metodología propia sin componente comercial visible?) es de negocio suya, no del equipo de diseño.
- Impacto: publicar precio/contacto cambia el tono de "autoridad técnica" a "página de venta" si no se decide con ella.
- Bloquea: no bloquea el resto — solo el contenido ampliado de `#research`.

**Cómo trasladarlas:** 3 envíos, no 15 — (1) tabla única de fechas cubriendo A1+A2, (2) una pregunta sobre Anjusil (A3). Ninguna otra decisión de este apéndice necesita su intervención para avanzar con la Fase 1 del modelo de datos.

### B. Decisiones de producto / UX / contenido (resueltas por el equipo)

**B1 — Teléfono personal en Contact — RESUELTA.** Movida desde A4. Decisión: no publicar el teléfono por defecto (`profile.phone.public: false`, ya es el default del esquema en §8). Se añadirá únicamente si Ángeles lo solicita explícitamente más adelante — no hace falta preguntárselo ahora. No bloquea nada.

**B2 — Premio Nacional: autoría compartida — RESUELTA a nivel factual.** Movida desde A5. El diploma acredita a un equipo de tres personas, incluida Ángeles Solís Parra; no es una decisión editorial abierta, es un hecho que la web debe representar correctamente. Decisión: se conserva el Premio Nacional como reconocimiento importante del portfolio de Ángeles; se redacta de forma que quede claro que formaba parte del equipo galardonado; no se le atribuye el premio en exclusiva. La redacción exacta (cómo se equilibra "equipo" con la narrativa centrada en Ángeles del resto del portfolio) se define al integrar Recognition, no aquí. No bloquea el resto — solo el copy final de esa entrada.

**B3 — Retablos: 1 proyecto o 4 — APROBADO: 4 proyectos independientes.** Cada sitio (Berzosa de Bureba, Grandas de Salime, Medina de Rioseco, San Juan de la Rambla) tiene ficha, fecha, institución/empresa e imágenes propias — el material soporta la separación sin necesidad de redactar nada nuevo. `retablos-polychrome` se da de baja en favor de 4 entradas nuevas en la Fase 2. No bloquea.

**B4 — RABASF "3 Escultura" — APROBADO: fuera por ahora.** Sin `_info.docx` propio ni fecha/contexto documentado; publicarlo obligaría al equipo a redactar descripción, lo cual sería inventar contenido. Se retoma en cuanto exista aunque sea una frase de contexto de la propia Ángeles. No bloquea — el material y las imágenes siguen disponibles cuando se decida.

**B5 — Ars Magazine 8 — APROBADO: excluir hasta confirmación.** No figura en el CV; se excluye de `publications.json` por defecto (no se marca como `unconfirmed` para publicarla igualmente). Si en el futuro Ángeles la menciona espontáneamente, se añade entonces. No bloquea, no requiere pregunta activa.

**B6 — Publicaciones: 11 del CV o 8 verificadas — APROBADO: las 11 documentadas en el CV, indicando internamente el nivel de verificación.** Se usa el campo `verifiedSource` ya definido en §6 (`confirmed-by-cover` / `cv-only` / `unconfirmed`) para no perder la distinción de certeza sin excluir publicaciones reales solo por falta de portada abierta. No bloquea.

**B7 — Colecciones privadas — APROBADO: separar Esperanza Parada y José Nogué Massó en dos proyectos.** Esperanza Parada tiene 9 obras nombradas con secuencias propias — material suficiente para proyecto propio con `works[]`; José Nogué tiene fechas y relación de encargo diferenciadas (2015–2026, en curso) que un rango combinado no representa bien. `colecciones-privadas` se divide en la Fase 2. No bloquea.

**B8 — Epígrafe "INSTITUCIONES" suelto — APROBADO: ignorar mientras no tenga contenido.** No forma parte de ninguna taxonomía funcional sin contenido debajo; no vale la pena gastar uno de los 3 envíos a Ángeles en aclararlo. No bloquea.

**B9 — CV completo a `profile.json` — APROBADO: estructurarlo en una fase posterior.** Decisión de alcance, no de contenido factual — no afecta a nada de lo ya aprobado (Hall/Escultura/Pintura/About/Recognition). Se retoma cuando se planifique la ampliación de Research & Methodology / About. No bloquea.

### C. Decisiones puramente técnicas (resueltas por el equipo, sin impacto de negocio)

**C1 — Europa Nostra `recipients` — APROBADO: representar lo que figure literalmente en el diploma.** El diploma nombra el proyecto/colección ("17th and 18th Century Plaster Casts", RABASF), no a una persona — a diferencia del Premio Nacional. `recipients: ["Real Academia de Bellas Artes de San Fernando — 17th and 18th Century Plaster Casts collection"]` tal como consta en la fuente (ver ejemplo en §7). Se resuelve leyendo el documento, no preguntando. No bloquea.

**C2 — Convención de `id` de `Work` — APROBADO: `"<project-id>--<slug-obra>"`.** Doble guion en vez del doble guion bajo propuesto originalmente en §4 (ya actualizado ahí). Ejemplo: `"vaciados-rabasf--ariadna"`. Decisión interna de implementación, sin impacto visible para el usuario. No bloquea.

**C3 — Naming `category`/`categories`, `year`/`dateDisplay` — RESUELTA (2026-09-01, esta misma sesión).** Opción A aprobada: se mantienen los nombres de campo actuales (`category`, `year`) siempre que sea posible; no se crean `categories[]` ni `dateDisplay` como campos nuevos duplicados. Cierra §12.12 y la Fase 5 opcional de §11 queda descartada salvo que se reabra explícitamente en el futuro.

### Resumen

De las 15 decisiones originales de §12: **3 requieren a Ángeles** (A1–A3, reducibles a 3 envíos concretos), **9 quedan resueltas por criterio de producto/contenido del equipo** (B1–B9), y **3 son técnicas y ya están fijadas** (C1–C3). Ninguna de las 12 decisiones B/C bloquea el arranque de la Fase 1 de la migración (§11) — solo A2 bloquea la Fase 2, y A1/A3 bloquean únicamente el contenido final de Recognition y Research respectivamente.
