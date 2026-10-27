# Huelepectacular

Propuesta de rediseño para una tienda de perfumería con una ruta de evolución desde un prototipo visual hasta un e-commerce propio.

## Objetivo actual

Construir el **Nivel 1 — Rediseño visual**: una experiencia de catálogo más cuidada, clara y usable en móvil, con navegación por categorías, búsqueda y fichas/tarjetas de producto. El prototipo usa datos de demostración mientras se verifica si puede integrarse con el catálogo real de Pedix.

## Evolución prevista

1. **Nivel 1 — Rediseño:** interfaz, navegación y datos de demostración; sin checkout ni administración.
2. **Nivel 2 — Tienda personalizada:** API propia, PostgreSQL, gestión del catálogo y administración.
3. **Nivel 3 — E-commerce completo:** carrito, pedidos, pagos, envíos y control de inventario.

## Stack objetivo

- Frontend: React, Vite y TypeScript.
- Backend futuro: Node.js, Express y TypeScript.
- Base de datos futura: PostgreSQL.
- ORM futuro: Prisma, cuando el proyecto necesite persistencia propia.

No implica que todas estas tecnologías deban instalarse en el Nivel 1. Consultá `docs/ROADMAP.md` y `docs/ARCHITECTURE.md`.

## Documentación

- [`AGENTS.md`](AGENTS.md): instrucciones permanentes para OpenCode.
- [`docs/PROJECT_BRIEF.md`](docs/PROJECT_BRIEF.md): alcance y objetivos del producto.
- [`docs/ROADMAP.md`](docs/ROADMAP.md): etapas y criterios de aceptación.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): arquitectura y estructura prevista.
- [`docs/DOMAIN_MODEL.md`](docs/DOMAIN_MODEL.md): conceptos y entidades futuras.
- [`docs/UX_UI_GUIDELINES.md`](docs/UX_UI_GUIDELINES.md): principios de diseño.
- [`docs/PEDIX_INTEGRATION.md`](docs/PEDIX_INTEGRATION.md): integración y restricciones conocidas.
- [`docs/QUALITY_CHECKLIST.md`](docs/QUALITY_CHECKLIST.md): controles de calidad.
- [`docs/decisions/`](docs/decisions/): decisiones de arquitectura.
- [`docs/FIRST_SESSION_PROMPT.md`](docs/FIRST_SESSION_PROMPT.md): prompt para comenzar con OpenCode.

## Estado del repositorio

La documentación define la dirección del proyecto; no significa que la aplicación ya esté implementada. El siguiente paso es abrir el repositorio con OpenCode, pedirle que lea la documentación y proponga un plan inicial antes de generar el scaffold.
