// src/screens/HomeScreen.tsx
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EmptyState from '../components/EmptyState';
import { TasksStackParamList } from '../navigation/TasksStack';
import { COLORS } from '../constants/theme';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setFilter } from '../store/slices/tasksSlice';
import { TaskFilter } from '../constants/types';

type HomeNavProp = NativeStackNavigationProp<TasksStackParamList, 'TaskList'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  const dispatch = useAppDispatch();

  // Leemos tareas + filtro del store global
  const { tasks, filter } = useAppSelector((state) => state.tasks);

  //  Derivamos las tareas a mostrar según el filtro
  // Esto se recalcula solo cuando cambian tasks o filter (useSelector ya re-renderiza).
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true; // 'all'
  });

  const handleTaskPress = (id: string) => {
    // Solo pasamos el id: el detalle busca los datos en el store
    navigation.navigate('TaskDetail', { id });
  };

  const handleAddPress = () => {
    navigation.navigate('TaskForm');
  };

  return (
    <View style={styles.container}>
      {/*  UI de filtros: 3 botones que disparan setFilter */}
      <View style={styles.filters}>
        {(['all', 'pending', 'completed'] as TaskFilter[]).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterActive]}
            onPress={() => dispatch(setFilter(f))}
          >
            <Text style={filter === f ? styles.filterTextActive : undefined}>
              {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendientes' : 'Completadas'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/*  EmptyState solo si la lista filtrada está vacía */}
      {filteredTasks.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, item.completed && styles.cardDone]}
              onPress={() => handleTaskPress(item.id)}
            >
              <Text
                style={[
                  styles.taskTitle,
                  item.completed && styles.taskTitleDone,
                ]}
              >
                {item.completed ? '✅ ' : ''}
                {item.title}
              </Text>
              <Text style={styles.taskCategory}>{item.category}</Text>
            </TouchableOpacity>
          )}
        />
      )}

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
    backgroundColor: COLORS.background },

  //  Estilos nuevos para la fila de filtros
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.card,
  },
  filterActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },

  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  //  Estilo para tareas completadas: tachado y opaco
  cardDone: {
    opacity: 0.6,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.text,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textLight,
  },
  taskCategory: { 
    color: COLORS.textLight 
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
    fontWeight: 'bold' 
  },
});