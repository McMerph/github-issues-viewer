import IRepo, { isRepo } from "../entities/IRepo";
import IReposSettings, { isReposSettings } from "../entities/IReposSettings";
import ActionType from "./ActionType";
import IAction from "./IAction";

export default interface ISetReposAction extends IAction {
  page: IRepo[];
  eTag: string;
  settings: IReposSettings;
}

export function isSetReposAction(action: IAction): action is ISetReposAction {
  const cast: ISetReposAction = action as ISetReposAction;
  return cast.type === ActionType.SetRepos &&
    typeof cast.eTag === "string" &&
    (Array.isArray(cast.page) && cast.page.every((repo) => isRepo(repo))) &&
    isReposSettings(cast.settings);
}
