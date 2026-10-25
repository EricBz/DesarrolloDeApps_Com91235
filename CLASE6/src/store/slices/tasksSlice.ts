// src/store/slices/tasksSlice.ts
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { Task, TaskFilter } from '../../constants/types';

// Tipo del estado que vive en el store global. Aca se guardan las tareas.
type TasksState = {
  tasks: Task[];
  filter: TaskFilter;
};

// Estado inicial: migramos acá las 2 tareas que antes estaban hardcodeadas en HomeScreen
const initialState: TasksState = {
  tasks: [
    {
      id: '1',
      title: 'Estudiar React Native',
      description: 'Repasar FlatList y componentes.',
      category: 'Estudio',
      createdAt: new Date().toISOString(),
      completed: false, //  NUEVO
    },
    {
      id: '2',
      title: 'Crear TaskFlow',
      description: 'Continuar con el proyecto de tareas.',
      category: 'Trabajo',
      createdAt: new Date().toISOString(),
      completed: false, //  NUEVO
    },
  ],
  filter: 'all', //  NUEVO: filtro por defecto
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    //  addTask: recibe el objeto con title/description/category
    // y genera id + createdAt + completed dentro del reducer
    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      },
      // prepare: acá se genera el id y los campos automáticos
      prepare: (data: { title: string; description: string; category: string }) => {
        const task: Task = {
          id: nanoid(),                  // id único generado por RTK
          title: data.title,
          description: data.description,
          category: data.category,
         createdAt: new Date().toISOString(),         // fecha automática
          completed: false,              // toda tarea nueva empieza pendiente
        };
        return { payload: task };
      },
    },

    //  toggleTaskStatus: busca por id y da vuelta el booleano
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },

    //  deleteTask: filtra el array sacando la tarea con ese id
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },

    //  setFilter: actualiza el criterio global
    setFilter: (state, action: PayloadAction<TaskFilter>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTaskStatus, deleteTask, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;