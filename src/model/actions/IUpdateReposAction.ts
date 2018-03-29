import IRepo, { isRepo } from "../entities/repos/IRepo";
import IReposRequest, { isReposRequest } from "../entities/repos/IReposRequest";
import ActionType from "./ActionType";
import IAction from "./IAction";

export default interface IUpdateReposAction extends IAction {
  eTag: string;
  hasNext: boolean;
  request: IReposRequest;
  response: IRepo[];
}

export function isUpdateReposAction(action: IAction): action is IUpdateReposAction {
  const cast: IUpdateReposAction = action as IUpdateReposAction;
  return cast.type === ActionType.UpdateRepos &&
    typeof cast.eTag === "string" &&
    typeof cast.hasNext === "boolean" &&
    cast.request &&
    isReposRequest(cast.request) &&
    Array.isArray(cast.response) &&
    cast.response.every((repo) => isRepo(repo));
}
