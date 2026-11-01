import { useState } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ScrollView,} from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase'; //Apunta a la coleccion task
import { useAppSelector } from '../store/hooks';
import { COLORS } from '../constants/theme';

export default function FirebaseDemoScreen() {
  const user = useAppSelector((s) => s.auth.user);
  const [resultado, setResultado] = useState<string>('');

  const leerTareas = async () => {
    // 1) Verificamos que haya usuario logueado
    if (!user) {
      console.log(' No hay usuario logueado');
      setResultado(' No hay usuario logueado');
      return;
    }
    console.log(' Leyendo tareas del usuario:', user.uid);
    try {
      // 2) Armamos la consulta: colección "tasks" donde userId == user.uid
      //    where(...) es el filtro de Firestore.
      const q = query(
        collection(db, 'tasks'),
        where('userId', '==', user.uid)
      );
      // 3) getDocs ejecuta la consulta UNA sola vez (no es listener).
      //    Devuelve un snapshot con todos los documentos que matchean.
      const snapshot = await getDocs(q);
      // 4) Recorremos los documentos y los imprimimos en consola
      console.log(`Se encontraron ${snapshot.size} tareas:`);

      const lineas: string[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        // Mostramos el id del documento + sus campos
        console.log('— Documento ID:', doc.id);
        console.log('  Título:      ', data.title);
        console.log('  Descripción: ', data.description);
        console.log('  Categoría:   ', data.category);
        console.log('  Completada:  ', data.completed);
        console.log('  userId:      ', data.userId);
        console.log('');

        lineas.push(
          `• ${data.title} — ${data.completed ? 'Completado' : 'Espere'} (${doc.id})`
        );
      });

      if (snapshot.empty) {
        setResultado(' No hay tareas para este usuario');
      } else {
        setResultado(lineas.join('\n'));
      }
    } catch (error: any) {
      // Errores típicos: reglas de Firestore, red, permisos
      console.error(' Error al leer Firestore:', error);
      setResultado(' Error: ' + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Demo: leer Firestore</Text>
      <Text style={styles.subtitle}>
        Tocá el botón y mirá la consola de Expo. También verás el resultado acá.
      </Text>
      <Text style={styles.label}>Usuario logueado:</Text>
      <Text style={styles.mono}>{user?.email ?? '— (nadie logueado) —'}</Text>
      <Text style={styles.label}>UID:</Text>
      <Text style={styles.mono}>{user?.uid ?? '—'}</Text>
      <TouchableOpacity style={styles.button} onPress={leerTareas}>
        <Text style={styles.buttonText}>Leer tareas de Firestore</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Resultado:</Text>
      <Text style={styles.result}>{resultado || '(tocá el botón)'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: COLORS.background },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.text, marginBottom: 6 },
  subtitle: { color: COLORS.textLight, marginBottom: 20 },
  label: { fontWeight: 'bold', marginTop: 12, color: COLORS.text },
  mono: { fontFamily: 'monospace', color: COLORS.text, marginTop: 2 },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  result: {
    marginTop: 8,
    padding: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    fontFamily: 'monospace',
    color: COLORS.text,
    minHeight: 60,
  },
});