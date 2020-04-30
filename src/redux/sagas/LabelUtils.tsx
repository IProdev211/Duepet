import Apis from "constants/AppApis";
import { Platform } from "react-native";
import { CommonApiHeader } from "AppUtils/Common";

const addLabelData = (newLabelData, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.labelApi, {
      method: "POST",
      headers: CommonApiHeader(userToken),
      body: JSON.stringify({ label: { ...newLabelData } })
    })
      .then(async response => {
        const responseJson = await response.json();
        if (response.status === 201) resolve(responseJson);
        else reject(responseJson.error);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });

const updateLabelData = (newLabelData, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.labelApi + "/" + newLabelData.id, {
      method: "PUT",
      headers: CommonApiHeader(userToken),
      body: JSON.stringify({ label: { ...newLabelData } })
    })
      .then(async response => {
        const responseJson = await response.json();
        if (response.status === 200) resolve(responseJson);
        else reject(responseJson.error);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });

const removeLabel = (newLabelData, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.labelApi + "/" + newLabelData.id, {
      method: "DELETE",
      headers: CommonApiHeader(userToken)
    })
      .then(async response => {
        const responseJson = await response.json();
        if (response.status === 200) resolve(responseJson);
        else reject(responseJson.error);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });

const getLabelByUser = (userId, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.labelApi + `?filter=1`, {
      method: "GET",
      headers: CommonApiHeader(userToken)
    })
      .then(async response => {
        const responseJson = await response.json();
        if (response.status === 200) resolve(responseJson);
        else reject(responseJson.error);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });

const getCombineLabelByUser = (userId, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.labelApi, {
      method: "GET",
      headers: CommonApiHeader(userToken)
    })
      .then(async response => {
        const responseJson = await response.json();
        if (response.status === 200) resolve(responseJson);
        else reject(responseJson.error);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });

export default {
  addLabelData,
  updateLabelData,
  getLabelByUser,
  removeLabel,
  getCombineLabelByUser
};
