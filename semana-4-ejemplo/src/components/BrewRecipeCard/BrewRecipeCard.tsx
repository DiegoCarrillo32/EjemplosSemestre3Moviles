import { useTheme } from "@/src/contexts/ThemeContext";
import { Image, Platform, Text, useWindowDimensions, View } from "react-native";
import { styles } from "./BrewRecipeCard.styles";

interface BrewRecipeCardProps {
  title: string;
  description: string;
  image: string;
  author?: string;
}

export const BrewRecipeCard = ({
  title,
  description,
  image,
  author,
}: BrewRecipeCardProps) => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const dynamicStyles = {
    card: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: Platform.OS === "android" ? 12 : 32,
    },
    title: {
      color: colors.text,
    },
    description: {
      color: colors.text,
      opacity: 0.8,
    },
    author: {
      color: colors.primary,
    },
  };

  return (
    <View
      style={[
        { marginVertical: 12, marginHorizontal: 16, overflow: "hidden" },
        dynamicStyles.card,
      ]}
    >
      <Image
        source={{ uri: image }}
        style={[styles.image, { height: width * 0.5 }]}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={[styles.title, dynamicStyles.title]}>{title}</Text>
        <Text style={[styles.author, dynamicStyles.author]}>
          {author ? author : "Anonymous"}
        </Text>
        <Text style={[styles.description, dynamicStyles.description]}>
          {description}
        </Text>
      </View>
    </View>
  );
};
