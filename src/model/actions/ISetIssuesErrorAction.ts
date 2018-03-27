import ActionType from "./ActionType";
import IAction from "./IAction";

export default interface ISetIssuesErrorAction extends IAction {
  error: string;
}

export function isSetIssuesErrorAction(action: IAction): action is ISetIssuesErrorAction {
  const cast: ISetIssuesErrorAction = action as ISetIssuesErrorAction;
  return cast.type === ActionType.SetIssuesError &&
    typeof cast.error === "string";
}
