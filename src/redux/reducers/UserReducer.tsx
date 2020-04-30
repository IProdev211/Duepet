import * as Types from "../actions/actions";
import _ from "lodash";

let globalStates = {
  userInfo: {},
  uploadingScreenshot: false,
  addOrEditingUserLoading: false,
  showLoader: false,
  showDialog: false,
  dialogTitle: "",
  dialogContain: "",
  dialogFooter: ""
};

const userReducer = (state = globalStates, actionData) => {
  switch (actionData.type) {
    case Types.SUPPORT_UPLOAD_SCREENSHOT:
      return {
        ...state,
        uploadingScreenshot: true
      };

    case Types.SUPPORT_UPLOAD_SCREENSHOT_SUCCESSFUL:
      return {
        ...state,
        uploadingScreenshot: false
      };
    case Types.STORE_PUSH_TOKEN:
      return {
        ...state
      };
    case Types.UPDATE_USER:
      return {
        ...state,
        addOrEditingUserLoading: true
      };
    case Types.SHOW_LOADER:
      return {
        ...state,
        showLoader: actionData.loader
      };
    case Types.SHOW_DIALOG:
      return {
        ...state,
        showDialog: actionData.visible
      };
    case Types.SET_DIALOG_TITLE:
      return {
        ...state,
        dialogTitle: actionData.dialogTitle
      };
    case Types.SET_DIALOG_CONTAIN:
      return {
        ...state,
        dialogContain: actionData.dialogContain
      };
    case Types.SET_DIALOG_FOOTER:
      return {
        ...state,
        dialogFooter: actionData.dialogFooter
      };
    case Types.UPDATE_PET_SUCCESSFUL:
      const { data } = actionData;
      return {
        ...state,
        userInfo: { ...state.userInfo, data },
        addOrEditingUserLoading: false
      };
    case Types.USER_LOGOUT:
      return {
        userInfo: {},
        uploadingScreenshot: false,
        addOrEditingUserLoading: false,
        showLoader: false,
        showDialog: false,
        dialogTitle: "",
        dialogContain: "",
        dialogFooter: ""
      };
    default:
      return state;
  }
};

export default userReducer;
