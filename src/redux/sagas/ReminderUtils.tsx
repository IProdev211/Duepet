import Apis from "constants/AppApis";
import { Platform } from "react-native";
import { CommonApiHeader } from "AppUtils/Common";

const addReminderData = (reminderData, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.reminderApi, {
      method: "POST",
      headers: CommonApiHeader(userToken),
      body: JSON.stringify({ reminder: reminderData })
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

const updateReminderData = (template, userToken) =>
  new Promise((resolve, reject) => {
    template.map((item, index) => {
      fetch(Apis.reminderApi + "/" + item.reminder_template_id, {
        method: "PUT",
        headers: CommonApiHeader(userToken),
        body: JSON.stringify({ reminder: item })
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
  });

const updateReminderStatus = (reminder, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.reminderApi + "/value/" + reminder.reminder_template_id, {
      method: "PUT",
      headers: CommonApiHeader(userToken),
      body: JSON.stringify({
        reminder_value: { value: reminder.value, done: true }
      })
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

const removeReminder = (newLabelData, userToken) =>
  new Promise((resolve, reject) => {
    let apiUrl;

    if (newLabelData.type === "single") {
      apiUrl =
        Apis.reminderApi +
        "/value/" +
        newLabelData.reminder_template_id +
        "/" +
        newLabelData.value;
    }
    if (newLabelData.type === "all") {
      apiUrl = Apis.reminderApi + "/" + newLabelData.reminder_template_id;
    }
    fetch(apiUrl, {
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

const getReminderByUser = (actionData, userToken) =>
  new Promise((resolve, reject) => {
    let getReminderAPi;
    if (actionData.data.name === "all") {
      getReminderAPi = Apis.reminderApi + `?filter=${actionData.data.filter}`;
    } else {
      getReminderAPi =
        Apis.reminderApi +
        "/pet/" +
        actionData.data.id +
        `?filter=${actionData.data.filter}`;
    }
    fetch(getReminderAPi, {
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

const getReminderTemplate = (reminderData, userToken) =>
  new Promise((resolve, reject) => {
    fetch(Apis.reminderApi + "/" + reminderData.item.reminder_template_id, {
      method: "GET",
      headers: CommonApiHeader(userToken)
    })
      .then(async response => {
        const responseJson = await response.json();
        if (response.status === 200) resolve(responseJson);
        else reject(responseJson.error);
      })
      .catch(error => {
        reject(error);
      });
  });

export default {
  addReminderData,
  updateReminderData,
  removeReminder,
  getReminderByUser,
  getReminderTemplate,
  updateReminderStatus
};
