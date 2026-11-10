# Huelepectacular

Prototipo de rediseño de una perfumería, con una evolución prevista hacia una tienda independiente.

## Estado actual

El Nivel 1 está en desarrollo en `apps/web`: incluye portada, catálogo general y sección de línea propia, búsqueda, filtros y presentaciones con precios ficticios de demostración. La línea propia ofrece páginas de detalle e imágenes de ejemplo para los productos documentados en `docs/catalogos/LINEA_HUELEPECTACULAR.md` y un producto ficticio; las familias reales son orientativas y están pendientes de validación. Los precios y la disponibilidad no son datos en vivo. Los criterios deseados para el catálogo general están en [GENERAL_CATALOG_SPECIFICATIONS.md](docs/catalogos/GENERAL_CATALOG_SPECIFICATIONS.md).

La tienda será independiente de Pedix. Su página pública se consulta manualmente como referencia de productos; no habrá integración, API ni sincronización con Pedix. Ver [ADR-003](docs/decisions/ADR-003-independent-store.md).

## Demo en GitHub Pages

El flujo de GitHub Actions compila la demo desde `main` para la subruta del repositorio y la publica mediante GitHub Pages. En ese entorno las rutas usan `#`, para permitir abrir y recargar directamente las secciones y los detalles en un alojamiento estático. La navegación local conserva sus rutas habituales.

GitHub Pages debe estar configurado con GitHub Actions como origen; su disponibilidad para repositorios privados depende del plan de GitHub. La demo es ilustrativa y sus datos no representan precios ni disponibilidad en vivo.

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
