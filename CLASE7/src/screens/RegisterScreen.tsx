
import { useState } from 'react';
import {
  Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput,
  TouchableOpacity, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { AuthStackParamList } from '../navigation/AuthStack';
import { COLORS } from '../constants/theme';

type RegisterNav = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterNav>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Error', 'Completá todos los campos');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    try {
      setLoading(true);
      // Igual que en Login: onAuthStateChanged detecta el user y navega solo.
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (e: any) {
      Alert.alert('Error al registrar', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail}
        autoCapitalize="none" keyboardType="email-address" placeholder="tu@email.com" />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword}
        secureTextEntry placeholder="mínimo 6 caracteres" />

      <Text style={styles.label}>Repetir contraseña</Text>
      <TextInput style={styles.input} value={confirm} onChangeText={setConfirm}
        secureTextEntry placeholder="••••••••" />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Creando...' : 'Crear cuenta'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Ya tengo cuenta — Iniciar sesión</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: COLORS.background },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 6, color: COLORS.text },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 12, backgroundColor: COLORS.card },
  button: { marginTop: 24, padding: 15, backgroundColor: COLORS.primary, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  link: { marginTop: 16, textAlign: 'center', color: COLORS.primary },
});