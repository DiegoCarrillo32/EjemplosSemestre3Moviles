import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowList: true,
    shouldShowBanner: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const TabsLayout = () => {
  return (
    <SafeAreaProvider>
      <Tabs>
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerTitle: "Welcome Diego",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="tasks/index"
          options={{
            title: "Tasks",
          }}
        />
        <Tabs.Screen
          name="tasks/[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
};

export default TabsLayout;
