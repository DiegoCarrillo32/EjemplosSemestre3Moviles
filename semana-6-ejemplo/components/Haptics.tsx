import * as Haptics from "expo-haptics";
import { Button, Text, View } from "react-native";

export const HapticsDemo = () => {
  return (
    <View>
      <Text>Notification Feedback</Text>
      <Button
        title="Success"
        onPress={() =>
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        }
      />
      <Button
        title="Error"
        onPress={() =>
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        }
      />
      <Button
        title="Warning"
        onPress={() =>
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
        }
      />

      <Text>Impact Feedback</Text>
      <Button
        title="Light"
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      />
      <Button
        title="Medium"
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
      />
      <Button
        title="Heavy"
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
      />
    </View>
  );
};
