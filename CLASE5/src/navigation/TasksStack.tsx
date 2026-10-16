import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TaskForm from '../components/TaskForm';
import { COLORS } from '../constants/theme';
// Tipamos las rutas del stack y sus params.
// TaskDetail recibe los datos de la tarea seleccionada.
// TaskForm no recibe params.
export type TasksStackParamList = {
  TaskList: undefined;
  TaskDetail: {
    id: string;
    title: string;
    description: string;
    category: string;
    createdAt: string; // lo pasamos como string ISO para evitar warnings de serialización
  };
  TaskForm: undefined;
};

const Stack = createNativeStackNavigator<TasksStackParamList>();

export default function TasksStack() {
  return (
    <Stack.Navigator
      initialRouteName="TaskList"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="TaskList"
        component={HomeScreen}
        options={{ title: 'Mis tareas' }}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={{ title: 'Detalle de tarea' }}
      />
      <Stack.Screen
        name="TaskForm"
        component={TaskForm}
        options={{ title: 'Nueva tarea', presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}