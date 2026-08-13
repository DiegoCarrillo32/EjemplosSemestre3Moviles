import { CameraDemo } from "@/components/CameraDemo";
import { LocationDemo } from "@/components/LocationDemo";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <LocationDemo /> */}
      <CameraDemo />
    </View>
  );
}
