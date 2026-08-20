import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
// expo-location

export const MapDemo = () => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37,
        longitude: -122,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker
        draggable
        title="Restaurant"
        description="Fusion Food"
        coordinate={{
          latitude: 37,
          longitude: -122,
        }}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 300,
    marginHorizontal: 10,
  },
});
