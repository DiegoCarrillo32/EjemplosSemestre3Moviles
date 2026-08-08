import { Tabs } from "expo-router";
import { Coffee, Newspaper } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="brews"
        options={{
          tabBarLabel: "Brews",
          headerShown: false,
          tabBarIcon: () => <Coffee />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarIcon: () => <Newspaper />,
        }}
      />
    </Tabs>
  );
}
