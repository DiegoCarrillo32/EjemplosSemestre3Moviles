import { Alert, Button, Text, View } from "react-native";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { useEffect } from "react";

const SOUND_URI = "https://www.soundjay.com/buttons_c2026/button-1.mp3";

export const AudioDemo = () => {
  const player = useAudioPlayer(SOUND_URI);
  const status = useAudioPlayerStatus(player);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  const recordingPlayer = useAudioPlayer(null);
  const recordingStatus = useAudioPlayerStatus(recordingPlayer);

  useEffect(() => {
    (async () => {
      const permission = await AudioModule.requestRecordingPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permiso denegado",
          "Se necesita acceso al microfono para grabar audio",
        );
        return;
      }
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  const playSound = () => {
    player.seekTo(0);
    player.play();
  };

  const startRecording = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const stopRecording = async () => {
    await audioRecorder.stop();
    if (audioRecorder.uri) {
      recordingPlayer.replace(audioRecorder.uri);
    }
  };

  const playRecording = () => {
    recordingPlayer.seekTo(0);
    recordingPlayer.play();
  };

  return (
    <View>
      <Text>Modulo de Audio</Text>
      <Button
        onPress={playSound}
        title={status.playing ? "Reproduciendo" : "Reproducir"}
        disabled={status.playing}
      />
      <Text>Modulo de grabación</Text>
      <Button
        onPress={startRecording}
        disabled={recorderState.isRecording}
        title={"Grabar"}
      />
      <Button
        onPress={stopRecording}
        disabled={!recorderState.isRecording}
        title={"Detener"}
      />

      <Button
        onPress={playRecording}
        disabled={!audioRecorder.uri || recordingPlayer.playing}
        title="Reproducir"
      />
    </View>
  );
};
