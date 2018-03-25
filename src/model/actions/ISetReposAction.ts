import IReposPage, { isReposPage } from "../entities/IReposPage";
import ActionType from "./ActionType";
import IAction from "./IAction";

export default interface ISetReposAction extends IAction {
  repos: IReposPage;
  page: number;
}

export function isSetReposAction(action: IAction): action is ISetReposAction {
  const cast: ISetReposAction = action as ISetReposAction;
  return cast.type === ActionType.SetRepos &&
    typeof cast.page === "number" &&
    cast.repos && isReposPage(cast.repos);
}
