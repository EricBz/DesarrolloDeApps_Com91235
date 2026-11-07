
export type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string; //  cambiar a string
  completed: boolean;
};

//  NUEVO: tipo del filtro global
export type TaskFilter = 'all' | 'completed' | 'pending';