# Modelo de dominio futuro

Este documento orienta el Nivel 2/3. No implica construir toda la persistencia durante el Nivel 1.

## Conceptos separados

### Marca (`Brand`)

Representa al fabricante o marca comercial: nombre, slug, logotipo autorizado y descripción opcional. La marca propia de Huelepectacular también puede ser una marca.

### Perfume (`Fragrance`)

Representa la fragancia en sí: nombre, marca, descripción, familia olfativa y notas opcionales. No equivale a una unidad vendible.

### Presentación vendible (`ProductVariant`)

Representa qué compra el cliente: botella completa de cierto volumen, decant de 5 ml, decant de 10 ml, etc. Puede tener SKU, precio, estado de publicación, imagen propia y una estrategia de stock.

Un perfume puede tener una o varias presentaciones. Cada presentación debe tener identidad estable.

### Categorías y colecciones

Permiten organizar el descubrimiento y la navegación. No confundir categorías de navegación (por ejemplo, ofertas o más vendidos) con atributos del perfume. Un producto puede aparecer en más de una categoría/colección si las reglas de negocio lo permiten.

### Imágenes

Una presentación puede tener varias imágenes ordenadas. Guardar referencias/URLs administradas, no incrustar archivos binarios de imagen en las tablas principales.

## Entidades futuras sugeridas

| Entidad | Responsabilidad |
| --- | --- |
| `Brand` | Marca del perfume o línea propia. |
| `Fragrance` | Identidad de la fragancia y atributos olfativos. |
| `ProductVariant` | Presentación vendible, SKU, precio y estado. |
| `Category` | Categorías y organización del catálogo. |
| `ProductCategory` | Relación de presentaciones/productos con categorías cuando sea de muchos a muchos. |
| `ProductImage` | Imagen, orden y texto alternativo. |
| `InventoryMovement` | Registro auditable de entradas, salidas y ajustes. |
| `Customer` | Datos mínimos de compradores, solo cuando se necesiten y con protección adecuada. |
| `Order` | Cabecera del pedido, estado, moneda, importes y datos de envío acordados. |
| `OrderItem` | Artículo, SKU, nombre, presentación, precio unitario y cantidad congelados al confirmar el pedido. |
| `Payment` | Referencia externa, estado y datos necesarios para reconciliación; nunca guardar datos de tarjeta. |

El esquema final debe revisarse antes de crear migraciones. Usa restricciones y claves foráneas donde correspondan.

## Reglas y precauciones

- Los segmentos “marca propia”, “diseñador”, “árabe”, “nicho” y “low/mid cost” no son tamaños de presentación. Representarlos con atributos o clasificación flexible según las necesidades reales.
- La presentación debe distinguir botella completa y decant; el volumen se expresa en mililitros cuando corresponda.
- No usar números de punto flotante binario para cálculos monetarios. En PostgreSQL, evaluar `numeric/decimal` y usar el tipo decimal apropiado en la aplicación; serializar importes de forma consistente en la API.
- Al confirmar un pedido, guardar una instantánea de nombre, SKU, presentación y precio unitario para conservar el histórico aunque después cambie el catálogo.
- Un total de pedido debe calcularse en el servidor a partir de datos válidos; nunca confiar en el total que mande el navegador.
- El stock no debe considerarse solo un campo editable si se necesita auditar entradas, ventas, cancelaciones y ajustes. La tabla de movimientos será relevante en Nivel 2/3.
- Las operaciones que crean pedidos y reservan/descuentan inventario deben ser consistentes y protegidas frente a compras simultáneas.

## Decisión aún pendiente: stock de decants

Hay al menos dos modelos posibles:

1. Cada tamaño de decant tiene stock independiente en unidades.
2. El stock de decants se deriva de los mililitros disponibles de una botella o lote de origen, considerando merma y reglas de preparación.

No asumir cuál usa el negocio. Confirmarlo con el responsable antes de implementar el inventario real. La elección puede requerir entidades de lote, insumo o composición.
