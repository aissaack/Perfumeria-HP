# Checklist de calidad

## Antes de implementar

- [ ] Identificar el nivel del roadmap al que pertenece la tarea.
- [ ] Leer los documentos de contexto relevantes.
- [ ] Revisar archivos y comandos existentes; no asumir que la app ya tiene scaffold.
- [ ] Definir qué comportamiento se considera terminado.

## Frontend / interfaz

- [ ] La navegación funciona con mouse y teclado.
- [ ] Los controles visibles realizan la acción que anuncian.
- [ ] Hay estilos coherentes y no aparecen desplazamientos horizontales involuntarios.
- [ ] Se verificó la vista móvil y de escritorio.
- [ ] Contraste, etiquetas, foco y texto alternativo son razonables.
- [ ] La búsqueda/filtros reflejan exactamente el dataset disponible.
- [ ] Los precios y tamaños no pueden confundirse entre una botella y un decant.
- [ ] Los datos de demostración no se presentan como datos reales.
- [ ] No se inventan reseñas, promociones o disponibilidad.

## Código

- [ ] TypeScript no contiene errores.
- [ ] Lint termina sin errores.
- [ ] Build termina correctamente.
- [ ] Tests relevantes pasan, si existen.
- [ ] No hay `any` evitable, lógica duplicada ni dependencias innecesarias.
- [ ] La interfaz no depende de estructuras crudas de terceros.
- [ ] Hay estados vacíos y errores donde corresponde.

## Seguridad y datos

- [ ] No se añadieron secretos ni `.env` real al control de versiones.
- [ ] No se integró Pedix ni se consumieron sus APIs; la consulta de su página pública es manual.
- [ ] Los datos reales incorporados cuentan con autorización y verificación.
- [ ] No hay checkout o pago falso presentado como real.
- [ ] No se hizo un despliegue ni cambios en sistemas reales sin aprobación.

## Al terminar

El agente debe informar qué archivos cambió, qué comandos ejecutó y sus resultados. Si no ejecutó alguna verificación, debe decirlo explícitamente en vez de asumir que pasó.
