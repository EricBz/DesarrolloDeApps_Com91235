import { useState } from 'react';
import {Alert,KeyboardAvoidingView,Platform,StyleSheet,Text,TextInput,TouchableOpacity,View,} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TasksStackParamList } from '../navigation/TasksStack';
import { COLORS } from '../constants/theme';

type TaskFormNavProp = NativeStackNavigationProp<TasksStackParamList, 'TaskForm'>;

export default function TaskForm() {
  const navigation = useNavigation<TaskFormNavProp>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Trabajo');
  const [touchedTitle, setTouchedTitle] = useState(false);
  const [touchedDescription, setTouchedDescription] = useState(false);

  const handleAddTask = () => {
    setTouchedTitle(true);
    setTouchedDescription(true);

    if (title.trim().length < 5 || description.trim().length < 10) {
      return;
    }

    const task = {
      title: title.trim(),
      description: description.trim(),
      category,
      createdAt: new Date(),
    };
    console.log('Tarea creada:', task);
    Alert.alert('Éxito', 'Tarea capturada localmente');

    // Limpiar formulario
    setTitle('');
    setDescription('');
    setCategory('Trabajo');
    setTouchedTitle(false);
    setTouchedDescription(false);

    // Navegación programática de vuelta a la lista
    navigation.navigate('TaskList');
  };

  const titleError = touchedTitle && title.trim().length < 5;
  const descriptionError = touchedDescription && description.trim().length < 10;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Nueva tarea</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={[styles.input, titleError && styles.errorInput]}
        placeholder="Título de la tarea"
        value={title}
        onChangeText={setTitle}
        onBlur={() => setTouchedTitle(true)}
        autoCapitalize="sentences"
        returnKeyType="next"
      />
      {titleError && (
        <Text style={styles.error}>
          El título debe tener al menos 5 caracteres.
        </Text>
      )}

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[
          styles.input,
          styles.description,
          descriptionError && styles.errorInput,
        ]}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        onBlur={() => setTouchedDescription(true)}
        autoCapitalize="sentences"
        multiline
      />
      {descriptionError && (
        <Text style={styles.error}>
          La descripción debe tener al menos 10 caracteres.
        </Text>
      )}

      <Text style={styles.label}>Categoría</Text>
      <View style={styles.categories}>
        {['Trabajo', 'Estudio', 'Personal'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.category,
              category === item && styles.selectedCategory,
            ]}
            onPress={() => setCategory(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 12,
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: COLORS.card,
  },
  description: {
    height: 100,
  },
  errorInput: {
    borderColor: COLORS.danger,
  },
  error: {
    color: COLORS.danger,
    fontSize: 13,
    marginTop: 4,
  },
  categories: {
    flexDirection: 'row',
    gap: 8,
  },
  category: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.card,
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
  },
  button: {
    marginTop: 25,
    padding: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});