import IIssue, { isIssue } from "./IIssue";

export default interface IIssuesResponse {
  lastPageNumber: number;
  page: IIssue[];
}

export function isIssuesResponse(object: any): object is IIssuesResponse {
  const cast: IIssuesResponse = object as IIssuesResponse;
  return typeof cast.lastPageNumber === "number" &&
    Array.isArray(cast.page) &&
    cast.page.every((issue) => isIssue(issue));
}
