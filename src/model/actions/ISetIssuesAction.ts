import IIssuesPage, { isIssuesPage } from "../entities/IIssuesPage";
import ActionType from "./ActionType";
import IAction from "./IAction";

export default interface ISetIssuesAction extends IAction {
  issues: IIssuesPage;
  page: number;
}

export function isSetIssuesAction(action: IAction): action is ISetIssuesAction {
  const cast: ISetIssuesAction = action as ISetIssuesAction;
  return cast.type === ActionType.SetIssues &&
    typeof cast.page === "number" &&
    cast.issues && isIssuesPage(cast.issues);
}
