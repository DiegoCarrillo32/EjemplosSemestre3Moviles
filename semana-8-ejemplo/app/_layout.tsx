import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "API Rest Examples" }} />
      <Stack.Screen name="fetch-example" />
      <Stack.Screen name="axios-example" />
    </Stack>
  );
}
