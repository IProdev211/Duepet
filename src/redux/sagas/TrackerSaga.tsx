import * as Types from "../actions/actions";
import * as Actions from "../actions";
import { put, takeLatest } from "redux-saga/effects";
import TrackerAPIUtils from "./TrackerUtils";
import sessionService from "service/sessionService";
import TrackerUtils from "./TrackerUtils";

function* addTracker(actionData) {
  try {
    const { navigation, showLoader, ...trackData } = actionData.data;
    showLoader(true);
    const userData = yield sessionService.getStorageData("userData");
    const trackerData = yield TrackerAPIUtils.addTracker(
      trackData,
      userData.token
    );
    if (trackerData.goal_oriented) {
      yield navigation.navigate("GoalOrientedLog", {
        petId: trackerData.pet_id,
        trackerId: trackerData.id,
        label: trackerData.label,
        goal_value: trackerData.goal_value,
        last: undefined,
        goal_oriented: trackerData.goal_oriented,
        values: undefined
      });
    } else {
      navigation.navigate("TrackLog", {
        petId: trackerData.pet_id,
        trackerId: trackerData.id,
        label: trackerData.label,
        goal_value: trackerData.goal_value,
        last: undefined
      });
    }
    yield put(Actions.addTrackerSuccess(trackerData));
    actionData.data.showLoader(false);
  } catch (error) {
    const { navigation, showLoader, ...trackData } = actionData.data;
    yield put(Actions.addTrackerFailure(error));
    actionData.data.showLoader(false);
  }
}

function* updateTracker(actionData) {
  try {
    const userData = yield sessionService.getStorageData("userData");
    const { navigation, ...trackData } = actionData.data;
    const trackerData = yield TrackerAPIUtils.updateTracker(
      trackData.trackerId,
      trackData.goal_value,
      userData.token
    );
    yield navigation.navigate("Trackers");
    yield put(Actions.updateTrackerSuccess(trackerData));
  } catch (error) {
    yield put(Actions.updateTrackerFailure(error));
  }
}

function* getTrackerByUser() {
  try {
    const userData = yield sessionService.getStorageData("userData");
    const trackerData = yield TrackerAPIUtils.getTrackerByUser(
      userData.id,
      userData.token
    );
    yield put(Actions.getTrackerByUserSuccess(trackerData));
  } catch (error) {
    yield put(Actions.getTrackerByUserFailure(error));
  }
}

function* getTrackerByPet(actionData) {
  try {
    const userData = yield sessionService.getStorageData("userData");
    const trackerData = yield TrackerAPIUtils.getTrackerByPet(
      actionData.petId,
      userData.token
    );
    yield put(Actions.getTrackerByPetSuccess(trackerData));
  } catch (error) {
    yield put(Actions.getTrackerByPetFailure(error));
  }
}

function* createTrackerLog(actionData) {
  try {
    const { navigation, showLoader, ...data } = actionData.logData;
    showLoader(true);
    const userData = yield sessionService.getStorageData("userData");
    const trackerData = yield TrackerAPIUtils.createTrackerLog(
      {
        ...data,
        value: Number(data.value),
        rating: data.rating ? data.rating.toString() : null
      },
      userData.token
    );
    const params: any = {
      goalOriented: trackerData.goal_oriented,
      trackerData,
      goal: trackerData.goal_value,
      label: trackerData.label,
      trackerId: trackerData.id,
      last: trackerData.last_total
    };
    if (
      trackerData.label === "poo" ||
      trackerData.label === "wee" ||
      trackerData.label === "vomit"
    ) {
      params.type = "non_goal";
    } else {
      params.values = trackerData.values;
      params.type = "goal";
    }
    yield navigation.navigate("TrackerChart", params);
    yield put(Actions.createTrackerLogSuccess(trackerData));
    showLoader(false);
  } catch (error) {
    console.log(error);
    yield put(Actions.createTrackerLogFailure(error));
  }
}

function* deleteTracker(actionData) {
  try {
    const { navigation, trackerId, petId, label, showLoader } = actionData.data;
    showLoader(true);
    const userData = yield sessionService.getStorageData("userData");
    yield TrackerAPIUtils.deleteTracker(trackerId, userData.token);
    yield navigation.navigate("Trackers");
    yield put(
      Actions.deleteTrackerSuccess({
        trackerId: trackerId,
        petId: petId,
        label: label
      })
    );
    showLoader(false);
  } catch (error) {
    yield put(Actions.deleteTrackerFailure(error));
  }
}

export function* watchOnAddTracker() {
  yield takeLatest(Types.ADD_TRACKER, addTracker);
}

export function* watchOnUpdateTracker() {
  yield takeLatest(Types.UPDATE_TRACKER, updateTracker);
}

export function* watchOnGetTrackerByUser() {
  yield takeLatest(Types.GET_TRACKER_BY_USER, getTrackerByUser);
}

export function* watchOnGetTrackerByPet() {
  yield takeLatest(Types.GET_TRACKER_BY_PET, getTrackerByPet);
}

export function* watchOnDeleteTracker() {
  yield takeLatest(Types.DELETE_TRACKER, deleteTracker);
}

export function* watchOnCreateTrackerLog() {
  yield takeLatest(Types.CREATE_TRACKER_LOG, createTrackerLog);
}
