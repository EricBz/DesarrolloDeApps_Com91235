import { collection,addDoc,updateDoc,deleteDoc,doc,query,where,onSnapshot,serverTimestamp,Timestamp,} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Task, TaskFilter } from '../constants/types';

const TASKS_COLLECTION = 'tasks';

//  Crear tarea en Firestore
export const createTaskInFirestore = async (data: {
  title: string;
  description: string;
  category: string;
  userId: string;
}) => {
  await addDoc(collection(db, TASKS_COLLECTION), {
    ...data,
    completed: false,
    // serverTimestamp() usa el reloj de Firestore, no el del celular.
    // Evita problemas de hora mal configurada o zonas horarias.
    createdAt: serverTimestamp(),
  });
};

//  Toggle: actualiza el campo completed del documento
export const toggleTaskInFirestore = async (id: string, completed: boolean) => {
  await updateDoc(doc(db, TASKS_COLLECTION, id), { completed });
};

//  Borrar
export const deleteTaskInFirestore = async (id: string) => {
  await deleteDoc(doc(db, TASKS_COLLECTION, id));
};

//  Suscripción en tiempo real filtrada por userId.
// Devuelve la función unsubscribe para limpiar en el useEffect.
export const subscribeToUserTasks = (
  userId: string,
  callback: (tasks: Task[]) => void
) => {
  const q = query(
    collection(db, TASKS_COLLECTION),
    where('userId', '==', userId)
  );

  // onSnapshot es un listener: se ejecuta cada vez que Firestore cambia.
  return onSnapshot(q, (snapshot) => {
    const tasks: Task[] = snapshot.docs.map((d) => {
      const data = d.data();
      //  Convertimos el Timestamp de Firestore a ISO string
      // para que sea serializable en Redux y compatible con tu tipo Task.
      const createdAt =
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : new Date().toISOString();

      return {
        id: d.id,
        title: data.title,
        description: data.description,
        category: data.category,
        createdAt,
        completed: data.completed ?? false,
      };
    });

    callback(tasks);
  });
};