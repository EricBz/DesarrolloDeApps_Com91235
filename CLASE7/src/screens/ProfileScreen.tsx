
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { ProfileCard } from '../components/PofileCard';
import { useAppSelector } from '../store/hooks';
import { COLORS } from '../constants/theme';

export default function ProfileScreen() {
  const user = useAppSelector((s) => s.auth.user);

  const handleLogout = async () => {
    //  No dispatch: onAuthStateChanged detecta el null y RootNavigator
    // cambia al AuthStack automáticamente.
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      {user?.email && (
        <Text style={styles.email}>Logueado como: {user.email}</Text>
      )}

      <ProfileCard name="Ana Gómez" role="Desarrolladora Mobile" image="https://i.pravatar.cc/150?img=47" />
      <ProfileCard name="Carlos Ruiz" role="Diseñador UI" image="https://i.pravatar.cc/150?img=12" />
      <ProfileCard name="Lucía Fernández" role="Product Manager" image="https://i.pravatar.cc/150?img=32" />

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: COLORS.text, marginBottom: 10 },
  email: { color: COLORS.textLight, marginBottom: 20 },
  logoutBtn: { marginTop: 20, padding: 15, backgroundColor: COLORS.danger, borderRadius: 8, alignItems: 'center' },
  logoutText: { color: 'white', fontWeight: 'bold' },
});