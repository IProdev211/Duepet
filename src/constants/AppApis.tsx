//local host api url
const mainApiUrl = "https://api.duepet.com/api";

const AppApis = {
  login: mainApiUrl + "/users/login",
  getAppVerion: mainApiUrl + "/settings/app_ver",
  forgotPassword: mainApiUrl + "/forgot-password",
  changePassword: mainApiUrl + "/new-password",
  updateUserInfo: mainApiUrl + "/user/",
  pushTokenApi: mainApiUrl + "/users/token",
  register: mainApiUrl + "/users",
  petApi: mainApiUrl + "/pets",
  petUpdate: mainApiUrl + "/pets/",
  petTypes: mainApiUrl + "/pet-types",
  labelApi: mainApiUrl + "/label",
  reminderApi: mainApiUrl + "/reminder",
  petAvatarUpload: mainApiUrl + "/pets/avatars/",
  uploadScreenshot: mainApiUrl + "/support",
  trackerApi: mainApiUrl + "/tracker"
};

export default AppApis;
