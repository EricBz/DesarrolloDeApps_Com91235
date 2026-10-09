# TaskFlow

Proyecto desarrollado con React Native, Expo y TypeScript para practicar componentes, estados, listas y visualización de detalles.

## Estructura

* `App.tsx`: muestra la pantalla principal.
* `screens/HomeScreen.tsx`: administra la lista de tareas y la tarea seleccionada.
* `components/EmptyState.tsx`: muestra un mensaje cuando no hay tareas.
* `components/TaskDetail.tsx`: muestra los detalles de la tarea seleccionada.
* `types.ts`: define la estructura de una tarea mediante el tipo `Task`.

## Funcionamiento

La pantalla principal utiliza `useState` para almacenar una lista de tareas (`tasks`) y controlar cuál está seleccionada (`selectedTask`).

Las tareas se muestran mediante `FlatList`. Cada elemento se puede seleccionar con `TouchableOpacity`, que actualiza `selectedTask` y permite mostrar el componente `TaskDetail` con su descripción, categoría y fecha.

El botón Volver ejecuta la función `onBack`, recibida mediante props desde `HomeScreen`, que establece `selectedTask` en `null`. React vuelve a renderizar la pantalla y muestra nuevamente la lista.

Si la lista está vacía, se muestra `EmptyState` en lugar de `FlatList`.

## Conceptos practicados

* Componentes reutilizables.
* Props para comunicar componentes.
* Tipos personalizados con TypeScript.
* Estados con `useState`.
* Listas dinámicas con `FlatList`.
* Renderizado condicional.
* Funciones como props.

**Nota:** la navegación se simula mediante el estado. Todavía no se utiliza React Navigation y las tareas se almacenan localmente.
