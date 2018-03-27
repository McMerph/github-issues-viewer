import IIssue, { isIssue } from "./IIssue";

export default interface ICachedIssuesPage {
  eTag: string;
  settings: string;
  page: IIssue[];
  lastPage: number;
}

export function isCachedIssuesPage(object: any): object is ICachedIssuesPage {
  const cast: ICachedIssuesPage = object as ICachedIssuesPage;
  return typeof cast.eTag === "string" &&
    typeof cast.settings === "string" &&
    typeof cast.lastPage === "number" &&
    Array.isArray(cast.page) && cast.page.every((issue) => isIssue(issue));
}
