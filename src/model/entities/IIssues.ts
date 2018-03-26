import IIssuesSettings from "./IIssuesSettings";
import IIssue, { isIssue } from "./IIssue";

// TODO Rename to ICachedPage;
export interface ICachedIssue {
  eTag: string;
  settings: string;
  page: IIssue[];
  lastPage: number;
}

export function isCachedIssue(object: any): object is ICachedIssue {
  const cast: ICachedIssue = object as ICachedIssue;
  return typeof cast.eTag === "string" &&
    typeof cast.settings === "string" &&
    typeof cast.lastPage === "number" &&
    Array.isArray(cast.page) && cast.page.every((issue) => isIssue(issue));
}

export default interface IIssues {
  cache: ICachedIssue[];
  page?: IIssue[];
  settings?: IIssuesSettings;
  lastPage?: number;
}
