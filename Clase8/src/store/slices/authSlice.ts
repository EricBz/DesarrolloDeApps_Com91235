import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthUser = {
  uid: string;
  email: string | null;
  avatarBase64?: string | null; // Nuevo campo opcional
};

type AuthState = {
  user: AuthUser | null;
  initializing: boolean;
};

const initialState: AuthState = {
  user: null,
  initializing: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      state.initializing = false;
    },
    // Nueva acción para actualizar solo la foto
    setUserAvatar: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.avatarBase64 = action.payload;
      }
    },
  },
});

export const { setUser, setUserAvatar } = authSlice.actions;
export default authSlice.reducer;