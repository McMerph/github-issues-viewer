import IIssuesRequest, { isIssuesRequest } from "../entities/issues/IIssuesRequest";
import IIssuesResponse, { isIssuesResponse } from "../entities/issues/IIssuesResponse";
import ActionType from "./ActionType";
import IAction from "./IAction";

interface IUpdateIssuesAction extends IAction {
  eTag: string;
  request: IIssuesRequest;
  response: IIssuesResponse;
}

function isUpdateIssuesAction(action: IAction): action is IUpdateIssuesAction {
  const cast: IUpdateIssuesAction = action as IUpdateIssuesAction;
  return action.type === ActionType.UpdateIssues &&
    typeof cast.eTag === "string" &&
    cast.request &&
    isIssuesRequest(cast.request) &&
    cast.response &&
    isIssuesResponse(cast.response);
}

export default IUpdateIssuesAction;
export { isUpdateIssuesAction };
