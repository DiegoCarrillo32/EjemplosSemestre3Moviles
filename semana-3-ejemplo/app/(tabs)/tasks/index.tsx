import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Notification from "expo-notifications";

interface Task {
  id: string;
  text: string;
}

const TasksIndex = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Task[]>([
    {
      id: "A",
      text: "Prueba A",
    },
    {
      id: "B",
      text: "Prueba B",
    },
  ]);
  const router = useRouter();

  useEffect(() => {
    const requestPermissions = async () => {
      const { status: existingStatus } =
        await Notification.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== Notification.PermissionStatus.GRANTED) {
        const { status } = await Notification.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== Notification.PermissionStatus.GRANTED) {
        return;
      }
    };

    requestPermissions();
  }, []);

  return (
    <View>
      <TextInput
        placeholder="New Task"
        style={styles.input}
        value={task}
        onChangeText={setTask}
      />
      <Text>{task}</Text>
      <Pressable
        style={styles.addButton}
        onPress={async () => {
          await Notification.scheduleNotificationAsync({
            content: {
              title: "Task added",
              body: `Dont forget ${task} `,
            },
            trigger: null,
          });
          setTodos([...todos, { id: Date.now().toString(), text: task }]);
        }}
      >
        <Text>Add text</Text>
      </Pressable>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Pressable
            style={styles.listItem}
            onPress={() => {
              router.push({
                pathname: "/tasks/[id]",
                params: {
                  id: item.id,
                },
              });
            }}
          >
            <Text>{item.text}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default TasksIndex;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", padding: 20 },
  input: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EEE",
    margin: 10,
  },
  addButton: {
    backgroundColor: "#E3F2FD",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: { color: "#1E88E5", fontWeight: "bold", fontSize: 16 },
  listItem: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: { fontSize: 16, color: "#333" },
  deleteHint: { fontSize: 12, color: "#CCC" },

  // Modal Styles (Replacing Portal/Dialog)
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalSub: { color: "#666", marginBottom: 20 },
  modalButtons: { flexDirection: "row", gap: 15 },
  cancelBtn: { padding: 10, width: 100, alignItems: "center" },
  deleteBtn: {
    backgroundColor: "#FFEBEE",
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
  },
  deleteText: { color: "#D32F2F", fontWeight: "bold" },
  cancelText: { color: "#666" },
});
