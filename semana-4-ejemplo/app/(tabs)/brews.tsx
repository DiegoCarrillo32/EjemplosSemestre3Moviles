import { BrewRecipeCard } from "@/src/components/BrewRecipeCard/BrewRecipeCard";
import { MOCK_BREW_RECIPES } from "@/src/constants/mock";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BrewsView() {
  //VOLVEMOS A LAS 7:10 VOLVER A PONER LA GRABACIÓN
  return (
    <SafeAreaView>
      <FlatList
        data={MOCK_BREW_RECIPES}
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
    </SafeAreaView>
  );
}
