import Apis from "constants/AppApis";
import { Platform } from "react-native";
import { CommonApiHeader } from "AppUtils/Common";

const UploadScreenshot = (userid, userToken, screenshot) =>
  new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("image", {
      name: screenshot.filename,
      type: "image/jpeg",
      uri:
        Platform.OS === "android"
          ? screenshot.uri
          : screenshot.uri.replace("file://", "")
    });
    fetch(Apis.uploadScreenshot + userid, {
      method: "POST",
      headers: {
        ...CommonApiHeader(userToken),
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
      .then(async response => {
        const responseJson = await response.json();
        if (response.status == 201) resolve(responseJson.Image);
        else reject(responseJson.error);
      })
      .catch(error => {
        reject(error);
      });
  });

const UploadSupport = (description, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.uploadScreenshot, {
      method: "POST",
      headers: CommonApiHeader(userToken),
      body: JSON.stringify({ description })
    })
      .then(async response => {
        const responseJson = await response.json();
        if (response.status === 201) resolve();
        else reject(responseJson.error);
      })
      .catch(error => {
        console.log(error);
      });
  });

//Update user
const updateUserInfo = (newUserInfo, userToken) =>
  new Promise((resolve, reject) => {
    const { userid, userInfo } = newUserInfo;
    fetch(Apis.updateUserInfo + userid, {
      method: "PUT",
      headers: CommonApiHeader(userToken),
      body: JSON.stringify({ user: { ...userInfo } })
    })
      .then(async response => {
        const responseJson = await response.json();
        if (response.status === 200) resolve(responseJson.user);
        else reject(responseJson.error);
      })
      .catch(error => {
        reject(error);
      });
  });


//store user push token
const storeUserPushToken = (tokenInfo, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.pushTokenApi, {
      method: "POST",
      headers: CommonApiHeader(userToken),
      body: JSON.stringify({ token: tokenInfo.data })
    })
      .then(async response => {
        const responseJson = await response.json();
        if (response.status === 201) resolve(responseJson);
        else reject(responseJson.error);
      })
      .catch(error => {
        reject(error);
      });
  });

export default {
  UploadScreenshot,
  UploadSupport,
  updateUserInfo,
  storeUserPushToken
};
