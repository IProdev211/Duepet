import * as Types from "../actions/actions";
import _ from "lodash";

let globalStates = {
  labelData: {},
  combineLabel: {},
  labelNames: []
};

const labelReducer = (state = globalStates, actionData) => {
  switch (actionData.type) {
    case Types.ADD_LABEL:
      return {
        ...state
      };
    case Types.GET_ALL_LABEL_BY_USER:
      return {
        ...state
      };
    case Types.GET_ALL_CUSTOM_DEFAULT_LABEL:
      return {
        ...state
      };
    case Types.DELETE_LABEL:
      return {
        ...state
      };
    case Types.UPDATE_LABEL:
      return {
        ...state
      };
    case Types.LOAD_LABEL_DATA:
      return {
        ...state,
        labelData: actionData.labels
      };
    case Types.LOAD_COMBINE_LABEL:
      return {
        ...state,
        combineLabel: actionData.labels,
        labelNames: actionData.labelNames
      };
    case Types.USER_LOGOUT:
      return {
        labelData: {},
        combineLabel: {},
        labelNames: []
      };
    default:
      return state;
  }
};

export default labelReducer;
