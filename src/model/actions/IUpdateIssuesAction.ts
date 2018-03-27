import IApiStatus, { isApiStatus } from "../entities/IApiStatus";
import { isIssue } from "../entities/issues/IIssue";
import IIssuesRequest, { isIssuesRequest } from "../entities/issues/IIssuesRequest";
import IIssuesResponse from "../entities/issues/IIssuesResponse";
import ActionType from "./ActionType";
import IAction from "./IAction";

interface IUpdateIssuesAction extends IAction {
  response: IIssuesResponse;
  apiStatus: IApiStatus;
  eTag: string;
  request: IIssuesRequest;
}

function isUpdateIssuesAction(action: IAction): action is IUpdateIssuesAction {
  const cast: IUpdateIssuesAction = action as IUpdateIssuesAction;
  return action.type === ActionType.UpdateIssues &&
    cast.apiStatus &&
    isApiStatus(cast.apiStatus) &&
    typeof cast.eTag === "string" &&
    typeof cast.response.lastPageNumber === "number" &&
    Array.isArray(cast.response.page) &&
    cast.response.page.every((issue) => isIssue(issue)) &&
    isIssuesRequest(cast.request);
}

export default IUpdateIssuesAction;
export { isUpdateIssuesAction };
