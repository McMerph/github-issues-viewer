import IIssuesSettings, { isIssuesSettings } from "../entities/IIssuesSettings";
import ActionType from "./ActionType";
import IAction from "./IAction";
import IIssue, { isIssue } from "../entities/IIssue";

interface IAddIssuesAction extends IAction {
  payload: IAddIssuesActionPayload;
}

// TODO Split to own file?
interface IAddIssuesActionPayload {
  settings: IIssuesSettings;
  page: IIssue[];
  eTag: string;
  lastPage: number;
}

// TODO Split to own file?
function isAddIssuesAction(action: IAction): action is IAddIssuesAction {
  const cast: IAddIssuesAction = action as IAddIssuesAction;

  return action.type === ActionType.AddIssues &&
    cast.payload &&
    typeof cast.payload.eTag === "string" &&
    (Array.isArray(cast.payload.page) && cast.payload.page.every((issue) => isIssue(issue))) &&
    cast.payload.settings && isIssuesSettings(cast.payload.settings);
}

export default IAddIssuesAction;
export { IAddIssuesActionPayload, isAddIssuesAction };
