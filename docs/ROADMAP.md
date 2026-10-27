# Roadmap por niveles

## Nivel 0 — Descubrimiento y preparación

**Estado:** documentación y planificación.

- Acordar alcance y dirección visual.
- Revisar el repositorio y definir estructura inicial mínima.
- Confirmar qué assets de marca pueden reutilizarse.
- Investigar si la tienda Pedix tiene un endpoint de producción disponible para lectura.

**Salida:** plan de implementación acotado y decisiones registradas.

## Nivel 1 — Rediseño visual / prototipo

**Objetivo:** crear una demo que pueda usarse para presentar la propuesta.

### Incluye

- React + Vite + TypeScript.
- Diseño responsive y navegación principal.
- Portada, catálogo/categorías, búsqueda y vista de producto.
- Modelo de datos frontend estable y proveedor de catálogo de demostración.
- Datos y assets de prueba identificados como tales.
- Componentes reutilizables y estados vacíos/error cuando correspondan.
- Instrucciones de ejecución local.

### No incluye

PostgreSQL, Prisma, autenticación, administración, sincronización en vivo, carrito comercial, pedidos, stock real, checkout, pagos ni despliegue de producción.

### Criterios de aceptación

- La app corre localmente usando comandos documentados.
- El build y el lint terminan sin errores; el chequeo de tipos pasa.
- Se puede navegar por la demo y buscar productos de prueba.
- El diseño se adapta a móvil y escritorio.
- Los datos ficticios no se presentan como datos actuales de la tienda.
- No hay botones muertos ni errores visibles en la consola para el flujo principal.

## Puerta de decisión entre niveles

Antes de Nivel 2, el dueño de la tienda debe aceptar la propuesta y definir qué sistema será fuente de verdad para productos, precios y stock. También se deben aclarar derechos de uso, operación, hosting, mantenimiento y presupuesto.

## Nivel 2 — Tienda personalizada

**Objetivo:** tener un catálogo administrable y una API propia.

Posibles entregables, sujetos a definición de alcance:

- API REST con Node.js y Express.
- PostgreSQL y Prisma ORM con migraciones.
- Modelo de marcas, perfumes, presentaciones, categorías, imágenes y stock.
- Panel administrativo protegido y roles mínimos.
- Operaciones de alta, edición, baja/archivado y disponibilidad de productos.
- Validación de datos en servidor.
- Importación/sincronización definida y documentada, si se acuerda.
- Registro y auditoría básica de cambios relevantes.

No migrar ni eliminar el catálogo de Pedix sin un plan de importación, conciliación y reversión aprobado.

## Nivel 3 — E-commerce completo

**Objetivo:** administrar la compra de punta a punta.

Posibles entregables:

- Carrito y checkout.
- Pedidos y detalle de artículos.
- Integración real con un proveedor de pagos, inicialmente evaluando Mercado Pago.
- Confirmación de pago mediante los mecanismos oficiales del proveedor; nunca confiar solo en el resultado del navegador.
- Gestión de estados de pedido y envío.
- Control de concurrencia y consistencia de inventario.
- Historial de movimientos y tratamiento de cancelaciones/devoluciones.
- Seguridad, logging, monitorización, backups y pruebas específicas.

Antes de implementar estos puntos se deben definir impuestos/facturación, envío/retiro, reglas de reembolso y la estrategia de inventario de decants.

## Regla para el agente

Trabaja únicamente en la etapa activa indicada por el usuario. Puedes mencionar mejoras futuras, pero no implementarlas como parte de una tarea de Nivel 1.
