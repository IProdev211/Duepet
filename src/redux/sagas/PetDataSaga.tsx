import * as Types from "../actions/actions";
import * as Actions from "../actions";
import { put, takeLatest } from "redux-saga/effects";
import PetDataUtils from "./PetDataUtils";
import sessionService from "service/sessionService";

function* addPetData(actionData) {
  try {
    actionData.showLoader(true);
    const userData = yield sessionService.getStorageData("userData");
    const { image, ...pet } = actionData.petData;
    const savedUserData = yield PetDataUtils.addPetData(pet, userData.token);
    if (image.cancelled === false) {
      const petAvatar = yield PetDataUtils.petAvatarUpload(
        savedUserData.id,
        userData.token,
        image
      );
      yield put(
        Actions.addPetSuccessful({
          ...savedUserData,
          avatar: petAvatar.imagepath
        })
      );
    } else {
      yield put(Actions.addPetSuccessful(savedUserData));
    }
    actionData.showLoader(false);
    actionData.navigation.navigate("PetProfile");
  } catch (error) {
    console.log("Add Pet Error", error);
    actionData.showLoader(false);
    yield put(Actions.addPetFailure(error));
  }
}

function* updatePetData(actionData) {
  try {
    actionData.showLoader(true);
    const userData = yield sessionService.getStorageData("userData");
    // test data
    const { image, ...pet } = actionData.petData;
    const savedUserData = yield PetDataUtils.updatePetData(pet, userData.token);
    if (image.cancelled === false) {
      if (!image.uri.includes("https")) {
        const petAvatar = yield PetDataUtils.petAvatarUpload(
          savedUserData.id,
          userData.token,
          image
        );
        yield put(
          Actions.updatePetSuccessful({
            ...savedUserData,
            avatar: petAvatar.imagepath
          })
        );
      } else {
        yield put(Actions.updatePetSuccessful(savedUserData));
      }
    } else {
      yield put(Actions.updatePetSuccessful(savedUserData));
    }
    yield put(Actions.getPetByUser(""));
    actionData.showLoader(false);
    actionData.navigation.navigate("PetProfile");
  } catch (error) {
    console.log(error);
    actionData.showLoader(false);
    yield put(Actions.updatePetFailure(error));
  }
}

function* deletePet(actionData) {
  try {
    actionData.showLoader(true);
    const userData = yield sessionService.getStorageData("userData");
    const petData = yield PetDataUtils.deletePetData(
      actionData.petData,
      userData.token
    );
    yield put(Actions.deletePetSuccessful(actionData.petData));
    yield put(Actions.getPetByUser(""));
    actionData.showLoader(false);
    // yield put(Actions.getPetByUserSuccessful(petData.pets));
  } catch (error) {
    yield put(Actions.getPetByUserFailure(error));
  }
}

function* getPetByUser(actionData) {
  try {
    const userid = actionData.userid;
    const userData = yield sessionService.getStorageData("userData");
    const petData = yield PetDataUtils.getPetByUser(
      userData.id,
      userData.token
    );
    yield put(Actions.loadUserPets(petData));
    yield put(Actions.getPetByUserSuccessful(petData.pets));
  } catch (error) {
    yield put(Actions.getPetByUserFailure(error));
  }
}

function* getPetTypes(actionData) {
  try {
    const userData = yield sessionService.getStorageData("userData");
    const types = yield PetDataUtils.getPetTypes(userData.token);
    yield put(Actions.getPetTypesSuccessful(types));
  } catch (error) {
    yield put(Actions.getPetTypesFailure(error));
  }
}

export function* watchOnAddPet() {
  yield takeLatest(Types.ADD_PET, addPetData);
}

export function* watchOnDeletePet() {
  yield takeLatest(Types.DELETE_PETS, deletePet);
}

export function* watchOnUpdatePet() {
  yield takeLatest(Types.UPDATE_PET, updatePetData);
}

export function* watchOnGetPet() {
  yield takeLatest(Types.GET_PET_BY_USER, getPetByUser);
}

export function* watchOnGetPetTypes() {
  yield takeLatest(Types.GET_PET_TYPES, getPetTypes);
}
