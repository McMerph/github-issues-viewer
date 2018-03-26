import IIssue, { isIssue } from "./IIssue";

export default interface ICachedPage {
  eTag: string;
  settings: string;
  page: IIssue[];
  lastPage: number;
}

export function isCachedPage(object: any): object is ICachedPage {
  const cast: ICachedPage = object as ICachedPage;
  return typeof cast.eTag === "string" &&
    typeof cast.settings === "string" &&
    typeof cast.lastPage === "number" &&
    Array.isArray(cast.page) && cast.page.every((issue) => isIssue(issue));
}
