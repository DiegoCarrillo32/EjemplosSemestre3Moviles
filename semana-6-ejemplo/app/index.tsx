import { AccelerometerSensor } from "@/components/Accelerometer";
import { HapticsDemo } from "@/components/Haptics";
import { MapDemo } from "@/components/MapDemo";

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
      {/* <AccelerometerSensor /> */}
      {/* <HapticsDemo /> */}
      <MapDemo />
    </View>
  );
}
