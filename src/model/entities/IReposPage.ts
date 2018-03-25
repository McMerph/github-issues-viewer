import ApiState from "./ApiState";
import IRepo, { isRepo } from "./IRepo";

export default interface IReposPage {
  apiState: ApiState;
  eTag?: string;
  repos?: IRepo[];
}

export function isReposPage(object: any): object is IReposPage {
  const cast: IReposPage = object as IReposPage;
  const validApiState: boolean = Object.values(ApiState).includes(cast.apiState);
  const validETag: boolean = !cast.eTag || typeof cast.eTag === "string";
  const validRepos: boolean = !cast.repos ||
    (Array.isArray(cast.repos) &&
      cast.repos.every((repo) => isRepo(repo)));
  return validApiState && validETag && validRepos;
}
