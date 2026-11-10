# Arquitectura objetivo

## Principios

1. **Simplicidad proporcional a la etapa:** no desplegar componentes futuros antes de necesitarlos.
2. **Separación entre presentación y datos:** React no debe depender de una respuesta externa concreta.
3. **Evolución incremental:** el Nivel 1 debe ser útil por sí mismo y no obligar a rehacer la interfaz para avanzar.
4. **Monolito modular:** una API propia organizada por dominios cuando haga falta; no microservicios.
5. **Datos externos como no confiables:** validar y normalizar cualquier respuesta externa.

## Stack objetivo

- Frontend: React + Vite + TypeScript.
- Navegación: usar rutas declarativas si se necesita navegar entre portada, categorías y producto; evitar navegación artesanal frágil.
- Backend futuro: Node.js + Express + TypeScript.
- Persistencia futura: PostgreSQL.
- ORM futuro: Prisma ORM, con migraciones versionadas.
- Protocolo entre frontend y backend: API REST versionada (por ejemplo `/api/v1/...`) cuando exista el backend propio.
- Paquetes: npm y lockfile versionado.

No fijar versiones a mano usando números obsoletos de esta documentación. Al crear el scaffold, verificar versiones estables compatibles con Node.js LTS actual, elegirlas explícitamente y guardar el lockfile. No instalar versiones beta/RC sin autorización.

## Nivel 1: arquitectura mínima

Propuesta inicial:

```text
apps/
  web/
    src/
      app/                 # composición de la aplicación y rutas
      components/          # componentes UI genéricos
      features/catalog/    # catálogo, búsqueda y presentación de productos
      data/demo/           # catálogo de demostración
      styles/              # estilos globales y tokens de diseño
      types/               # tipos de UI compartidos localmente
    public/                # assets estáticos autorizados

docs/
```

Esta es una orientación, no una obligación de crear todos los directorios vacíos. El agente debe proponer un scaffold mínimo tras inspeccionar el repositorio.

El catálogo debe exponerse a los componentes mediante una interfaz/servicio estable (por ejemplo, `CatalogRepository`). En Nivel 1 su implementación será de demostración. Los componentes visuales reciben datos normalizados, no objetos crudos de Pedix.

## Evolución futura

Cuando se apruebe el Nivel 2, una estructura posible es:

```text
apps/
  web/                     # React/Vite
  api/
    src/
      app.ts               # ensamblado de Express
      modules/
        catalog/
        brands/
        inventory/
        orders/             # cuando corresponda
      infrastructure/
        database/
        integrations/
packages/
  contracts/               # solo si los tipos compartidos lo justifican
prisma/                    # schema y migraciones, en la ubicación acordada
```

No separar en `packages/` ni agregar workspaces compartidos por anticipado si no hay una necesidad real. La estructura se confirma cuando se construya el backend.

## Fronteras de responsabilidad

- **Componentes UI:** representar estado y acciones; no consultan proveedores directamente.
- **Feature de catálogo:** define tipos y acciones específicas del catálogo.
- **Proveedor/repositorio de catálogo:** obtiene datos de la implementación disponible (demo ahora; API propia o integración más adelante).
- **API propia futura:** valida entradas, aplica reglas de negocio, autoriza acciones y devuelve DTOs estables.
- **Persistencia futura:** PostgreSQL es la fuente de verdad del catálogo propio una vez que la migración se acuerde.
- **Integraciones futuras autorizadas:** adaptadores separados del dominio. No se integrará Pedix; una eventual integración de pagos debe mantener sus estructuras separadas.

## Contrato conceptual del producto para el Nivel 1

Definir solo los campos necesarios para mostrar y buscar productos. Como mínimo:

- `id`: identificador estable de demo.
- `name`: nombre de presentación/listado.
- `brandName`: marca visible.
- `categoryIds` o categorías normalizadas.
- `format`: botella completa, decant u otro formato de venta.
- `sizeMl`: tamaño si corresponde.
- `price`: dato numérico de demo o una representación decimal segura; no usar aritmética de `float` para cálculos monetarios.
- `currency`: `ARS` para la demo local.
- `imageUrl`: recurso autorizado o placeholder.
- `description`: opcional.
- `isDemoData`: true en los fixtures de demostración.

Evitar modelar toda la base de datos futura dentro del frontend. El contrato de Nivel 1 debe ser intencionalmente pequeño.

## Configuración y entornos

- Los secretos irán en variables de entorno ignoradas por Git.
- Si más adelante existen variables, actualizar `.env.example` con nombres y valores vacíos/de ejemplo, nunca secretos.
- Validar configuración de servidor al arrancar cuando exista backend.
- No crear endpoints reales ni credenciales de producción para una demo.
