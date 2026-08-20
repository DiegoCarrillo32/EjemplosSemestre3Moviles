import { useEffect, useState } from "react";
import { Pedometer } from "expo-sensors";
import { Text, View } from "react-native";
export const PedometerSensor = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [steps, setSteps] = useState(0);
  const [subs, setSubs] = useState<any>();

  const subscribe = async () => {
    const { granted } = await Pedometer.requestPermissionsAsync();
    if (!granted) {
      return;
    }

    const sub = Pedometer.watchStepCount((result) => {
      setSteps(result.steps);
    });
    setSubs(sub);
  };

  const unsubscribe = () => {
    subs && subs.remove();
    setSubs(null);
  };

  useEffect(() => {
    subscribe();

    return () => unsubscribe();
  }, []);

  //   useEffect(() => {
  //     Pedometer.isAvailableAsync().then((result) => setIsAvailable(result));
  //   }, []);

  return (
    <View>
      <Text>Podometro: {steps}</Text>
    </View>
  );
};
