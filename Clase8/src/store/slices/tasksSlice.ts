
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskFilter } from '../../constants/types';

type TasksState = {
  tasks: Task[];
  filter: TaskFilter;
};

//  Ya no hay tareas hardcodeadas: el estado arranca vacío
// y se llena desde Firestore vía onSnapshot.
const initialState: TasksState = {
  tasks: [],
  filter: 'all',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    //  Reemplaza el array entero con lo que venga de Firestore.
    // Firestore es la fuente de verdad; Redux es su espejo.
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    setFilter: (state, action: PayloadAction<TaskFilter>) => {
      state.filter = action.payload;
    },

    //  addTask / toggleTaskStatus / deleteTask ahora se manejan
    // directamente contra Firestore (ver taskService.ts).
    // No los borro para no romper nada, pero YA NO SE USAN.
  },
});

export const { setTasks, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;