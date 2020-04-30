import * as Types from "../actions/actions";
import _ from "lodash";

let globalStates = {
  addOrEditPetLoading: false,
  petTypesLoading: false,
  petLoading: false,
  petTypes: [],
  petData: [],
  userPets: {},
};

const petReducer = (state = globalStates, actionData) => {
  switch (actionData.type) {
    case Types.ADD_PET:
      return {
        ...state,
        addOrEditPetLoading: true,
      };

    case Types.UPDATE_PET:
      return {
        ...state,
        addOrEditPetLoading: true,
      };
    case Types.LOAD_USER_PETS:
      return {
        ...state,
        userPets: actionData.userPets,
      };

    case Types.UPDATE_PET_SUCCESSFUL:
      const { updatedPetData } = actionData;
      let returnPetData = {
        ...state,
        addOrEditPetLoading: false,
        petData: _.filter(state.petData, (pet) => pet.id !== updatedPetData.id),
      };
      const indexToPush = _.findIndex(
        state.petData,
        (pet) => pet.id === updatedPetData.id
      );
      returnPetData.petData.splice(
        indexToPush === -1 ? 0 : indexToPush,
        0,
        updatedPetData
      );
      returnPetData.petData[indexToPush].type =
        state.petTypes[updatedPetData.type - 1];
      return returnPetData;

    case Types.ADD_PET_SUCCESSFUL:
      let petList = state.petData.slice();
      petList.unshift({
        ...actionData.newPetData,
        type: state.petTypes[actionData.newPetData.type - 1],
      });
      return {
        ...state,
        petData: petList,
        addOrEditPetLoading: false,
      };

    case Types.GET_PET_BY_USER:
      return {
        ...state,
      };

    case Types.GET_PET_BY_USER_SUCCESSFUL:
      petList = state.petData.slice();
      return {
        ...state,
        petData: actionData.petData,
        petLoading: true,
      };

    case Types.GET_PET_TYPES:
      return {
        ...state,
      };
    case Types.GET_PET_TYPES_SUCCESSFUL:
      const { petTypes } = actionData;
      return {
        ...state,
        petTypes: petTypes,
        petTypesLoading: true,
      };
    case Types.USER_LOGOUT:
      return {
        addOrEditPetLoading: false,
        petTypesLoading: false,
        petLoading: false,
        petTypes: [],
        petData: [],
        userPets: {},
      };

    case Types.ADD_TRACKER_SUCCESSFUL:
      let petId = actionData.tracker.pet.id;
      let petData = state.petData.slice();

      let index = _.findIndex(petData, (pet) => pet.id === petId);

      petData[index].petActiveTrackersCount += 1;
      switch (actionData.tracker.label) {
        case "water":
          petData[index].waterConsumption = 0;
          break;
        case "food":
          petData[index].foodConsumption = 0;
          break;
        case "exercise":
          petData[index].exercise = 0;
          break;
        case "weight":
          petData[index].lastRecordedWeight = 0;
          break;
        case "poo":
          petData[index].pooCount = 0;
          break;
        case "wee":
          petData[index].weeCount = 0;
          break;
        case "vomit":
          petData[index].vomitCount = 0;
          break;
      }
      return {
        ...state,
        petData: [...petData],
      };

    case Types.DELETE_TRACKER_SUCCESSFUL:
      petId = actionData.data.petId;
      petData = state.petData.slice();

      index = _.findIndex(petData, (pet) => pet.id === petId);

      petData[index].petActiveTrackersCount -= 1;
      switch (actionData.data.label) {
        case "water":
          petData[index].waterConsumption = null;
          break;
        case "food":
          petData[index].foodConsumption = null;
          break;
        case "exercise":
          petData[index].exercise = null;
          break;
        case "weight":
          petData[index].lastRecordedWeight = null;
          break;
        case "poo":
          petData[index].pooCount = null;
          break;
        case "wee":
          petData[index].weeCount = null;
          break;
        case "vomit":
          petData[index].vomitCount = null;
          break;
      }

      return {
        ...state,
        petData: [...petData],
      };

    case Types.CREATE_TRACKER_LOG_SUCCESSFUL:
      petId = actionData.data.pet.id;
      petData = state.petData.slice();

      index = _.findIndex(petData, (pet) => pet.id === petId);
      switch (actionData.data.label) {
        case "water":
          petData[index].waterConsumption = actionData.data.last_total.value;
          break;
        case "food":
          petData[index].foodConsumption = actionData.data.last_total.value;
          break;
        case "exercise":
          petData[index].exercise = actionData.data.last_total.value;
          break;
        case "weight":
          petData[index].lastRecordedWeight = actionData.data.last_total.value;
          break;
        case "poo":
          petData[index].pooCount = actionData.data.last_total.value;
          break;
        case "wee":
          petData[index].weeCount = actionData.data.last_total.value;
          break;
        case "vomit":
          petData[index].vomitCount = actionData.data.last_total.value;
          break;
      }

      return {
        ...state,
        petData: [...petData],
      };

    default:
      return state;
  }
};

export default petReducer;
