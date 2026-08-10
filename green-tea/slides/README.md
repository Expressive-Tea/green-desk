# 🍵 green-tea — fondos para video / redes

9 fondos = **3 variantes × 3 formatos**. Todos generados desde `bg.html` (SVG puro, hex exactos de la marca, cero deps). Editables.

## Variantes (qué usar dónde)

| Variante | Archivo | Para qué escena |
|---|---|---|
| **hero** | `bg-hero-*` | Escenas 0–1 (intro, llegada del logo). Halo central que "sostiene" el logo/título. |
| **divider** | `bg-divider-*` | Overlays `[TEXTO]` y transiciones entre escenas. Centro limpio para texto. |
| **closing** | `bg-closing-*` | Escena 9 (cierre): logo + *"That's the tea."* + link al repo. Nodo violeta como foco. |

## Formatos

| Sufijo | Tamaño | Uso |
|---|---|---|
| `16x9` | 1920×1080 | Video / slides horizontales (YouTube) |
| `1x1`  | 1080×1080 | Posts cuadrados (la parte social) |
| `9x16` | 1080×1920 | Shorts / Reels / TikTok |

## Marca (locked)

Base `#0D1117` · panel `#161B22` · matcha `#5FB88A` · violeta (acento del grafo) `#7C6CF0`.
Motivo = venación-hoja como grafo (nodos matcha + 1 nodo violeta firma). Zen: mucho espacio negativo, centro limpio.

## Regenerar / ajustar

Edita `bg.html` y corre:

```bash
# una combinación
npx playwright screenshot --viewport-size 1920,1080 "file://$PWD/bg.html?v=hero" bg-hero-16x9.png

# todas (desde esta carpeta)
for v in hero divider closing; do
  for f in "16x9:1920,1080" "1x1:1080,1080" "9x16:1080,1920"; do
    npx playwright screenshot --viewport-size "${f##*:}" "file://$PWD/bg.html?v=$v" "bg-$v-${f%%:*}.png"
  done
done
```

Params de `bg.html`: `?v=hero|divider|closing`. El texto/logo se compositea encima en el editor (los fondos vienen limpios a propósito).
