import { combineReducers } from "redux";
import petReducer from "./PetReducer";
import userReducer from "./UserReducer";
import labelReducer from "./LabelReducer";
import reminderReducer from "./ReminderReducer";
import trackerReducer from "./TrackerReducer";

export default combineReducers({
  petReducer,
  userReducer,
  labelReducer,
  reminderReducer,
  trackerReducer
});
