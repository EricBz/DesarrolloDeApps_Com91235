import { useState } from 'react';
import { FlatList,Text,TouchableOpacity,StyleSheet,View,} from 'react-native';
import EmptyState from '../components/EmptyState';
import TaskDetail from '../components/TaskDetail';
import { Task } from '../constants/types';
//setstaks por si luego queremos hacer modificaciones en la lista.
export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Estudiar React Native',
      description: 'Repasar FlatList y componentes.',
      category: 'Estudio',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Crear TaskFlow',
      description: 'Continuar con el proyecto de tareas.',
      category: 'Trabajo',
      createdAt: new Date(),
    },
  ]);
//1 AL ENTRAR SELECTEDTASK VALE NULL = lista mis tareas
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  // Si hay una tarea seleccionada mostramos su detalle
  if (selectedTask) {
    return (
      <TaskDetail task={selectedTask} onBack={() => setSelectedTask(null)}/>
    );
  }
//SI no hay pueden ser 2 cosas; no hay tareas o no  fue seleccionada:
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis tareas</Text>
    {/**3 NO HAY ITEM SELECCIONADO, ES NULL O FALSE ENTONCES MUESTRA LISTA */}
      {tasks.length === 0 ? (
        <EmptyState />
      ) : ( //2 CON ONPRESS SELECCIONAMOS TAREA, YA NO ES NULL SINO ITEM.
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => setSelectedTask(item)}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text>{item.category}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});