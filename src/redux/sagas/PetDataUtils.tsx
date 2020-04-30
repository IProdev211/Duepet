import Apis from "constants/AppApis";
import { Platform } from "react-native";
import { CommonApiHeader } from "AppUtils/Common";

//Pet
const addPetData = (newPetData, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.petApi, {
      method: "POST",
      headers: CommonApiHeader(userToken),
      body: JSON.stringify({ pet: { ...newPetData } }),
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status === 201) resolve(responseJson.Pet);
        else reject(responseJson.error);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });

const updatePetData = (petData, userToken) =>
  new Promise((resolve, reject) => {
    const { id, avatar, ...newPetData } = petData;
    const { reminders, ...data } = newPetData;
    fetch(Apis.petUpdate + id, {
      method: "PUT",
      headers: CommonApiHeader(userToken),
      body: JSON.stringify({ pet: { ...data } }),
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status === 200) resolve(responseJson.pet);
        else reject(responseJson.error);
      })
      .catch((error) => {
        reject(error);
      });
  });

const deletePetData = (petData, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.petApi + "/" + petData.id, {
      method: "DELETE",
      headers: CommonApiHeader(userToken),
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status === 200) resolve(responseJson);
        else reject(responseJson.error);
      })
      .catch((error) => {
        reject(error);
      });
  });

const getPetByUser = (userid, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.petApi + "/user/" + userid, {
      method: "GET",
      headers: CommonApiHeader(userToken),
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status === 200) resolve(responseJson);
        else {
          reject(responseJson.error);
        }
      })
      .catch((error) => reject(error));
  });

const getPetTypes = (userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.petTypes, {
      method: "GET",
      headers: CommonApiHeader(userToken),
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status == 200) resolve(responseJson.PetType);
        else reject(responseJson.error);
      })
      .catch((error) => reject(error));
  });

const petAvatarUpload = (petId, userToken, avatar) =>
  new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("image", {
      name: avatar.uri.substring(avatar.uri.lastIndexOf("/") + 1),
      type: "image/jpeg",
      uri:
        Platform.OS === "android"
          ? avatar.uri
          : avatar.uri.replace("file://", ""),
    });
    fetch(Apis.petAvatarUpload + petId, {
      method: "POST",
      headers: {
        ...CommonApiHeader(userToken),
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status == 201) resolve(responseJson.Image);
        else reject(responseJson.error);
      })
      .catch((error) => {
        reject(error);
      });
  });

export default {
  addPetData,
  getPetByUser,
  getPetTypes,
  petAvatarUpload,
  updatePetData,
  deletePetData,
};
