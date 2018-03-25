import { Action } from "redux";
import ActionType from "./ActionType";

export default interface IAction extends Action {
  type: ActionType;
}
