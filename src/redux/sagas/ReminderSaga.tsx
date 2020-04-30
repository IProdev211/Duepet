import * as Types from "../actions/actions";
import * as Actions from "../actions";

import { put, takeLatest } from "redux-saga/effects";
import sessionService from "service/sessionService";
import reminderUtils from "./ReminderUtils";
import { Alert } from "react-native";
import { DialogText } from "styles/designSystem";

function* addReminderData(actionData) {
  try {
    const userData = yield sessionService.getStorageData("userData");
    const savedData = yield reminderUtils.addReminderData(
      actionData.reminderData,
      userData.token
    );
    actionData.showLoader(false);
    actionData.navigation.navigate("Schedule");
  } catch (error) {
    actionData.showLoader(false);
    yield put(Actions.apiFailure(error));
  }
}

function* updateReminderData(actionData) {
  try {
    actionData.showLoader(true);
    const userData = yield sessionService.getStorageData("userData");
    const savedData = yield reminderUtils.updateReminderData(
      actionData.reminderData,
      userData.token
    );
    actionData.showLoader(false);
    Alert.alert("success", "reminder update successfully", [
      { text: "OK", onPress: () => actionData.navigation.navigate("Schedule") }
    ]);
  } catch (error) {
    actionData.showLoader(false);
    yield put(Actions.apiFailure(error));
  }
}

function* updateReminderStatus(actionData) {
  try {
    actionData.showLoader(true);
    const userData = yield sessionService.getStorageData("userData");
    const savedData = yield reminderUtils.updateReminderStatus(
      actionData.reminderData,
      userData.token
    );
    yield put(
      Actions.getReminderByPet(actionData.reminderData, actionData.showLoader)
    );
    actionData.showLoader(false);
  } catch (error) {
    actionData.showLoader(false);
    yield put(Actions.apiFailure(error));
  }
}

function* removeReminder(actionData) {
  try {
    actionData.showLoader(true);
    const userData = yield sessionService.getStorageData("userData");
    const savedData = yield reminderUtils.removeReminder(actionData.reminderData, userData.token);
    yield put(
      Actions.getReminderByPet(actionData.reminderData, actionData.showLoader)
    );
    actionData.showLoader(false);
  } catch (error) {
    console.log("error", error);
    actionData.showLoader(false);
    yield put(Actions.apiFailure(error));
  }
}

function* getReminderByPet(actionData) {
  try {
    actionData.showLoader(true);
    const userData = yield sessionService.getStorageData("userData");
    const userReminder = yield reminderUtils.getReminderByUser(
      actionData,
      userData.token
    );
    actionData.showLoader(false);
    if (userReminder.reminders) {
      if (actionData.data.filter === "upcoming") {
        userReminder.reminders.sort((a, b) => {
          return new Date(a.value).getTime() - new Date(b.value).getTime();
        });
      }

      if (actionData.data.filter === "overdue") {
        userReminder.reminders.sort((a, b) => {
          return new Date(b.value).getTime() - new Date(a.value).getTime();
        });
      }
    }
    yield put(Actions.loadReminder(userReminder));
  } catch (error) {
    actionData.showLoader(false);
    yield put(Actions.apiFailure(error));
  }
}

function* getReminderTemplate(actionData) {
  try {
    // actionData.showLoader(true);
    const userData = yield sessionService.getStorageData("userData");
    const userReminder = yield reminderUtils.getReminderTemplate(
      actionData.data,
      userData.token
    );
    actionData.showLoader(false);
    yield put(Actions.loadReminderTemplate(userReminder));
  } catch (error) {
    actionData.showLoader(false);
    yield put(Actions.apiFailure(error));
  }
}

export function* watchOnAddReminder() {
  yield takeLatest(Types.ADD_REMINDER, addReminderData);
}

export function* watchOnUpdateReminder() {
  yield takeLatest(Types.UPDATE_REMINDER, updateReminderData);
}

export function* watchOnRemoveReminder() {
  yield takeLatest(Types.REMOVE_REMINDER, removeReminder);
}

export function* watchOnGetAllReminder() {
  yield takeLatest(Types.GET_REMINDER_BY_PET, getReminderByPet);
}

export function* watchOnGetReminderTemplate() {
  yield takeLatest(Types.GET_REMINDER_TEMPLATE, getReminderTemplate);
}

export function* watchOnUpdateReminderStatus() {
  yield takeLatest(Types.UPDATE_REMINDER_STATUS, updateReminderStatus);
}
