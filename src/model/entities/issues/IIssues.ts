import IApiStatus from "../IApiStatus";
import IIssuesCacheEntry from "./IIssuesCacheEntry";
import IIssuesRequest from "./IIssuesRequest";
import IIssuesResponse from "./IIssuesResponse";

export default interface IIssues {
  apiStatus: IApiStatus;
  cache: IIssuesCacheEntry[];
  request?: IIssuesRequest;
  response?: IIssuesResponse;
}
