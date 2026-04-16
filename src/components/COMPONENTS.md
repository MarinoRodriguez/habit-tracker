# Kinetic Component Library

Este documento describe los componentes reutilizables creados para la aplicación Kinetic.

## Componentes de UI Base

### `Button`
Un componente de botón versátil con múltiples variantes.
- **Ubicación**: `src/components/Button.tsx`
- **Uso**: 
  ```tsx
  <Button variant="kinetic" onClick={handleAction} icon={<Plus />}>
    Texto del Botón
  </Button>
  ```
- **Variantes**: `primary`, `secondary`, `outline`, `ghost`, `kinetic`.

### `Badge`
Indicador visual para estados de hábitos.
- **Ubicación**: `src/components/Badge.tsx`
- **Uso**: `<Badge status="fulfilled" />`
- **Estados**: `fulfilled`, `pending`, `failed`.

### `Card`
Contenedor base con sombras y efectos de hover consistentes.
- **Ubicación**: `src/components/Card.tsx`
- **Uso**: 
  ```tsx
  <Card hover={true}>
    Contenido aquí
  </Card>
  ```

### `ProgressBar`
Barra de progreso con el gradiente característico de Kinetic.
- **Ubicación**: `src/components/ProgressBar.tsx`
- **Uso**: `<ProgressBar progress={65} height="h-3" showLabels />`

### `SectionHeader`
Encabezado estandarizado para secciones y páginas.
- **Ubicación**: `src/components/SectionHeader.tsx`
- **Uso**: 
  ```tsx
  <SectionHeader 
    level="h1" 
    title="Título" 
    subtitle="Subtítulo opcional" 
    icon={<Icon />} 
  />
  ```

## Páginas (Pages)

Las pantallas principales de la aplicación se encuentran en `src/pages/` y representan estados completos de la vista.

### `Dashboard`
La vista principal que muestra el resumen diario y todas las tarjetas de hábitos.
- **Ubicación**: `src/pages/Dashboard.tsx`

### `HabitDetails`
Vista detallada de un hábito individual, incluyendo estadísticas de racha, timeline y registro de actividad reciente.
- **Ubicación**: `src/pages/HabitDetails.tsx`

### `CreateHabit`
Formulario para la creación de nuevos hábitos y definición de metas.
- **Ubicación**: `src/pages/CreateHabit.tsx`

### `HabitCard`
Tarjeta específica para mostrar el resumen de un hábito en el dashboard.
- **Ubicación**: `src/components/HabitCard.tsx`

### `TimelineItem`
Elemento para la cronología histórica de un hábito.
- **Ubicación**: `src/components/TimelineItem.tsx`

### `ActivityRow`
Fila para mostrar registros individuales de actividad.
- **Ubicación**: `src/components/ActivityRow.tsx`

### `NavButton`
Botón especializado para la navegación inferior (mobile).
- **Ubicación**: `src/components/NavButton.tsx`
