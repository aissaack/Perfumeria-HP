# Guía de UX/UI

## Dirección visual

La intención es transmitir una tienda de perfumería cuidada, sensorial y contemporánea, sin hacer que el catálogo resulte difícil de usar. Propuesta inicial: base neutra cálida, tipografía legible, texto oscuro y un acento ámbar/ámbar dorado discreto. Esta es una dirección de exploración, no una paleta oficial confirmada de la marca.

Antes de finalizar el diseño, revisa si hay logo, colores, tipografías y fotografías oficiales que el propietario autorice usar. No inventes que una propuesta de color es la identidad oficial.

## Principios

- **Primero móvil:** muchos usuarios pueden llegar desde redes sociales por teléfono.
- **Producto primero:** imágenes, nombre, presentación y precio deben tener jerarquía clara.
- **Descubrimiento simple:** búsqueda y categorías visibles sin desplegar una lista interminable de enlaces.
- **Elegancia sin sacrificio de usabilidad:** suficiente contraste, botones claros, texto legible y espacios consistentes.
- **Consistencia:** usa tokens de diseño para color, spacing, radios, tipografía y sombras.
- **Accesibilidad:** estructura semántica, foco visible, navegación por teclado, etiquetas accesibles, contraste suficiente y texto alternativo significativo.
- **Rendimiento:** imágenes con dimensiones adecuadas, formatos modernos cuando sea posible y sin dependencias visuales pesadas innecesarias.

## Estructura de experiencia sugerida

1. **Header:** marca, navegación prioritaria, búsqueda y acceso rápido a categorías. Evita llenar la barra con todas las categorías existentes.
2. **Hero:** propuesta breve y visual, con CTA claro hacia el catálogo. No usar afirmaciones promocionales no verificadas.
3. **Accesos por tipo:** por ejemplo, decants, perfumes árabes, diseñador, nicho y marca propia, sujetos al catálogo definitivo.
4. **Selecciones destacadas:** solo si están marcadas como selección de demo; no llamarlas “más vendidos” sin datos reales.
5. **Catálogo:** búsqueda, categorías y filtros implementados de verdad sobre el dataset actual.
6. **Tarjetas:** imagen, marca, nombre y presentación; precio legible. Diferenciar visualmente un decant de una botella completa.
7. **Detalle de producto:** información disponible, presentación y CTA de compra/contacto no engañoso.
8. **Footer:** enlaces informativos existentes o placeholders identificados; no inventar políticas legales o datos de contacto.

## Contenido y catálogo

- Usa precios, nombres y marcas ficticios o assets autorizados para el prototipo; evita afirmar que los artículos están disponibles actualmente.
- Si un producto tiene varios tamaños, muestra claramente a qué tamaño corresponde el precio.
- No usar imágenes genéricas que hagan creer que son la fotografía real de un producto concreto.
- No inventar reseñas, cantidades vendidas, descuentos o etiquetas como “stock limitado”.
- No distorsionar ni recortar de forma que se pierda la identificación de la botella. Mantener una zona de imagen coherente y `object-fit` apropiado.
- La búsqueda debe ignorar diferencias de mayúsculas/minúsculas y permitir encontrar por nombre, marca y categoría en el dataset de demo.
- Filtros no implementados deben omitirse; no mostrar controles decorativos que no funcionen.

## Estados requeridos

- Cargando, solo si existe una carga asíncrona.
- Resultados disponibles.
- Sin resultados de búsqueda.
- Error de carga recuperable, cuando exista una fuente que pueda fallar.
- Imagen faltante con placeholder útil.
- Producto inactivo/no disponible solo si ese estado forma parte de los datos de demo; no inventarlo para productos reales.

## Responsive y calidad visual

Verifica al menos un ancho móvil pequeño, un ancho móvil estándar, tablet y escritorio. Evita overflow horizontal, textos cortados, botones demasiado pequeños y saltos de layout por imágenes. Mantén tiempos de transición modestos y respeta `prefers-reduced-motion`.
