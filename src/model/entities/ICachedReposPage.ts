import IRepo, { isRepo } from "./IRepo";

export default interface ICachedReposPage {
  eTag: string;
  settings: string;
  page: IRepo[];
}

export function isCachedReposPage(object: any): object is ICachedReposPage {
  const cast: ICachedReposPage = object as ICachedReposPage;
  return typeof cast.eTag === "string" &&
    typeof cast.settings === "string" &&
    Array.isArray(cast.page) && cast.page.every((repo) => isRepo(repo));
}
