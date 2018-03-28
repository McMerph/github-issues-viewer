import IApiStatus from "../IApiStatus";
import IRepo from "./IRepo";
import IReposCacheEntry from "./IReposCacheEntry";

export default interface IRepos {
  apiStatus: IApiStatus;
  cache: IReposCacheEntry[];
  list: IRepo[];
}
