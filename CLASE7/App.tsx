
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { store } from './src/store/store';
import { auth } from './src/config/firebase';
import { setUser } from './src/store/slices/authSlice';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  useEffect(() => {
    // Listener global de sesión.
    // - Se dispara al arrancar la app (recupera sesión persistida).
    // - Se dispara al hacer login (user con uid).
    // - Se dispara al hacer logout (user null).
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch(setUser({ uid: user.uid, email: user.email }));
      } else {
        store.dispatch(setUser(null));
      }
    });

    //  Cleanup obligatorio: si no, el listener queda vivo tras el unmount
    // y genera memory leaks (mencionado en el txt).
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}