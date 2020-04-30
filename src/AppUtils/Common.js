export const CommonApiHeader = userToken => ({
  "Content-Type": "application/json",
  Authorization: "Token " + userToken,
  "X-Requested-With": "XMLHttpRequest"
});
