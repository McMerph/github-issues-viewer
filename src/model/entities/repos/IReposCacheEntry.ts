import IRepo, { isRepo } from "./IRepo";
import IReposRequest, { isReposRequest } from "./IReposRequest";

export default interface IReposCacheEntry {
  eTag: string;
  hasNext: boolean;
  request: IReposRequest;
  response: IRepo[];
}

export function isReposCacheEntry(object: any): object is IReposCacheEntry {
  const cast: IReposCacheEntry = object as IReposCacheEntry;
  return typeof cast.eTag === "string" &&
    typeof cast.hasNext === "boolean" &&
    cast.request &&
    isReposRequest(cast.request) &&
    Array.isArray(cast.response) &&
    cast.response.every((repo) => isRepo(repo));
}
