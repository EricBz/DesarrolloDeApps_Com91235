
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
//  initializeAuth + getReactNativePersistence son especiales para RN/Expo.
// getAuth() por sí solo NO persiste sesión en Expo Go.
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// (Configuración del proyecto → Tus apps → Web)
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

//  Idempotente: si ya hay una app inicializada (Fast Refresh), la reutilizamos.
// Sin esto, Expo tira "Firebase App named '[DEFAULT]' already exists".
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

//  initializeAuth con persistencia en AsyncStorage:
// permite que onAuthStateChanged recupere el usuario al reabrir la app.
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export default app;