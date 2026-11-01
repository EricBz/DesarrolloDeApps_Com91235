
import { Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { TasksStackParamList } from '../navigation/TasksStack';
import TaskDetail from '../components/TaskDetail';
import { useAppSelector } from '../store/hooks';
import { toggleTaskInFirestore, deleteTaskInFirestore } from '../services/taskService';

type TaskDetailRouteProp = RouteProp<TasksStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen() {
  const route = useRoute<TaskDetailRouteProp>();
  const navigation = useNavigation();
  const { id } = route.params;

  // La tarea sale del store, que a su vez viene de onSnapshot.
  const task = useAppSelector((s) => s.tasks.tasks.find((t) => t.id === id));

  if (!task) return null;

  const handleToggle = async () => {
    try {
      // ✅ Escribimos en Firestore. onSnapshot actualizará el store y
      // esta pantalla se re-renderizará sola con el nuevo `completed`.
      await toggleTaskInFirestore(id, !task.completed);
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  const handleDelete = () => {
    Alert.alert('Eliminar tarea', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTaskInFirestore(id);
            navigation.goBack();
          } catch (e: any) {
            Alert.alert('Error', e.message);
          }
        },
      },
    ]);
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