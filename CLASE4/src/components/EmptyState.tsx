import { Text, StyleSheet, View } from "react-native"

export default function EmptyState() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>No tenes tareas pendientes!</Text>
            <Text> Empieza por crear una tarea.</Text>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});