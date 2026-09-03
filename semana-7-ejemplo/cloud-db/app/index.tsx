import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export const TODO_COLLECTION = "todos";
export interface Todos {
  id: string;
  title?: string;
  done?: boolean;
  description?: string;
}

export default function Index() {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [title, setTitle] = useState("");

  const addTodo = async () => {
    if (title.trim() === "") {
      Alert.alert("Error", "Empty text is not permitted");
      return;
    }
    const todo: Omit<Todos, "id"> = {
      title,
      done: false,
      description: "",
    };

    await addDoc(collection(db, TODO_COLLECTION), todo);
  };
  const toggleTodo = async (id: string, done: boolean) => {
    // todos/B5YcXFksIsItyatQurId
    await updateDoc(doc(db, TODO_COLLECTION, id), {
      done: !done,
      bug: "error",
    });
  };
  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, TODO_COLLECTION, id));
  };

  useEffect(() => {
    if (db) {
      const que = query(
        collection(db, TODO_COLLECTION),
        orderBy("done", "desc"),
      );

      const unsubscribe = onSnapshot(que, (snapshot) => {
        const loadedTodos: Todos[] = [];

        snapshot.forEach((document) => {
          // document.id; // B5YcXFksIsItyatQurId
          loadedTodos.push({
            id: document.id, //B5YcXFksIsItyatQurId
            ...document.data(),
          });
        });

        setTodos(loadedTodos);
      });
      return () => unsubscribe();
    }
  }, []);

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Button title="Add" onPress={addTodo} />

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text>
              {item.title} | {item.id} |{" "}
              {item.done ? "Completed" : "Not completed"}
            </Text>
            <View>
              <Button
                title={item.done ? "Desmarcar" : "Completar"}
                onPress={() => toggleTodo(item.id, item.done ?? true)}
              />
              <Button title="Delete" onPress={() => deleteTodo(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 5,
    borderRadius: 8,
  },
  noteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 5,
  },
  headre: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});
