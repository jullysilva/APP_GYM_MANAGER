import * as Notifications from "expo-notifications";

export async function getNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}
