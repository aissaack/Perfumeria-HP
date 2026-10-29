# Git Workflow — Huelepectacular

## 1. Objetivo

Definir la estrategia de ramas y las reglas de trabajo con Git para mantener el repositorio organizado, facilitar las revisiones y reducir el riesgo de introducir cambios inestables.

## 2. Ramas permanentes

### `main`

- Contiene versiones estables y verificadas del proyecto.
- No se utiliza para desarrollar funcionalidades directamente.
- Recibe cambios mediante la integración de versiones revisadas desde `develop`, o mediante un procedimiento de corrección urgente previamente autorizado.

### `develop`

- Es la rama principal de integración del desarrollo.
- Recibe las funcionalidades y correcciones implementadas y verificadas.
- Debe mantenerse en un estado razonablemente funcional.

## 3. Ramas temporales

### `feat/<nombre>`

Para implementar funcionalidades nuevas o cambios independientes.

Ejemplos: `feat/catalog-filters`, `feat/homepage-redesign`, `feat/huelepectacular-line`.

Se crean normalmente desde `develop` y se integran en `develop` cuando los cambios están terminados y verificados.

### `fix/<nombre>`

Para corregir errores funcionales, visuales o técnicos. Se crean normalmente desde `develop` y se integran en `develop` después de verificar la corrección.

### `hotfix/<nombre>`

Para corregir problemas críticos de una versión estable. Se crean desde `main` y deben integrarse en `main` y `develop` cuando corresponda, evitando que la corrección se pierda en futuras versiones.

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
12. Mantener este documento actualizado cuando el usuario apruebe cambios en la estrategia de ramas o en el registro.

## 5. Flujo habitual

1. Comprobar el estado de `develop` y su relación con el remoto cuando corresponda; acordar cualquier actualización necesaria.
2. Proponer y crear una rama temporal para la tarea cuando corresponda y exista autorización.
3. Implementar únicamente los cambios relacionados con esa tarea.
4. Ejecutar las verificaciones disponibles, revisar los cambios y presentar un resumen al usuario.
5. Solicitar autorización explícita antes de crear commits, publicar, fusionar o eliminar ramas.
6. Integrar los cambios aprobados en `develop` solo con autorización.
7. Incorporar en `main` únicamente versiones estables y revisadas, con autorización específica.

## 6. Principios generales

- Mantener los cambios pequeños y relacionados con una tarea concreta.
- Evitar mezclar funcionalidades independientes en una misma rama.
- No considerar una tarea terminada únicamente porque el código compila.
- Respetar `AGENTS.md` y la documentación arquitectónica del proyecto.

## 7. Prioridad de las instrucciones

Se respetan las instrucciones aplicables de mayor prioridad, `AGENTS.md` y las decisiones aprobadas del proyecto. Ante una contradicción relevante o una operación con riesgo de pérdida de trabajo, detenerse y solicitar aclaraciones.

## 8. Registro de ramas

| Rama | Propósito | Estado |
| --- | --- | --- |
| `main` | Versiones estables del proyecto | Permanente |
| `develop` | Integración de funcionalidades | Permanente |
| `feat/styles` | Trabajo de estilos de la interfaz | Existente; estado de desarrollo no confirmado |
| `feat/catalog-filters` | Implementar filtros del catálogo | En desarrollo |
