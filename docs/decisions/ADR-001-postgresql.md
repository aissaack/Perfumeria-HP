# ADR-001: PostgreSQL como base de datos objetivo

- **Estado:** Aceptada como decisión objetivo; no implementar en el Nivel 1.
- **Fecha:** 2026-10-24

## Contexto

La evolución prevista incluye marcas, perfumes, distintas presentaciones vendibles, categorías, inventario, clientes, pedidos y pagos. Hay relaciones y reglas de integridad entre varias entidades; los pedidos también requieren guardar una instantánea del precio/nombre de cada artículo y mantener consistencia entre pedido e inventario.

## Decisión

Usar PostgreSQL como base relacional objetivo para el Nivel 2/3, con acceso desde el backend mediante Prisma ORM cuando se implemente persistencia propia.

## Motivos

- Relaciones y claves foráneas para preservar la integridad de datos.
- Transacciones para operaciones comerciales que deban ser consistentes.
- Restricciones de datos y tipos decimales adecuados para importes.
- Buena correspondencia con catálogo, presentaciones, inventario y pedidos.

## Consecuencias

- El Nivel 1 no requiere una base de datos solo para renderizar una demo.
- El esquema debe diseñarse cuando se confirme el dominio y las reglas de negocio.
- El stock de decants y la fuente de verdad del catálogo siguen siendo decisiones pendientes.
- MongoDB no queda descartado para todo uso imaginable; simplemente no es la primera opción para el núcleo transaccional de este proyecto.
