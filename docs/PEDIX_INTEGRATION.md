# Integración con Pedix: alcance y precauciones

## Estado conocido

La documentación pública de ayuda de Pedix describe una API de solo lectura para consultar catálogo y promociones. La documentación técnica consultada muestra un endpoint de ejemplo alojado en un entorno `develop` e indica explícitamente que esa URL es solo de desarrollo y que la URL de producción aún no está publicada en esa documentación.

Referencias consultadas:

- Centro de ayuda: https://ayuda.pedix.app/es/article/puedo-integrar-pedix-con-mi-propio-sistema-o-usar-su-api
- Documentación técnica: https://pedix.notion.site/Integraci-n-entre-Pedix-y-otro-sistema-de-gesti-n-Documentaci-n-T-cnica-ef3f51441588492b85c0136ad06e291e

Esta información debe volver a verificarse cuando se vaya a implementar la integración: la documentación y el producto pueden cambiar.

## Regla para el Nivel 1

- No apuntar al endpoint de desarrollo ni reutilizar su identificador de tienda de prueba.
- No inventar la URL de producción ni inferir que el endpoint responde para Huelepectacular.
- Usar una fuente de datos de demostración local con una interfaz estable.
- Mantener los fixtures de demo claramente separados de los datos reales.
- El prototipo debe funcionar aunque Pedix no esté disponible.

## Validación necesaria antes de una integración real

1. Confirmar con el dueño de la tienda que autoriza la integración.
2. Consultar la documentación oficial vigente y obtener el endpoint de producción correcto y el identificador correspondiente.
3. Verificar la forma real de la respuesta con un caso de prueba de la tienda autorizada.
4. Revisar cómo aparecen categorías, productos, variantes/opciones, precios, promociones, imágenes y enlaces de producto.
5. Definir cómo tratar inactivos, categorías vacías, errores, rate limits, datos faltantes y cambios en el esquema.
6. Acordar la frecuencia de actualización y el comportamiento si Pedix no responde.

## Dónde debe vivir la integración

Cuando se apruebe, la integración externa debe estar en un adaptador aislado. Preferentemente, el backend propio consultará Pedix y normalizará la respuesta a un DTO del proyecto; el frontend no debe depender de la estructura original de Pedix. Esta integración puede requerir un backend mínimo antes de que exista PostgreSQL, pero debe aprobarse como parte del alcance y no activarse automáticamente.

## Separación de fuente de verdad

Durante el Nivel 1, el catálogo de demo es la fuente de datos de la demo. Si se incorpora Pedix en modo lectura, Pedix seguirá siendo la fuente de verdad de precios, productos y disponibilidad mientras esa sea la decisión del negocio.

En el Nivel 2, no se debe asumir que la tienda propia puede pasar a controlar inventario o pedidos solo por leer el catálogo de Pedix. Antes de la migración debe decidirse cuál sistema manda sobre cada dato, cómo se sincroniza, cómo se reconcilian diferencias y cómo volver atrás si hay errores.

## Webhooks y pedidos

La documentación de Pedix distingue la API de catálogo de la notificación de nuevos pedidos mediante webhook, cuyo desarrollo/activación requiere coordinación con el soporte de Pedix. No implementar ni asumir webhooks como disponibles sin confirmar el acceso, el contrato y la configuración para la tienda real.
