import { all, fork } from "redux-saga/effects";
import {
  watchOnAddPet,
  watchOnGetPet,
  watchOnGetPetTypes,
  watchOnUpdatePet,
  watchOnDeletePet
} from "./PetDataSaga";

import {
  watchOnUpdateUser,
  watchOnUploadScreenshot,
  watchOnPushToken
} from "./UserSaga";
import {
  watchOnAddLabel,
  watchOnGetAllLabel,
  watchOnUpdateLabel,
  watchOnRemoveLabel,
  watchOnGetAllCombineLabel
} from "./LabelSaga";
import {
  watchOnAddReminder,
  watchOnUpdateReminder,
  watchOnRemoveReminder,
  watchOnGetAllReminder,
  watchOnGetReminderTemplate,
  watchOnUpdateReminderStatus
} from "./ReminderSaga";
import {
  watchOnAddTracker,
  watchOnUpdateTracker,
  watchOnGetTrackerByUser,
  watchOnGetTrackerByPet,
  watchOnDeleteTracker,
  watchOnCreateTrackerLog
} from "./TrackerSaga";

export default function* rootSaga() {
  yield all([
    fork(watchOnAddLabel),
    fork(watchOnGetAllLabel),
    fork(watchOnGetAllCombineLabel),
    fork(watchOnUpdateLabel),
    fork(watchOnRemoveLabel),
    fork(watchOnAddPet),
    fork(watchOnDeletePet),
    fork(watchOnGetPet),
    fork(watchOnGetPetTypes),
    fork(watchOnUpdatePet),
    fork(watchOnUploadScreenshot),
    fork(watchOnUpdateUser),
    fork(watchOnPushToken),
    fork(watchOnAddReminder),
    fork(watchOnUpdateReminder),
    fork(watchOnRemoveReminder),
    fork(watchOnGetAllReminder),
    fork(watchOnGetReminderTemplate),
    fork(watchOnUpdateReminderStatus),
    fork(watchOnAddTracker),
    fork(watchOnUpdateTracker),
    fork(watchOnGetTrackerByUser),
    fork(watchOnGetTrackerByPet),
    fork(watchOnCreateTrackerLog),
    fork(watchOnDeleteTracker)
  ]);
}
