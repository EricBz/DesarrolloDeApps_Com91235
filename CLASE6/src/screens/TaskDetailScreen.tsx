// src/screens/TaskDetailScreen.tsx
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { TasksStackParamList } from '../navigation/TasksStack';
import TaskDetail from '../components/TaskDetail';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleTaskStatus, deleteTask } from '../store/slices/tasksSlice';

type TaskDetailRouteProp = RouteProp<TasksStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen() {
  const route = useRoute<TaskDetailRouteProp>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  //  Ahora solo recibimos el id por params...
  const { id } = route.params;

  // ...y buscamos la tarea en el store global.
  // Si la tarea cambia (toggle, delete), esta pantalla se re-renderiza sola.
  const task = useAppSelector((state) =>
    state.tasks.tasks.find((t) => t.id === id)
  );

  // Si la tarea no existe (por ejemplo, la borraron y volvimos), mostramos nada
  if (!task) {
    return null;
  }

  //  Handler para toggle
  const handleToggle = () => {
    dispatch(toggleTaskStatus(id));
  };

  //  Handler para delete: borra y vuelve a la lista
  const handleDelete = () => {
    dispatch(deleteTask(id));
    navigation.goBack();
  };

  return (
    <TaskDetail
      task={task}
      onBack={() => navigation.goBack()}
      onToggle={handleToggle}
      onDelete={handleDelete}
    />
  );
}