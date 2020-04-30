import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import sessionService from "../service/sessionService";

const RegisterPush = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    alert(`No notification permissions!: ${status}`);
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();
  sessionService.setStorageData("pushToken", token);
};

export default RegisterPush;
