# Integración con Pedix: alcance y precauciones

## Estado actual (decisión permanente)
Huelepectacular será una tienda independiente con backend y base de datos propios cuando llegue a esas etapas. **No se integrará con Pedix** en el camino previsto; no se consumirán sus APIs ni se introducirán dependencias técnicas respecto de ese servicio.

## Estado conocido (histórico)
La documentación pública de ayuda de Pedix describe una API de solo lectura para consultar catálogo y promociones. La documentación técnica consultada muestra un endpoint de ejemplo alojado en un entorno `develop` e indica explícitamente que esa URL es solo de desarrollo y que la URL de producción aún no está publicada en esa documentación.

Referencias consultadas:

- Centro de ayuda: https://ayuda.pedix.app/es/article/puedo-integrar-pedix-con-mi-propio-sistema-o-usar-su-api
- Documentación técnica: https://pedix.notion.site/Integraci-n-entre-Pedix-y-otro-sistema-de-gesti-n-Documentaci-n-T-cnica-ef3f51441588492b85c0136ad06e291e

Esta información se conserva solo con fines históricos. No se utilizará para esta implementación.

## Regla para el Nivel 1
- No apuntar a ningún endpoint de Pedix.
- Usar una fuente de datos de demostración local con una interfaz estable.
- Mantener los fixtures de demo claramente separados de los datos reales.
- El prototipo debe funcionar sin dependencias externas.
- La línea propia "Perfumes Huelepectacular" se gestiona como datos propios en el frontend/demo.

## Notas
Cualquier migración futura a un sistema propio se documentará por separado. No se asume sincronización con Pedix.
