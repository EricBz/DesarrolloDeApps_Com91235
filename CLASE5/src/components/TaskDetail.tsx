// src/components/TaskDetail.tsx
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Task } from '../constants/types';
import { COLORS } from '../constants/theme';

type Props = {
  task: Task;
  onBack: () => void;
};

export default function TaskDetail({ task, onBack }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>

      <Text style={styles.label}>Descripción</Text>
      <Text style={styles.text}>{task.description}</Text>

      <Text style={styles.label}>Categoría</Text>
      <Text style={styles.text}>{task.category}</Text>

      <Text style={styles.label}>Fecha</Text>
      <Text style={styles.text}>{task.createdAt.toLocaleDateString()}</Text>

      <TouchableOpacity style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.background, 
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    color: COLORS.text,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
    color: COLORS.text,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    color: COLORS.text,
  },
  button: {
    marginTop: 30,
    backgroundColor: COLORS.primary, 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});