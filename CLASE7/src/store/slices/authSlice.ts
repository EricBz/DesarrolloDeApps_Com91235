
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//  Guardamos solo lo mínimo necesario del usuario de Firebase.
type AuthUser = {
  uid: string;
  email: string | null;
};

type AuthState = {
  user: AuthUser | null;
  initializing: boolean; // true mientras onAuthStateChanged no respondió por primera vez
};

const initialState: AuthState = {
  user: null,
  //  Arranca en true para que RootNavigator muestre loading
  // y no parpadee el Login aunque haya sesión activa.
  initializing: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // onAuthStateChanged dispara esto: con user o con null.
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      state.initializing = false;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;