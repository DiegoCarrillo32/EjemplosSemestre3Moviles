import { ActivityIndicator, Button, Text, View } from "react-native";
import {
  useForegroundPermissions,
  PermissionStatus,
  getCurrentPositionAsync,
  LocationObject,
} from "expo-location";
import { useState } from "react";

export const LocationDemo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [permission, requestPermission] = useForegroundPermissions();

  const getLocation = async () => {
    setIsLoading(true);
    try {
      let status = permission?.status;
      if (status !== PermissionStatus.GRANTED) {
        ({ status } = await requestPermission());
      }
      if (status !== PermissionStatus.GRANTED) {
        // mostrar error
        setIsLoading(false);
        return;
      }

      let currentLocation = await getCurrentPositionAsync();
      setLocation(currentLocation);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!permission) {
    return (
      <View>
        <Text>Permission not granted</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Modulo de GPS</Text>

      <Button
        title={isLoading ? "Buscando" : "Obtener"}
        onPress={getLocation}
        disabled={isLoading}
      />
      {isLoading && <ActivityIndicator size={"large"} />}
      {location && (
        <View>
          <Text>Coordenadas:</Text>
          <Text>Latitud: {location.coords.latitude}</Text>
          <Text>Longitud: {location.coords.longitude}</Text>
          <Text>Precisión: {location.coords.accuracy}</Text>
        </View>
      )}
    </View>
  );
};
