# Huelepectacular — instrucciones del proyecto

Huelepectacular es un proyecto web para presentar mejor una tienda de perfumería que vende perfumes de marca propia, diseñador, árabes, nicho, low/mid cost y decants. El objetivo inmediato es crear un prototipo de rediseño visual convincente; la evolución prevista es una tienda personalizada y, más adelante, un e-commerce completo.

## Antes de trabajar

Lee estos documentos en este orden cuando la tarea afecte al producto o su arquitectura:

1. `docs/PROJECT_BRIEF.md`: objetivo, usuarios, alcance y exclusiones.
2. `docs/ROADMAP.md`: etapas y criterios de aceptación.
3. `docs/ARCHITECTURE.md`: estructura prevista y separación de responsabilidades.
4. `docs/UX_UI_GUIDELINES.md`: dirección visual y requisitos de experiencia.
5. `docs/PEDIX_INTEGRATION.md`: independencia de Pedix y consulta manual de productos.
6. `docs/DOMAIN_MODEL.md`: modelo conceptual para las etapas futuras.
7. `docs/QUALITY_CHECKLIST.md`: verificación antes de terminar.

Los documentos de `docs/decisions/` registran decisiones de arquitectura ya tomadas. Si una tarea entra en conflicto con ellos, señálalo antes de cambiar la decisión.

## Etapa actual

**Etapa activa: Nivel 1 — Rediseño visual/prototipo.** El repositorio puede estar vacío o contener solo documentación.

El primer objetivo es una interfaz de tienda atractiva, responsive, navegable y fácil de demostrar. Usa un catálogo de demostración claramente identificado como tal. La tienda será independiente de Pedix: su página pública se usa únicamente para consultas manuales sobre productos, sin API ni sincronización.

No construyas todavía un sistema de administración, autenticación, base de datos propia, inventario real, pedidos propios, checkout ni pagos. Son parte de etapas posteriores.

## Stack y estructura

- **Stack objetivo a largo plazo:** PERN: PostgreSQL, Express, React y Node.js.
- **Frontend previsto:** React + Vite + TypeScript.
- **Backend futuro:** Node.js + Express + TypeScript.
- **Base de datos futura:** PostgreSQL; acceso mediante Prisma ORM cuando se apruebe la etapa que lo necesite.
- **Gestor de paquetes:** npm. Mantén `package-lock.json` versionado si se crea `package.json`.
- **Arquitectura:** aplicación modular, no microservicios.
- **Nivel 1:** empezar por la interfaz y un proveedor de catálogo de demostración. No agregar servicios de backend o base de datos solo para aparentar escalabilidad.

La estructura técnica inicial se debe mantener sencilla. La estructura futura propuesta está en `docs/ARCHITECTURE.md`; no crees carpetas vacías para cada etapa si todavía no aportan valor.

## Comandos

La aplicación está en `apps/web`. Desde ese directorio:

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm run preview
```

El script `typecheck` comprueba la aplicación y la configuración de Vite. No hay script de tests. No afirmes que se ejecutaron verificaciones que no se hayan ejecutado.

Como mínimo, al existir la aplicación, el proyecto debería ofrecer scripts copiables para desarrollo, compilación, lint y verificación de tipos. Agrega tests automatizados donde aporten valor y documenta su comando exacto.

## Flujo de trabajo con Git

Antes de crear o cambiar ramas, crear commits, integrar cambios o publicarlos, consulta `docs/GIT_WORKFLOW.md` y revisa el estado de Git.

No crees commits ni ramas, cambies de rama, fusiones o publiques cambios sin autorización explícita del usuario.

## Convenciones

- La interfaz visible para el cliente se escribe en español rioplatense natural, con importes formateados para Argentina (`es-AR`, moneda `ARS`).
- Nombres de variables, funciones, componentes, tipos y módulos: en inglés y descriptivos. Comentarios en español solo cuando aclaren una decisión no obvia.
- Componentes React: `PascalCase`. Variables y funciones: `camelCase`. Constantes: `UPPER_SNAKE_CASE` solo cuando corresponda.
- Usa TypeScript en modo estricto; evita `any`. Si un tipo externo no está verificado, valida los datos en el límite de entrada.
- Mantén la lógica de acceso a productos separada de los componentes de presentación. Los componentes no deben conocer la forma original de una API externa.
- Evita duplicar lógica o agregar abstracciones sin un uso concreto. Prefiere componentes pequeños, con responsabilidades claras.
- No guardes contraseñas, tokens, claves API ni datos personales reales en el repositorio.
- No inventes precios, disponibilidad, reseñas, ventas, testimonios ni certificaciones de productos reales. Los datos ficticios deben estar marcados como datos de demostración.

## Reglas del dominio y trampas conocidas

- Un **perfume** no es lo mismo que una **presentación vendible**. Un mismo perfume puede venderse como botella completa y como decants de distintos tamaños. Consultar `docs/DOMAIN_MODEL.md`.
- No confundas el segmento del producto (marca propia, diseñador, árabe, nicho, low/mid cost) con el formato (botella, decant de 5 ml, decant de 10 ml, etc.).
- El stock de una botella y el de los decants que se extraen de ella podrían estar relacionados. No inventes la regla de inventario: deberá confirmarse con el negocio antes del Nivel 2/3.
- El precio y la disponibilidad mostrados en el prototipo no representan datos en vivo.
- No integrar Pedix ni consumir sus APIs. La página pública solo sirve para consultas manuales sobre productos. Ver `docs/PEDIX_INTEGRATION.md` y ADR-003.
- No copies imágenes, logos o textos de terceros sin confirmar que pueden utilizarse. Para la demo, usa assets autorizados o placeholders visuales.

## Forma de trabajar

1. Antes de una tarea nueva, identifica en qué nivel del roadmap entra.
2. Si la tarea es amplia, empieza con un plan breve: archivos que cambiarás, decisiones, riesgos y cómo verificarás el resultado.
3. Trabaja en incrementos pequeños y coherentes. No generes toda la aplicación de una sola vez.
4. No cambies de nivel funcional sin autorización explícita. Si una idea corresponde a una etapa futura, documéntala como propuesta y no la implementes ahora.
5. No presupongas información faltante. Señala incertidumbres relevantes y elige un fallback seguro para que el prototipo siga funcionando.
6. Al terminar, resume: archivos creados/modificados, comportamiento incorporado, comandos ejecutados y resultados; indica también lo que no pudiste verificar.
7. Si una decisión importante cambia, actualiza la documentación correspondiente y registra una ADR en `docs/decisions/` cuando sea una decisión de arquitectura duradera.

## Límites

### ✅ Siempre

- Respetar el nivel actual y los documentos del proyecto.
- Crear los archivos necesarios dentro de la estructura acordada sin pedir permiso para cada archivo rutinario.
- Mantener la demo ejecutable con datos de demostración si la integración real no está disponible.
- Pensar en accesibilidad, diseño mobile-first, estados vacíos y errores comprensibles.
- Usar enlaces de navegación y botones con acciones reales; no dejar controles aparentes que no funcionen.
- Mantener el catálogo desacoplado de la interfaz para poder cambiar la fuente de datos más adelante.

### ⚠️ Pregunta antes de

- Agregar dependencias importantes fuera del stack aprobado o servicios pagos.
- Cambiar el stack, la estructura de alto nivel o una decisión registrada.
- Integrar un servicio real que requiera credenciales, permisos del dueño o acceso a datos de clientes.
- Cambiar contratos de datos públicos, persistencia o estrategia de inventario.
- Avanzar a administración, autenticación, pedidos, pagos o checkout de niveles posteriores.
- Desplegar en producción, modificar una tienda real o hacer cambios que afecten ventas/datos existentes.

### 🚫 Nunca

- Subir secretos o archivos `.env` con valores reales.
- Tratar los datos de demostración como catálogo/precios/stock reales.
- Integrar Pedix o consumir sus APIs.
- Implementar un proceso de pago falso que aparente haber cobrado.
- Eliminar archivos o cambios del usuario sin necesidad explícita.
- Afirmar que una prueba pasó sin haberla ejecutado.

## Verificación

Antes de dar una tarea por terminada:

1. Revisa el diff y elimina cambios accidentales.
2. Ejecuta `git diff --check` cuando haya cambios versionados.
3. Cuando existan scripts de la aplicación, ejecuta al menos lint, typecheck y build apropiados al cambio; ejecuta tests relacionados cuando existan.
4. Comprueba la vista responsive en anchos móviles y de escritorio para cambios de UI.
5. Comprueba estados con datos, sin resultados, carga y error cuando sean aplicables.
6. Verifica que no se hayan incorporado secretos ni datos reales inventados.
7. Informa claramente qué se verificó manualmente y qué no.
