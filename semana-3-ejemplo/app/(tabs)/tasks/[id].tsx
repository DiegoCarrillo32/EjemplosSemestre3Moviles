import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const DetailedTaskView = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>This is the task id: {id}</Text>
    </View>
  );
};

export default DetailedTaskView;
