import IRepo, { isRepo } from "../entities/repos/IRepo";
import IReposRequest, { isReposRequest } from "../entities/repos/IReposRequest";
import ActionType from "./ActionType";
import IAction from "./IAction";

export default interface ISetReposAction extends IAction {
  eTag: string;
  request: IReposRequest;
  response: IRepo[];
}

export function isSetReposAction(action: IAction): action is ISetReposAction {
  const cast: ISetReposAction = action as ISetReposAction;
  return cast.type === ActionType.SetRepos &&
    typeof cast.eTag === "string" &&
    (Array.isArray(cast.response) && cast.response.every((repo) => isRepo(repo))) &&
    isReposRequest(cast.request);
}
