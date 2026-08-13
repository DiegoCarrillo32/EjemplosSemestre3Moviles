import { AudioDemo } from "@/components/AudioDemo";
import { CameraDemo } from "@/components/CameraDemo";
import { LocationDemo } from "@/components/LocationDemo";
import { View } from "react-native";

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
      {/* <CameraDemo /> */}
      <AudioDemo />
    </View>
  );
}
