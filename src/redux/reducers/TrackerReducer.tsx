import * as Types from "../actions/actions";
import _ from "lodash";

let globalStates = {
  addOrEditTrackerLoading: false,
  trackerLoading: false,
  trackerData: [],
  currentPetTracker: {},
  activeTrackerCount: 0,
};

const trackerReducer = (state = globalStates, actionData) => {
  switch (actionData.type) {
    case Types.ADD_TRACKER:
      return {
        ...state,
        addOrEditTrackerLoading: true,
      };
    case Types.ADD_TRACKER_SUCCESSFUL:
      let trackerList = state.trackerData.slice();
      trackerList.push(actionData.tracker);
      return {
        ...state,
        trackerData: trackerList,
        activeTrackerCount: state.activeTrackerCount + 1,
        addOrEditTrackerLoading: false,
      };

    case Types.GET_TRACKER_BY_USER:
      return {
        ...state,
        trackerLoading: false,
      };

    case Types.GET_TRACKER_BY_USER_SUCCESSFUL:
      return {
        ...state,
        trackerLoading: true,
        trackerData: actionData.trackerData.trackers,
        activeTrackerCount: actionData.trackerData.trackersCount,
      };

    case Types.GET_TRACKER_BY_PET:
      return {
        ...state,
        trackerLoading: false,
        trackerData: _.filter(
          state.trackerData,
          (tracker) => tracker.id !== trackerId
        ),
      };

    case Types.GET_TRACKER_BY_PET_SUCCESSFUL:
      return {
        ...state,
        trackerLoading: false,
        currentPetTracker: actionData.tracker,
      };
    case Types.DELETE_TRACKER:
      return {
        ...state,
        trackerLoading: true,
      };
    case Types.DELETE_TRACKER_SUCCESSFUL:
      const { trackerId } = actionData.data;
      let returnTrackerData = {
        ...state,
        trackerLoading: false,
        activeTrackerCount: state.activeTrackerCount - 1,
        trackerData: _.filter(
          state.trackerData,
          (tracker) => tracker.id !== trackerId
        ),
      };
      return returnTrackerData;

    case Types.CREATE_TRACKER_LOG:
      return {
        ...state,
        trackerLoading: false,
      };
    case Types.CREATE_TRACKER_LOG_SUCCESSFUL:
      const trackData = state.trackerData;
      const { data } = actionData;
      let index = trackData.findIndex((d) => d.id === data.id);
      trackData[index] = { ...trackData[index], ...data };
      return {
        ...state,
        trackerLoading: true,
        trackerData: [...trackData],
      };

    case Types.UPDATE_TRACKER:
      return {
        ...state,
        trackerLoading: false,
      };

    case Types.UPDATE_TRACKER_SUCCESSFUL:
      const updateTrackerData = actionData.trackerData;
      returnTrackerData = {
        ...state,
        trackerLoading: true,
        trackerData: _.filter(
          state.trackerData,
          (tracker) => tracker.id !== updateTrackerData.id
        ),
      };
      const indexToPush = _.findIndex(
        state.trackerData,
        (tracker) => tracker.id === updateTrackerData.id
      );
      returnTrackerData.trackerData.splice(
        indexToPush === -1 ? 0 : indexToPush,
        0,
        updateTrackerData
      );

      return returnTrackerData;
    case Types.USER_LOGOUT:
      return {
        addOrEditTrackerLoading: false,
        trackerLoading: false,
        trackerData: [],
        currentPetTracker: {},
      };
    case Types.DELETE_PETS_SUCCESSFUL:
      const petData = actionData.petData;
      return {
        activeTrackerCount:
          state.activeTrackerCount - petData.petActiveTrackersCount,
      };
    default:
      return state;
  }
};

export default trackerReducer;
