# Huelepectacular

Prototipo de rediseño de una perfumería, con una evolución prevista hacia una tienda independiente.

## Estado actual

El Nivel 1 está en desarrollo en `apps/web`: incluye portada, catálogo general y sección de línea propia, búsqueda, filtros y presentaciones con precios de demostración. Los datos no representan precios ni disponibilidad reales. La línea propia documentada en `docs/catalogo/LINEA_HUELEPECTACULAR.md` todavía no está incorporada a la aplicación. La vista de detalle y las imágenes de productos siguen pendientes.

La tienda será independiente de Pedix. Su página pública se consulta manualmente como referencia de productos; no habrá integración, API ni sincronización con Pedix. Ver [ADR-003](docs/decisions/ADR-003-independent-store.md).

## Desarrollo local

La aplicación usa React, Vite, TypeScript, React Router, CSS y npm. Desde `apps/web`:

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm run preview
```

`typecheck` comprueba la aplicación y la configuración de Vite con TypeScript en modo estricto. No hay un script de tests automatizados.

## Evolución y documentación

El Nivel 2 prevé una API propia con Node.js y Express, PostgreSQL y Prisma; el Nivel 3 contempla pedidos, pagos e inventario. Su implementación requiere autorización y definiciones de negocio.

Consultá [AGENTS.md](AGENTS.md), el [brief](docs/PROJECT_BRIEF.md), el [roadmap](docs/ROADMAP.md), la [arquitectura](docs/ARCHITECTURE.md), las [guías de UX/UI](docs/UX_UI_GUIDELINES.md), el [modelo de dominio](docs/DOMAIN_MODEL.md), la [decisión sobre Pedix](docs/PEDIX_INTEGRATION.md), el [checklist](docs/QUALITY_CHECKLIST.md) y las [decisiones de arquitectura](docs/decisions/).
