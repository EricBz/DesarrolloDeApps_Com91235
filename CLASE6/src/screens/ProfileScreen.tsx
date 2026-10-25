// src/screens/ProfileScreen.tsx
import { View, Text, StyleSheet } from 'react-native';
import { ProfileCard } from '../components/PofileCard';
import { COLORS } from '../constants/theme';

export default function ProfileScreen() {   // ✅ acá va "default"
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <ProfileCard
        name="Ana Gómez"
        role="Desarrolladora Mobile"
        image="https://i.pravatar.cc/150?img=47"
      />
      <ProfileCard
        name="Carlos Ruiz"
        role="Diseñador UI"
        image="https://i.pravatar.cc/150?img=12"
      />
      <ProfileCard
        name="Lucía Fernández"
        role="Product Manager"
        image="https://i.pravatar.cc/150?img=32"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
});