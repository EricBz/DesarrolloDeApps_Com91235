import { useState } from 'react';
import {Alert,KeyboardAvoidingView,StyleSheet,Text,TextInput,TouchableOpacity,View} from 'react-native';
//KEYBOARD= Evita que el teclado del celular tape los campos de texto
export default function TaskForm() {
  // Estado del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Trabajo');
  // Para mostrar errores después de interactuar
  const [touchedTitle, setTouchedTitle] = useState(false);
  const [touchedDescription, setTouchedDescription] = useState(false);

  const handleAddTask = () => {
    // Forzamos a que ambos campos cuenten como "tocados" para activar los errores visuales si están vacíos
    setTouchedTitle(true); 
    setTouchedDescription(true);
    // Validaciones
    if (title.trim().length < 5 || description.trim().length < 10) {
      return; //detiene la funcion, da un undefined
    }

    const task = {
      title: title.trim(), //elimina espacios en blanco.
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
  };
// titleError será true SOLO si el usuario ya tocó el título Y ADEMÁS el texto tiene menos de 5 letras
  const titleError = touchedTitle && title.trim().length < 5;
// descriptionError será true SOLO si el usuario ya tocó la descripción Y ADEMÁS tiene menos de 10 letras
  const descriptionError = touchedDescription && description.trim().length < 10;
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Nueva tarea</Text>
      {/* Título */}
      <Text style={styles.label}>Título</Text>

      <TextInput // Aplica el estilo base, y si hay error (titleError es true), le suma el borde rojo
        style={[styles.input,titleError && styles.errorInput,]}
        placeholder="Título de la tarea"
        value={title}
        onChangeText={setTitle} //Captura el cambio y envia
        onBlur={() => setTouchedTitle(true)} // Cuando el usuario sale del input, marca que ya lo tocó
        autoCapitalize="sentences" // Pone la primera letra de cada oración en mayúscula
        returnKeyType="next" // Cambia el botón del teclado del celular por uno que dice "Siguiente"
      />
    {/* Si titleError es true, dibuja en la pantalla el siguiente texto de error */}
      {titleError && (//le avisan a react que es un bloque de codigo.
        <Text style={styles.error}>
          El título debe tener al menos 5 caracteres.
        </Text>
      )}

      {/* Descripción */}
      <Text style={styles.label}>Descripción</Text>

      <TextInput //Para añadir estilos uso un array
        style={[styles.input,styles.description,descriptionError && styles.errorInput,]}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        onBlur={() => setTouchedDescription(true)}
        autoCapitalize="sentences"
        multiline // Permite que el texto salte de línea y sea un campo alto
      />

      {descriptionError && (
        <Text style={styles.error}>
          La descripción debe tener al menos 10 caracteres.
        </Text>
      )}

      {/* Categoría */}
      <Text style={styles.label}>Categoría</Text>

      <View style={styles.categories}>
        {['Trabajo', 'Estudio', 'Personal'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.category, 
              // Aplica el diseño de botón común, pero si coincide con la categoría seleccionada, aplica el estilo resaltado
              category === item && styles.selectedCategory,
            ]}
            onPress={() => setCategory(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Guardar */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddTask}
      >
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
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  description: {
    height: 100,
  },
  errorInput: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
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
    borderColor: 'gray',
    borderRadius: 8,
  },
  selectedCategory: {
    backgroundColor: 'lightblue',
  },
  button: {
    marginTop: 25,
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
