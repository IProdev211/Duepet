import Apis from "constants/AppApis";
import { Alert } from "react-native";
import { CommonApiHeader } from "AppUtils/Common";

//Pet
const addTracker = (data, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.trackerApi, {
      method: "POST",
      headers: CommonApiHeader(userToken),
      body: JSON.stringify({ tracker: { ...data } }),
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status === 201) resolve(responseJson.tracker);
        else if (response.status === 400) {
          Alert.alert("Opps!", responseJson.errors.tracker);
          reject(responseJson.error);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });

const updateTracker = (trackerId, data, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.trackerApi + `/${trackerId}`, {
      method: "PUT",
      headers: CommonApiHeader(userToken),
      body: JSON.stringify({ tracker: { goal_value: data } }),
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status === 200) resolve(responseJson.tracker);
        else reject(responseJson.error);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });

const getTrackerByUser = (userid, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.trackerApi + `/user/${userid}`, {
      method: "GET",
      headers: CommonApiHeader(userToken),
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status === 200) resolve(responseJson);
        else reject(responseJson.error);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });

const getTrackerByPet = (petId, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.trackerApi + `/pet/${petId}`, {
      method: "GET",
      headers: CommonApiHeader(userToken),
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status === 200) resolve(responseJson.trackers);
        else reject(responseJson.error);
      })
      .catch((error) => {
        reject(error);
      });
  });

const getTrackerById = (id, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.updateTracker, {
      method: "GET",
      headers: CommonApiHeader(userToken),
      body: JSON.stringify({ tracker: { ...data } }),
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status === 201) resolve();
        else reject(responseJson.error);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });

const createTrackerLog = (logData, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.trackerApi + "/value", {
      method: "POST",
      headers: CommonApiHeader(userToken),
      body: JSON.stringify({ tracker_value: { ...logData } }),
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status === 201) resolve(responseJson.tracker);
        else reject(responseJson.error);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });

const deleteTracker = (trackerId, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.trackerApi + `/${trackerId}`, {
      method: "DELETE",
      headers: CommonApiHeader(userToken),
    })
      .then(async (response) => {
        if (response.status === 200) resolve();
        else {
          const responseJson = await response.json();
          reject(responseJson.error);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });

export default {
  addTracker,
  updateTracker,
  getTrackerByUser,
  getTrackerByPet,
  getTrackerById,
  createTrackerLog,
  deleteTracker,
};
