import ICachedReposPage from "./ICachedReposPage";
import IRepo from "./IRepo";
import IReposSettings from "./IReposSettings";
import ApiState from "../ApiState";

export default interface IRepos {
  apiState: ApiState;
  apiError?: string;
  cache: ICachedReposPage[];
  repos: IRepo[];
  settings?: IReposSettings;
}
