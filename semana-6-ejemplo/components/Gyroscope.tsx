import { Gyroscope } from "expo-sensors";
import { useEffect, useState } from "react";
import { NativeEventSubscription, Text, View } from "react-native";

export const GyroSensor = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subs, setSubs] = useState<NativeEventSubscription | null>(null);

  const subscribe = () => {
    Gyroscope.setUpdateInterval(500);
    setSubs(
      Gyroscope.addListener((gsData) => {
        setData(gsData);
      }),
    );
  };

  const unsubscribe = () => {
    subs && subs.remove();
    setSubs(null);
  };

  useEffect(() => {
    subscribe();

    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Text>x: {data.x}</Text>
      <Text>y: {data.y}</Text>
      <Text>z: {data.z}</Text>
    </View>
  );
};
