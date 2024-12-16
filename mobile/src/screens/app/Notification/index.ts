import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export default function WelcomeNotification() {
  useEffect(() => {
    const sendWelcomeNotification = async () => {
      const notificationContent = {
        title: "Bem-vindo!",
        body: "Bem-vindo ao nosso aplicativo HIKE de treinamento. Esperamos que goste!",
      };

      const trigger = new Date(Date.now() + 10000);
      
      await Notifications.scheduleNotificationAsync({
        content: notificationContent,
        trigger,
      });
    };

    sendWelcomeNotification();

    return () => {};
  }, []);

  return null;
}
