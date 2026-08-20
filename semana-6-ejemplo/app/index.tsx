import { AccelerometerSensor } from "@/components/Accelerometer";
import { BarometerSensor } from "@/components/Barometer";
import { GyroSensor } from "@/components/Gyroscope";
import { HapticsDemo } from "@/components/Haptics";
import { MapDemo } from "@/components/MapDemo";
import { PedometerSensor } from "@/components/Pedometer";
import { Pedometer } from "expo-sensors";

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
      {/* <MapDemo /> */}
      {/* <PedometerSensor /> */}
      {/* <GyroSensor /> */}
      {/* <BarometerSensor /> */}
    </View>
  );
}
