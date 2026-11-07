import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { useAppSelector } from "../store/hooks";

export default function FiretoreImageDemo() {

    const user = useAppSelector((s) => s.auth.user)
    const [foto, setFoto] = useState<string | null>(null)

    const guardarFoto = async ()  => {
        if (!user) return Alert.alert("Error", "Inicia sesion primero")

             const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect:[1,1],
                quality:0.2,
                base64: true
            })
            if (!result.canceled && result.assets[0].base64) {
                const base64String = `data:image/jpeg;base64,${result.assets[0].base64}`


                await setDoc(
                    doc(db, "users", user.uid),
                    {fotoPerfil:base64String},
                    {merge: true}
                )

                setFoto(base64String);
                console.log("Foto guardada en Firestore")

            }
    }

        const leerFoto = async () => {
            if (!user) return

            const docSnap = await getDoc(doc(db, "users", user.uid))

            if (docSnap.exists() && docSnap.data().fotoPerfil) {
                setFoto(docSnap.data().fotoPerfil) 
                console.log("Foto leida desde Firestore")
            } else {
                Alert.alert("Aviso", "No hay foto guardada")
            }
        }    
        return (
    <View style={styles.container}>
      {/* Botón para elegir foto y guardarla en Firestore */}
      <TouchableOpacity style={styles.button} onPress={guardarFoto}>
        <Text style={styles.buttonText}>Guardar foto en Firestore</Text>
      </TouchableOpacity>

      {/* Botón para leer la foto desde Firestore */}
      <TouchableOpacity style={styles.button} onPress={leerFoto}>
        <Text style={styles.buttonText}>Leer foto desde Firestore</Text>
      </TouchableOpacity>

      {/* Si hay foto en el estado, la mostramos */}
      {foto && <Image source={{ uri: foto }} style={styles.avatar} />}
    </View>
  );

}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: 'whitesmoke' },
  button: { padding: 15, backgroundColor: 'mediumslateblue', borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  avatar: { width: 120, height: 120, borderRadius: 60, alignSelf: 'center', marginTop: 20 },
});