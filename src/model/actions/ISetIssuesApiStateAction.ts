import ApiState from "../entities/ApiState";
import ActionType from "./ActionType";
import IAction from "./IAction";

export default interface ISetIssuesApiStateAction extends IAction {
  state: ApiState;
  error?: string;
}

export function isSetIssuesApiStateAction(action: IAction): action is ISetIssuesApiStateAction {
  const cast: ISetIssuesApiStateAction = action as ISetIssuesApiStateAction;
  return cast.type === ActionType.SetIssuesApiState &&
    (!cast.error || typeof cast.error === "string") &&
    Object.values(ApiState).includes(cast.state);
}
