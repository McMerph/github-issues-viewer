import ApiState from "./ApiState";
import ICachedReposPage from "./ICachedReposPage";
import IRepo from "./IRepo";
import IReposSettings from "./IReposSettings";

export default interface IRepos {
  apiState: ApiState;
  cache: ICachedReposPage[];
  repos: IRepo[];
  apiError?: string;
  settings?: IReposSettings;
}
