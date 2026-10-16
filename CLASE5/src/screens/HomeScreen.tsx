import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EmptyState from '../components/EmptyState';
import { Task } from '../constants/types';
import { TasksStackParamList } from '../navigation/TasksStack';
import { COLORS } from '../constants/theme';
// Tipamos la navegación para tener autocompletado en navigate()
type HomeNavProp = NativeStackNavigationProp<TasksStackParamList, 'TaskList'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Estudiar React Native',
      description: 'Repasar FlatList y componentes.',
      category: 'Estudio',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Crear tarea',
      description: 'Continuar con el proyecto de tareas.',
      category: 'Trabajo',
      createdAt: new Date(),
    },
  ]);
  // Ya no hay estado local ni render condicional.
  // Ahora navegamos al detalle pasando los datos por params.
  const handleTaskPress = (task: Task) => {
    navigation.navigate('TaskDetail', {
      id: task.id,
      title: task.title,
      description: task.description,
      category: task.category,
      createdAt: task.createdAt.toISOString(), // Date → string ISO (serializable)
    });
  };

  // Botón flotante para ir al formulario de nueva tarea
  const handleAddPress = () => {
    navigation.navigate('TaskForm');
  };

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => ( //CAMBIO DE PASAJE DE PROPS A DETAILS
            <TouchableOpacity style={styles.card} onPress={() => handleTaskPress(item)}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskCategory}>{item.category}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Botón flotante "+" para nueva tarea */}
      <TouchableOpacity style={styles.fab} onPress={handleAddPress}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.text,
  },
  taskCategory: {
    color: COLORS.textLight,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: {
    color: 'white',
    fontSize: 32,
    lineHeight: 34,
    fontWeight: 'bold',
  },
});
