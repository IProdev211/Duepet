import * as Types from "../actions/actions";
import _ from "lodash";

let globalStates = {
  reminderData: {},
  reminderTemplate: {}
};

const reminderReducer = (state = globalStates, actionData) => {
  switch (actionData.type) {
    case Types.ADD_REMINDER:
      return {
        ...state
      };
    case Types.UPDATE_REMINDER:
      return {
        ...state
      };
    case Types.REMOVE_REMINDER:
      return {
        ...state
      };
    case Types.GET_REMINDER_BY_PET:
      return {
        ...state
      };
    case Types.GET_REMINDER_TEMPLATE:
      return {
        ...state
      };
    case Types.LOAD_REMINDER:
      return {
        ...state,
        reminderData: actionData.loadReminder
      };
    case Types.UPDATE_REMINDER_STATUS:
      return {
        ...state
      };
    case Types.LOAD_REMINDER_TEMPLATE:
      return {
        ...state,
        reminderTemplate: actionData.reminderTemplate
      };
    case Types.USER_LOGOUT:
      return {
        reminderData: {},
        reminderTemplate: {}
      };
    default:
      return state;
  }
};

export default reminderReducer;
