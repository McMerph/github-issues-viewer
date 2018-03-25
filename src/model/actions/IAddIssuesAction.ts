import IIssuesPage, { isIssuesPage } from "../entities/IIssuesPage";
import IIssuesSettings, { isIssuesSettings } from "../entities/IIssuesSettings";
import ActionType from "./ActionType";
import IAction from "./IAction";

interface IAddIssuesAction extends IAction {
  payload: IAddIssuesActionPayload;
}

// TODO Split to own file?
interface IAddIssuesActionPayload {
  settings: IIssuesSettings;
  page: IIssuesPage;
  pageNumber: number;
  lastPageNumber?: number;
}

// TODO Split to own file?
function isAddIssuesAction(action: IAction): action is IAddIssuesAction {
  const cast: IAddIssuesAction = action as IAddIssuesAction;
  return action.type === ActionType.AddIssues &&
    cast.payload &&
    !!cast.payload.pageNumber && typeof cast.payload.pageNumber === "number" &&
    cast.payload.settings && isIssuesSettings(cast.payload.settings) &&
    cast.payload.page && isIssuesPage(cast.payload.page);
}

export default IAddIssuesAction;
export { IAddIssuesActionPayload, isAddIssuesAction };