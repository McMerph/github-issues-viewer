import { isIssue } from "./IIssue";
import IIssuesRequest, { isIssuesRequest } from "./IIssuesRequest";
import IIssuesResponse from "./IIssuesResponse";

export default interface IIssuesCacheEntry {
  eTag: string;
  request: IIssuesRequest;
  response: IIssuesResponse;
}

export function isIssuesCacheEntry(object: {}): object is IIssuesCacheEntry {
  const cast: IIssuesCacheEntry = object as IIssuesCacheEntry;
  return typeof cast.eTag === "string" &&
    cast.request &&
    isIssuesRequest(cast.request) &&
    typeof cast.response.lastPageNumber === "number" &&
    cast.response &&
    Array.isArray(cast.response.page) && cast.response.page.every((issue) => isIssue(issue));
}
