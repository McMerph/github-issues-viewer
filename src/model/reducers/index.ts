import { combineReducers } from "redux";
import IStore from "../IStore";
import issues from "./issues";
import repos from "./repos";

const combinedReducer = combineReducers<IStore>({
  issues,
  repos,
});

export default combinedReducer;
