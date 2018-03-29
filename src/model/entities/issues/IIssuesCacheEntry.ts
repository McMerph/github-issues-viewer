import IIssuesRequest, { isIssuesRequest } from "./IIssuesRequest";
import IIssuesResponse, { isIssuesResponse } from "./IIssuesResponse";

export default interface IIssuesCacheEntry {
  eTag: string;
  request: IIssuesRequest;
  response: IIssuesResponse;
}

export function isIssuesCacheEntry(object: any): object is IIssuesCacheEntry {
  const cast: IIssuesCacheEntry = object as IIssuesCacheEntry;
  return typeof cast.eTag === "string" &&
    cast.request &&
    isIssuesRequest(cast.request) &&
    cast.response &&
    isIssuesResponse(cast.response);
}
