import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export const AccelerometerSensor = () => {
  // x ,y ,z
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState<any>(null);

  const subscribe = () => {
    Accelerometer.setUpdateInterval(1000);
    const sub = Accelerometer.addListener((measureData) => {
      setData(measureData);
    });
    setSubscription(sub);
  };

  const unsubscribe = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  useEffect(() => {
    subscribe();

    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Text>{data.x}</Text>
      <Text>{data.y}</Text>
      <Text>{data.z}</Text>
    </View>
  );
};
