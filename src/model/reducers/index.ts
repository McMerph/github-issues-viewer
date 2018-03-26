import { combineReducers } from "redux";
import { issues } from "./issues";
import { repos } from "./repos";
import { user } from "./user";
import IStore from "../IStore";

// TODO Pack repos and issues in user?
const combinedReducer = combineReducers<IStore>({
  issues,
  repos,
  user,
});

export default combinedReducer;
