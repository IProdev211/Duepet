import * as Types from "../actions/actions";
import * as Actions from "../actions";
import { Alert } from "react-native";
import { put, takeLatest } from "redux-saga/effects";
import UserUtils from "./UserUtils";
import sessionService from "service/sessionService";

function* uploadScreenshot(actionData) {
  try {
    const { navigation } = actionData.payload;
    // const userData = yield sessionService.getStorageData("userData");
    // const { screenshot, description } = actionData.payload;
    // const uploadedSupportData = yield UserUtils.UploadSupport(
    //   description,
    //   userData.token
    // );
    // if (screenshot.filename) {
    //   const uploadedSupportImage = yield UserUtils.UploadScreenshot(
    //     userData.id,
    //     userData.token,
    //     screenshot
    //   );
    //   yield put(Actions.uploadScreenshotSuccessful(uploadedSupportImage));
    // } else {
    //   yield put(Actions.uploadScreenshotSuccessful(uploadedSupportImage));
    // }
    yield put(Actions.uploadScreenshotSuccessful({ actionData }));
    yield navigation.navigate("Setting");
  } catch (error) {
    yield put(Actions.uploadScreenshotFailure(error));
  }
}

function* updateUserInfo(actionData) {
  try {
    const currentUserData = yield sessionService.getStorageData("userData");
    const newUserInfo = actionData.userInfo;
    const navigation = actionData.userInfo.navigation;
    const userData = yield UserUtils.updateUserInfo(
      { userInfo: { ...newUserInfo }, userid: currentUserData.id },
      currentUserData.token
    );
    sessionService.setStorageData("userData", userData);
    yield put(Actions.updateUserSuccessful({ userData }));
    if (navigation) {
      Alert.alert(
        "",
        "Updated successfully.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack()
          }
        ],
        {
          cancelable: false
        }
      );
    }
  } catch (error) {
    yield put(Actions.updateUserFailure(error));
  }
}

function* storePushToken(actionData) {
  try {
    const currentUserData = yield sessionService.getStorageData("userData");
    const userData = yield UserUtils.storeUserPushToken(
      actionData,
      currentUserData.token
    );
    yield put(Actions.updateUserSuccessful({ userData }));
  } catch (error) {
    yield put(Actions.updateUserFailure(error));
  }
}

export function* watchOnUpdateUser() {
  yield takeLatest(Types.UPDATE_USER, updateUserInfo);
}

export function* watchOnUploadScreenshot() {
  yield takeLatest(Types.SUPPORT_UPLOAD_SCREENSHOT, uploadScreenshot);
}

export function* watchOnPushToken() {
  yield takeLatest(Types.STORE_PUSH_TOKEN, storePushToken);
}
