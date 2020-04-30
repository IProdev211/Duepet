import * as Types from "./actions";

// Add Pet
export const addPet = (petData, navigation, showLoader) => {
  return {
    type: Types.ADD_PET,
    petData,
    navigation,
    showLoader,
  };
};

export const deletePet = (petData, showLoader) => {
  return {
    type: Types.DELETE_PETS,
    petData,
    showLoader,
  };
};

export const deletePetSuccessful = (petData) => {
  return {
    type: Types.DELETE_PETS_SUCCESSFUL,
    petData,
  };
};

export const addPetFailure = (errorMsg) => {
  return {
    type: Types.ADD_PET_ERROR,
    error: errorMsg instanceof TypeError ? errorMsg.message : errorMsg,
  };
};

export const loadUserPets = (userPets) => {
  return {
    type: Types.LOAD_USER_PETS,
    userPets,
  };
};

export const addPetSuccessful = (newPetData) => {
  return {
    type: Types.ADD_PET_SUCCESSFUL,
    newPetData,
  };
};

// Update Pet
export const updatePet = (petData, navigation, showLoader) => {
  return {
    type: Types.UPDATE_PET,
    petData,
    navigation,
    showLoader,
  };
};

export const updatePetSuccessful = (updatedPetData) => {
  return {
    type: Types.UPDATE_PET_SUCCESSFUL,
    updatedPetData,
  };
};

export const updatePetFailure = (errorMsg) => {
  return {
    type: Types.ADD_PET_ERROR,
    error: errorMsg instanceof TypeError ? errorMsg.message : errorMsg,
  };
};

// Get Pet By User
export const getPetByUser = (userid) => {
  return {
    type: Types.GET_PET_BY_USER,
    userid,
  };
};

export const getPetByUserFailure = (errorMsg) => {
  return {
    type: Types.GET_PET_BY_USER_ERROR,
    error: errorMsg instanceof TypeError ? errorMsg.message : errorMsg,
  };
};

export const getPetByUserSuccessful = (petData) => {
  return {
    type: Types.GET_PET_BY_USER_SUCCESSFUL,
    petData,
  };
};

// Get Pet Types
export const getPetTypes = () => {
  return {
    type: Types.GET_PET_TYPES,
  };
};

export const getPetTypesFailure = (errorMsg) => {
  return {
    type: Types.GET_PET_TYPES_ERROR,
    error: errorMsg instanceof TypeError ? errorMsg.message : errorMsg,
  };
};

export const getPetTypesSuccessful = (petTypes) => {
  return {
    type: Types.GET_PET_TYPES_SUCCESSFUL,
    petTypes,
  };
};

// Add Tracker
export const addTracker = (data) => {
  return {
    type: Types.ADD_TRACKER,
    data,
  };
};

export const addTrackerSuccess = (tracker) => {
  return {
    type: Types.ADD_TRACKER_SUCCESSFUL,
    tracker,
  };
};

export const addTrackerFailure = (errorMsg) => {
  return {
    type: Types.ADD_TRACKER_ERROR,
    error: errorMsg instanceof TypeError ? errorMsg.message : errorMsg,
  };
};

// Update Tracker
export const updateTracker = (data) => {
  return {
    type: Types.UPDATE_TRACKER,
    data,
  };
};

export const updateTrackerSuccess = (trackerData) => {
  return {
    type: Types.UPDATE_TRACKER_SUCCESSFUL,
    trackerData,
  };
};

export const updateTrackerFailure = (errorMsg) => {
  return {
    type: Types.UPDATE_TRACKER_ERROR,
    error: errorMsg instanceof TypeError ? errorMsg.message : errorMsg,
  };
};

// get trackers by user
export const getTrackerByUser = () => {
  return {
    type: Types.GET_TRACKER_BY_USER,
  };
};

export const getTrackerByUserSuccess = (trackerData) => {
  return {
    type: Types.GET_TRACKER_BY_USER_SUCCESSFUL,
    trackerData,
  };
};

export const getTrackerByUserFailure = (errorMsg) => {
  return {
    type: Types.GET_TRACKER_BY_USER_ERROR,
    error: errorMsg instanceof TypeError ? errorMsg.message : errorMsg,
  };
};

// get trackers by user
export const getTrackerByPet = (petId) => {
  return {
    type: Types.GET_TRACKER_BY_PET,
    petId,
  };
};

export const getTrackerByPetSuccess = (tracker) => {
  return {
    type: Types.GET_TRACKER_BY_PET_SUCCESSFUL,
    tracker,
  };
};

export const getTrackerByPetFailure = (errorMsg) => {
  return {
    type: Types.GET_TRACKER_BY_PET_ERROR,
    error: errorMsg instanceof TypeError ? errorMsg.message : errorMsg,
  };
};

// create tracker log
export const createTrackerLog = (logData) => {
  return {
    type: Types.CREATE_TRACKER_LOG,
    logData,
  };
};

export const createTrackerLogSuccess = (data) => {
  return {
    type: Types.CREATE_TRACKER_LOG_SUCCESSFUL,
    data,
  };
};

export const createTrackerLogFailure = (errorMsg) => {
  return {
    type: Types.CREATE_TRACKER_LOG_ERROR,
    error: errorMsg instanceof TypeError ? errorMsg.message : errorMsg,
  };
};

// delete tracker
export const deleteTracker = (data) => {
  return {
    type: Types.DELETE_TRACKER,
    data,
  };
};

export const deleteTrackerSuccess = (data) => {
  return {
    type: Types.DELETE_TRACKER_SUCCESSFUL,
    data,
  };
};

export const deleteTrackerFailure = (errorMsg) => {
  return {
    type: Types.DELETE_TRACKER_ERROR,
    error: errorMsg instanceof TypeError ? errorMsg.message : errorMsg,
  };
};

// get trackers by id
export const getTrackerById = (id) => {
  return {
    type: Types.GET_TRACKER_BY_ID,
    id,
  };
};

export const getTrackerByIdSuccess = (trackerData) => {
  return {
    type: Types.GET_TRACKER_BY_ID_SUCCESSFUL,
    trackerData,
  };
};

export const getTrackerByIdFailure = (errorMsg) => {
  return {
    type: Types.GET_TRACKER_BY_ID_ERROR,
    error: errorMsg instanceof TypeError ? errorMsg.message : errorMsg,
  };
};

//Setting
export const updateUser = (userInfo) => {
  return {
    type: Types.UPDATE_USER,
    userInfo,
  };
};

export const updateUserSuccessful = (data) => {
  return {
    type: Types.UPDATE_USER_SUCCESSFUL,
    data,
  };
};

export const storePushToken = (data) => {
  return {
    type: Types.STORE_PUSH_TOKEN,
    data,
  };
};

export const updateUserFailure = (errorMsg) => {
  return {
    type: Types.GET_PET_TYPES_ERROR,
    error: errorMsg instanceof TypeError ? errorMsg.message : errorMsg,
  };
};

//Upload screenshot in support page of setting
export const uploadScreenshot = (payload) => {
  return {
    type: Types.SUPPORT_UPLOAD_SCREENSHOT,
    payload,
  };
};

export const uploadScreenshotSuccessful = (data) => {
  return {
    type: Types.SUPPORT_UPLOAD_SCREENSHOT_SUCCESSFUL,
    data,
  };
};

export const uploadScreenshotFailure = (errorMsg) => {
  return {
    type: Types.GET_PET_TYPES_ERROR,
    error: errorMsg instanceof TypeError ? errorMsg.message : errorMsg,
  };
};

//Add Label
export const addLabel = (labelData, navigation, showLoader) => {
  return {
    type: Types.ADD_LABEL,
    labelData,
    navigation,
    showLoader,
  };
};

//Update Label
export const updateLabel = (labelData, navigation, showLoader) => {
  return {
    type: Types.UPDATE_LABEL,
    labelData,
    navigation,
    showLoader,
  };
};

export const removeLabel = (labelData, showLoader) => {
  return {
    type: Types.DELETE_LABEL,
    labelData,
    showLoader,
  };
};

export const getAllLabel = (showLoader) => {
  return {
    type: Types.GET_ALL_LABEL_BY_USER,
    showLoader,
  };
};

export const getCombineLabel = (showLoader) => {
  return {
    type: Types.GET_ALL_CUSTOM_DEFAULT_LABEL,
    showLoader,
  };
};

export const apiFailure = (errorMsg) => {
  return {
    type: Types.ADD_PET_ERROR,
    error: errorMsg instanceof TypeError ? errorMsg.message : errorMsg,
  };
};

export const loadLabelData = (labels) => {
  return {
    type: Types.LOAD_LABEL_DATA,
    labels,
  };
};

export const loadCombineLabelData = (labels, labelNames) => {
  return {
    type: Types.LOAD_COMBINE_LABEL,
    labels,
    labelNames,
  };
};

//set loader

export const setLoader = (loader) => {
  return {
    type: Types.SHOW_LOADER,
    loader,
  };
};

export const setDialog = (visible) => {
  return {
    type: Types.SHOW_DIALOG,
    visible,
  };
};

export const setDialogTitle = (dialogTitle) => {
  return {
    type: Types.SET_DIALOG_TITLE,
    dialogTitle,
  };
};

export const setDialogContain = (dialogContain) => {
  return {
    type: Types.SET_DIALOG_CONTAIN,
    dialogContain,
  };
};

export const setDialogFooter = (dialogFooter) => {
  return {
    type: Types.SET_DIALOG_FOOTER,
    dialogFooter,
  };
};

//reminder

export const addReminder = (reminderData, navigation, showLoader) => {
  return {
    type: Types.ADD_REMINDER,
    reminderData,
    navigation,
    showLoader,
  };
};

export const updateReminder = (reminderData, navigation, showLoader) => {
  return {
    type: Types.UPDATE_REMINDER,
    reminderData,
    navigation,
    showLoader,
  };
};

export const removeReminder = (reminderData, showLoader) => {
  return {
    type: Types.REMOVE_REMINDER,
    reminderData,
    showLoader,
  };
};

export const getAllReminder = (filter, showLoader) => {
  return {
    type: Types.GET_REMINDER_BY_USER,
    filter,
    showLoader,
  };
};

export const getReminderByPet = (data, showLoader) => {
  return {
    type: Types.GET_REMINDER_BY_PET,
    data,
    showLoader,
  };
};

export const getReminderTemplate = (data, showLoader) => {
  return {
    type: Types.GET_REMINDER_TEMPLATE,
    data,
    showLoader,
  };
};

export const loadReminder = (loadReminder) => {
  return {
    type: Types.LOAD_REMINDER,
    loadReminder,
  };
};

export const loadReminderTemplate = (reminderTemplate) => {
  return {
    type: Types.LOAD_REMINDER_TEMPLATE,
    reminderTemplate,
  };
};

export const updateReminderStatus = (reminderData, showLoader) => {
  return {
    type: Types.UPDATE_REMINDER_STATUS,
    reminderData,
    showLoader,
  };
};

export const userLogout = () => {
  return {
    type: Types.USER_LOGOUT,
  };
};
