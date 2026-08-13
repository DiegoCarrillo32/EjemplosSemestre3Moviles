import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export const CameraDemo = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<"front" | "back">("front");
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const cameraRef = useRef<CameraView>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

  if (permission?.granted === false) {
    return (
      <View>
        <Text>Necesitamos el permiso para la cámara</Text>
        <Button title="Dar permiso" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Cambiar camara"
        onPress={() => {
          if (facing === "front") {
            setFacing("back");
          } else {
            setFacing("front");
          }
        }}
      />
      {photoUri ? (
        <View>
          <Image
            style={styles.previewImage}
            source={{
              uri: photoUri,
            }}
          />
          <Button title="Tomar otra foto" onPress={() => setPhotoUri(null)} />
        </View>
      ) : (
        <View style={styles.cameraWrapper}>
          <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
          <Button title="Capturar" onPress={takePicture} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
    width: "100%",
    padding: 10,
  },
  cameraWrapper: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
});
