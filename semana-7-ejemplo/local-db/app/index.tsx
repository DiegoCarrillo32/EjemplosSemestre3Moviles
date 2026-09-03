import { db } from "@/db/client";
import { todos } from "@/db/schema";
import { useTodos } from "@/hooks/useTodos";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const USERNAME_KEY = "username";

export default function Index() {
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("usuario");
  const { data } = useLiveQuery(db.select().from(todos));
  const { addTodo, toggleTodo, deleteTodo } = useTodos();

  const saveUsername = async (val: string) => {
    setUsername(val);
    await AsyncStorage.setItem(USERNAME_KEY, val);
  };

  const clearUsername = async () => {
    setUsername("usuario");
    await AsyncStorage.removeItem(USERNAME_KEY);
  };

  useEffect(() => {
    AsyncStorage.getItem(USERNAME_KEY).then((val) => {
      if (val) {
        setUsername(val);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello {username}!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Que quieres recordar?"
        />
        <Button title="Add" onPress={() => addTodo(title)} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={saveUsername}
          placeholder="Cual es tu nombre?"
        />
        <Button title="Clear" onPress={clearUsername} />
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              style={styles.todoTextContainer}
              onPress={() => toggleTodo(item.id, item.done)}
            >
              <Text style={[styles.todoText, item.done && styles.todoDone]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <Button
              title="Delete"
              color={"red"}
              onPress={() => deleteTodo(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  inputContainer: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  todoTextContainer: { flex: 1 },
  todoText: { fontSize: 18 },
  todoDone: { textDecorationLine: "line-through", color: "#888" },
});
