// src/navigation/TasksStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TaskForm from '../components/TaskForm';
import { COLORS } from '../constants/theme';

//  SIMPLIFICADO: TaskDetail ahora recibe solo el id.
// Los datos (title, description, etc.) los busca del store global.
export type TasksStackParamList = {
  TaskList: undefined;
  TaskDetail: { id: string };
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