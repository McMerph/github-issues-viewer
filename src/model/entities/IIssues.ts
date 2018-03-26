import ApiState from "./ApiState";
import ICachedPage from "./ICachedPage";
import IIssue from "./IIssue";
import IIssuesSettings from "./IIssuesSettings";

export default interface IIssues {
  apiState: ApiState;
  cache: ICachedPage[];
  lastPage?: number;
  page?: IIssue[];
  settings?: IIssuesSettings;
}
