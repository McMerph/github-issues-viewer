import { combineReducers } from "redux";
import { issues } from "./issues";
import { repos } from "./repos";
import { user } from "./user";

// TODO Pack repos and issues in user?
const combinedReducer = combineReducers({
  issues,
  repos,
  user,
});

export default combinedReducer;
