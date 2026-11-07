// src/screens/ProfileScreen.tsx
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { ProfileCard } from '../components/PofileCard';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setUserAvatar } from '../store/slices/authSlice';
import { saveUserAvatar } from '../services/userService';
import { COLORS } from '../constants/theme';

export default function ProfileScreen() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    // 1. Pedir permisos (necesario en dispositivos reales)
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería para cambiar la foto.');
      return;
    }

    // 2. Abrir la galería
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Cuadrado para que quede bien el círculo
      quality: 0.5,   // Calidad media para no guardar un string Base64 gigante
      base64: true,   // ¡Clave! Esto nos da la imagen como string para Firestore
    });

    // 3. Manejar cancelación
    if (!result.canceled && result.assets[0].base64 && user) {
      setUploading(true);
      try {
        const base64String = `data:image/jpeg;base64,${result.assets[0].base64}`;
        
        // Guardar en Firestore
        await saveUserAvatar(user.uid, base64String);
        
        // Actualizar Redux para que la UI cambie al instante
        dispatch(setUserAvatar(base64String));
        
        Alert.alert('Éxito', 'Foto de perfil actualizada');
      } catch (error: any) {
        Alert.alert('Error', 'No se pudo guardar la foto: ' + error.message);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      {user?.email && (
        <Text style={styles.email}>Logueado como: {user.email}</Text>
      )}

      {/* Avatar del usuario logueado */}
      <View style={styles.avatarContainer}>
        {user?.avatarBase64 ? (
          <Image source={{ uri: user.avatarBase64 }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>
              {user?.email?.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>
        )}
        
        <TouchableOpacity style={styles.changePhotoBtn} onPress={pickImage} disabled={uploading}>
          {uploading ? (
            <ActivityIndicator color={COLORS.primary} />
          ) : (
            <Text style={styles.changePhotoText}>Cambiar foto</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Lista de contactos de ejemplo (tus ProfileCards) 
      <ProfileCard name="Ana Gómez" role="Desarrolladora Mobile" image="https://i.pravatar.cc/150?img=47" />
      <ProfileCard name="Carlos Ruiz" role="Diseñador UI" image="https://i.pravatar.cc/150?img=12" />
      <ProfileCard name="Lucía Fernández" role="Product Manager" image="https://i.pravatar.cc/150?img=32" />
*/}
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
  avatarContainer: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: COLORS.primary },
  avatarPlaceholder: { backgroundColor: COLORS.border, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 40, fontWeight: 'bold', color: COLORS.textLight },
  changePhotoBtn: { marginTop: 12, padding: 10 },
  changePhotoText: { color: COLORS.primary, fontWeight: 'bold' },
  logoutBtn: { marginTop: 20, padding: 15, backgroundColor: COLORS.danger, borderRadius: 8, alignItems: 'center' },
  logoutText: { color: 'white', fontWeight: 'bold' },
});