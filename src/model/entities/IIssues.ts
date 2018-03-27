import ApiState from "./ApiState";
import ICachedIssuesPage from "./ICachedIssuesPage";
import IIssue from "./IIssue";
import IIssuesSettings from "./IIssuesSettings";

export default interface IIssues {
  apiState: ApiState;
  cache: ICachedIssuesPage[];
  apiError?: string;
  settings?: IIssuesSettings;
  page?: IIssue[];
  lastPage?: number;
}
