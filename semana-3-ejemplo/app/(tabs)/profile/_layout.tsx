import { Drawer } from "expo-router/drawer";
const ProfileLayout = () => {
  return (
    <Drawer>
      <Drawer.Screen name="index" />
      <Drawer.Screen name="config" />
    </Drawer>
  );
};

export default ProfileLayout;
