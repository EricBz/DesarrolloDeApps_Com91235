
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import authReducer from './slices/authSlice'; //  NUEVO

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer, //  NUEVO
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        //  Firestore devuelve objetos Timestamp que no son serializables.
        // Los ignoramos solo en esas rutas para no llenar la consola de warnings.
        ignoredPaths: ['tasks.tasks'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;