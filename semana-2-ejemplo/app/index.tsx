import { useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

export default function Index() {
  const [Counter, setCounter] = useState<number>(100);

  const handlePress = (increase: boolean, amount: number) => {
    if (increase) {
      setCounter(Counter + amount);
    } else {
      setCounter(Counter - amount);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contador: {Counter} </Text>
      <Pressable
        onPress={() => handlePress(false, 1)}
        onLongPress={() => handlePress(false, 10)}
        delayLongPress={5000}
        style={(params) => [
          styles.button,
          styles.buttonLeft,
          params.pressed
            ? {
                backgroundColor: "#9280e6",
              }
            : null,
        ]}
      >
        <Text style={styles.buttonText}>-1</Text>
      </Pressable>

      <Pressable
        onPress={() => handlePress(true, 1)}
        onLongPress={() => handlePress(true, 10)}
        style={(params) => [
          styles.button,
          styles.buttonRight,
          params.pressed
            ? {
                backgroundColor: "#9280e6",
              }
            : null,
        ]}
      >
        <Text style={styles.buttonText}>+1</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  text: {
    fontSize: 50,
    color: "#314CB6",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  button: {
    position: "absolute",
    backgroundColor: "#6461A0",
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    bottom: 0,
    // sombra en ios
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    //sombra en android
    elevation: 5,
  },
  buttonLeft: {
    left: 0,
  },
  buttonRight: {
    right: 0,
  },
});
