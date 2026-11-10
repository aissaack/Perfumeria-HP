# ADR-002: fuente de datos del Nivel 1

- **Estado:** Aceptada.
- **Fecha:** 2026-10-24

## Contexto

La primera entrega es un prototipo visual para presentar una propuesta. Pedix documenta una API de lectura de catálogo, pero la documentación técnica consultada muestra un endpoint de desarrollo y advierte que no es el endpoint de producción.

## Decisión

El Nivel 1 usará un dataset local de demostración detrás de una interfaz/repositorio de catálogo. No conectará a producción ni usará el endpoint de prueba de Pedix.

## Consecuencias

- La demo puede desarrollarse y mostrarse sin credenciales ni dependencia externa.
- Los componentes de React consumirán un modelo normalizado propio.
- La posibilidad de integrar Pedix mencionada originalmente queda sustituida por [ADR-003](ADR-003-independent-store.md). Una API propia futura podrá usar un adaptador cuando se autorice esa etapa.
- Los datos ficticios deberán identificarse como tales y nunca confundirse con precios/stock actuales.
