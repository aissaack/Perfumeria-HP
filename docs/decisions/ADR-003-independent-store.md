# ADR-003: tienda independiente de Pedix

- **Estado:** Aceptada.
- **Fecha:** 2026-10-30

## Contexto y decisión

Inicialmente se consideró integrar Pedix. El propietario del proyecto descartó esa opción: Huelepectacular será una tienda independiente con backend y base de datos propios cuando se autoricen esas etapas.

No se consumirán APIs de Pedix ni se implementará sincronización o dependencia técnica con ese servicio. La página pública de Huelepectacular en Pedix se podrá consultar manualmente como referencia de productos y su información, registrando fuentes y manteniendo las incertidumbres explícitas.

## Consecuencias

- El Nivel 1 conserva su catálogo local de demostración y no presenta precios o stock ficticios como reales.
- Esta decisión sustituye la posibilidad de integración con Pedix mencionada en ADR-002; la decisión de usar datos locales en Nivel 1 permanece vigente.
- Las fuentes históricas y enlaces de consulta documental se conservan. Los derechos de uso y la vigencia de datos deben confirmarse antes de un uso comercial.
