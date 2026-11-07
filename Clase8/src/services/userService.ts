import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Guardamos la foto como string Base64 dentro del documento del usuario
export const saveUserAvatar = async (uid: string, base64Image: string) => {
  // Usamos setDoc con merge: true para no borrar otros datos que pueda tener el usuario
  await setDoc(doc(db, 'users', uid), { avatarBase64: base64Image }, { merge: true });
};

// Leemos la foto guardada
export const getUserAvatar = async (uid: string): Promise<string | null> => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().avatarBase64 || null;
  }
  return null;
};