// src/components/TaskDetail.tsx
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Task } from '../constants/types';
import { COLORS } from '../constants/theme';

// Agregamos onToggle y onDelete a las props
type Props = {
  task: Task;
  onBack: () => void;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TaskDetail({ task, onBack, onToggle, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>

      {/* Mostramos el estado actual (completada / pendiente) */}
      <Text style={styles.label}>Estado</Text>
      <Text style={[styles.text, task.completed ? styles.done : styles.pending]}>
        {task.completed ? ' Completada' : ' Pendiente'}
      </Text>

      <Text style={styles.label}>Descripción</Text>
      <Text style={styles.text}>{task.description}</Text>

      <Text style={styles.label}>Categoría</Text>
      <Text style={styles.text}>{task.category}</Text>

      <Text style={styles.label}>Fecha</Text>
      <Text style={styles.text}>{new Date(task.createdAt).toLocaleDateString()}</Text>

      {/*  Botón toggle: cambia el estado en el store */}
      <TouchableOpacity style={styles.toggleButton} onPress={onToggle}>
        <Text style={styles.buttonText}>
          {task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
        </Text>
      </TouchableOpacity>

      {/*  Botón eliminar */}
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.buttonText}>Eliminar tarea</Text>
      </TouchableOpacity>

      {/* Botón volver (se mantiene) */}
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
  // ✅ Estilos para marcar visualmente el estado
  done: { color: COLORS.success, fontWeight: 'bold' },
  pending: { color: COLORS.textLight, fontWeight: 'bold' },

  // ✅ Botón toggle (verde)
  toggleButton: {
    marginTop: 30,
    backgroundColor: COLORS.success,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  // ✅ Botón delete (rojo)
  deleteButton: {
    marginTop: 10,
    backgroundColor: COLORS.danger,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  // Botón volver (se mantiene, ahora con color primary)
  button: {
    marginTop: 10,
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