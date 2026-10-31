# Git Workflow — Huelepectacular

## 1. Objetivo

Definir la estrategia de ramas y las reglas de trabajo con Git para mantener el repositorio organizado, facilitar las revisiones y reducir el riesgo de introducir cambios inestables.

## 2. Ramas permanentes

`main` y `develop` son permanentes durante todo el proyecto y nunca se eliminan, ni localmente ni en el repositorio remoto.

### `main`

- Contiene versiones estables y verificadas del proyecto.
- No se utiliza para desarrollar funcionalidades directamente.
- Recibe cambios mediante la integración de versiones revisadas desde `develop`, o mediante un procedimiento de corrección urgente previamente autorizado.

### `develop`

- Es la rama principal de integración del desarrollo.
- Recibe las funcionalidades y correcciones implementadas y verificadas.
- Debe mantenerse en un estado razonablemente funcional.
- Contiene la versión más reciente verificada de la demo hasta su integración autorizada en `main`.

## 3. Ramas temporales

Todas las ramas temporales se crean desde `develop` actualizado. Se registran al crearse y se integran mediante un pull request hacia `develop`.

### `feat/<nombre>`

Para implementar funcionalidades nuevas o cambios independientes.

Ejemplos: `feat/catalog-filters`, `feat/homepage-redesign`, `feat/huelepectacular-line`.

Se integran en `develop` cuando los cambios están terminados y verificados.

### `fix/<nombre>`

Para corregir errores funcionales, visuales o técnicos. Se integran en `develop` después de verificar la corrección.

### `hotfix/<nombre>`

Para corregir problemas críticos. Se crean desde `develop` y se integran primero en `develop` mediante un pull request; su incorporación posterior en `main` requiere autorización específica y una versión revisada.

## 4. Reglas para el agente de IA

1. Antes de modificar archivos, comprobar la rama actual y el estado de Git. Antes de cualquier operación de Git que modifique el repositorio, inspeccionar el estado pertinente.
2. No cambiar de rama automáticamente si existen modificaciones locales que puedan perderse o verse afectadas. No descartar cambios del usuario para resolver conflictos.
3. No realizar cambios directamente en `main`, salvo autorización explícita del usuario para una intervención concreta.
4. No crear ni cambiar de rama sin autorización explícita. Si la tarea puede resolverse razonablemente en la rama de trabajo actual, no crear una rama separada sin que el usuario la solicite.
5. Para una funcionalidad o cambio independiente, proponer una rama `feat/*` desde `develop`; para una corrección independiente, proponer una rama `fix/*` desde `develop`. La propuesta no autoriza su creación ni el cambio de rama.
6. Si la rama actual no corresponde a la tarea, explicar la situación y proponer el procedimiento antes de cambiarla.
7. Antes de integrar cambios, ejecutar las comprobaciones disponibles y revisar el diff.
8. No crear commits, fusionar ramas, reescribir el historial, eliminar ramas ni realizar operaciones destructivas sin autorización explícita.
9. No publicar commits ni ramas con `git push` sin autorización explícita. Crear una rama local y publicarla son acciones distintas; autorizar una no implica autorizar la otra.
10. No asumir que las referencias remotas locales están actualizadas. Cuando sea relevante, consultar el remoto con `git fetch` o `git ls-remote`; `fetch` no integra cambios.
11. No ejecutar `pull`, fusionar ni reescribir el historial automáticamente para actualizar `develop`. Si hay divergencias o cambios locales, explicar la situación y solicitar autorización para el procedimiento correspondiente.
12. Mantener el registro histórico actualizado: registrar cada rama al crearla y cambiar su estado al integrarla y al confirmar su eliminación local y remota.
13. Nunca eliminar `main` ni `develop`. Antes de eliminar una rama temporal, comprobar su integración y el estado de sus referencias locales y remotas; cada eliminación requiere autorización explícita.

## 5. Flujo habitual

1. Comprobar el estado de `develop` y su relación con el remoto cuando corresponda; acordar cualquier actualización necesaria.
2. Con autorización, crear desde `develop` actualizado una rama temporal y registrarla como **En desarrollo**.
3. Trabajar de forma aislada, verificar y corregir; crear commits y publicar la rama solo con autorización explícita.
4. Abrir un pull request de la rama hacia `develop`; revisar los cambios y ejecutar las comprobaciones disponibles antes de aprobar e integrar el PR, con la autorización correspondiente.
5. Registrar la rama como **Integrada, pendiente de eliminación**. Tras verificar la integración y obtener autorización explícita, eliminar las copias remota y local.
6. Confirmar que ambas copias fueron eliminadas y registrar **Integrada y eliminada**. Si se necesita otra tarea similar, crear una nueva rama desde el `develop` actualizado.
7. Incorporar en `main` únicamente versiones estables y revisadas, con autorización específica.

## 6. Principios generales

- Mantener los cambios pequeños y relacionados con una tarea concreta.
- Evitar mezclar funcionalidades independientes en una misma rama.
- No considerar una tarea terminada únicamente porque el código compila.
- Respetar `AGENTS.md` y la documentación arquitectónica del proyecto.

## 7. Prioridad de las instrucciones

Se respetan las instrucciones aplicables de mayor prioridad, `AGENTS.md` y las decisiones aprobadas del proyecto. Ante una contradicción relevante o una operación con riesgo de pérdida de trabajo, detenerse y solicitar aclaraciones.

## 8. Registro de ramas

Este registro histórico conserva las ramas temporales aunque se eliminen. Los estados posibles son:

- **En desarrollo:** rama creada para una tarea que aún no se integró.
- **Integrada, pendiente de eliminación:** cambios integrados en `develop`; falta eliminar o confirmar la eliminación de alguna copia local o remota.
- **Integrada y eliminada:** cambios integrados y eliminación de ambas copias confirmada.

`main` y `develop` se identifican como permanentes y no siguen estos estados.

| Rama | Propósito | Estado |
| --- | --- | --- |
| `main` | Versiones estables del proyecto | Permanente |
| `develop` | Integración de funcionalidades | Permanente |
| `feat/styles` | Estilos de la interfaz | Integrada y eliminada |
| `feat/catalog-filters` | Filtros del catálogo | Integrada y eliminada |
| `feat/huelepectacular-line-cards` | Línea propia, presentaciones e imágenes de ejemplo | Integrada y eliminada |
| `feat/product-detail-pages` | Detalle de producto, tarjetas compactas y paleta | Integrada y eliminada |
