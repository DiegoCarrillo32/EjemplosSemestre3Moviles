import { BrewRecipeCard } from "@/src/components/BrewRecipeCard/BrewRecipeCard";
import { MOCK_BREW_RECIPES } from "@/src/constants/mock";
import { useTheme } from "@/src/contexts/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileView() {
  const [isModalVisible, setModalVisible] = useState(false);

  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Brews, setBrews] = useState(MOCK_BREW_RECIPES.slice(0, 2));

  const { colors, toggleTheme, mode } = useTheme();

  const handleAddRecipe = () => {
    if (Title === "") return;

    const newRecipe = {
      id: Date.now().toString(),
      title: Title,
      author: "Diego Carrillo",
      description: Description,
      imageUrl:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    };

    setBrews([newRecipe, ...Brews]);
    setTitle("");
    setDescription("");
    setModalVisible(false);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar style={mode === "light" ? "dark" : "light"} />
      <View style={[styles.headerContainer, { gap: 10 }]}>
        <Button title="Add recipe" onPress={() => setModalVisible(true)} />
        <Button title="Toggle theme" onPress={() => toggleTheme()} />
      </View>

      <FlatList
        data={Brews}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BrewRecipeCard
            title={item.title}
            description={item.description}
            image={item.imageUrl}
          />
        )}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView style={styles.modalOverlay}>
          <View
            style={[
              styles.modalSurface,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
              },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Post a brew
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.text,
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                },
              ]}
              placeholder="Recipe title"
              placeholderTextColor={colors.primary}
              value={Title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[
                styles.input,
                {
                  color: colors.text,
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                },
              ]}
              placeholder="Recipe description"
              placeholderTextColor={colors.primary}
              value={Description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
            <View>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelBtn}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAddRecipe()}
                style={styles.submitBtn}
              >
                <Text>Publish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listPadding: {
    paddingBottom: 24,
  },

  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  infoBox: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  userBio: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.8,
  },
  addButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
    paddingHorizontal: 4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalSurface: {
    width: "100%",
    borderRadius: 20,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: { elevation: 10 },
    }),
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 12,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    height: 100,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  cancelBtnText: {
    fontSize: 15,
    opacity: 0.7,
  },
  submitBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
