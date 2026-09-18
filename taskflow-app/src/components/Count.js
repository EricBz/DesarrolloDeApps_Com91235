import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

 export const Count = () => {
    const [contador, setContador] = useState(0);
    const decrementar = () => {
        if (contador > 0) {
            setContador(contador - 1)
        }
    }
    return(
        <View style={style.container}>
            <Text style={style.title}>TaskFlow</Text>
            <Text>Contador de tareas</Text>
            <Text style={style.counter}>{contador}</Text>
            <View style={style.buttons}>
                <Pressable style={style.button} onPress={decrementar}>
                <Text>-</Text>
                </Pressable>           
            <Pressable style={style.button} onPress={() => setContador(contador+1)}>
                <Text>+</Text>
            </Pressable>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 40,
  },
  counter: {
    fontSize: 50,
    fontWeight: "bold",
    marginVertical: 10,
  },
  buttons: {
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  marginBottom: 30,
},
button: {
  width: 60,
  height: 50,
  backgroundColor: "#222",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 8,
  marginHorizontal: 10,
},
  buttonText: {
    color: "white",
    fontSize: 28,
  },
})