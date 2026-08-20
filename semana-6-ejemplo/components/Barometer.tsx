import { Barometer, BarometerMeasurement } from "expo-sensors";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export const BarometerSensor = () => {
  const [data, setData] = useState<BarometerMeasurement>();
  const subscribe = () => {
    Barometer.addListener((barometerData) => {
      setData(barometerData);
    });
  };

  useEffect(() => {
    subscribe();
  }, []);

  return (
    <View>
      <Text>Pressure: {data?.pressure}</Text>
      <Text>Relative Altitude: {data?.relativeAltitude}</Text>
    </View>
  );
};
