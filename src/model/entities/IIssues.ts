import ICachedPage from "./ICachedPage";
import IIssue from "./IIssue";
import IIssuesSettings from "./IIssuesSettings";

export default interface IIssues {
  cache: ICachedPage[];
  page?: IIssue[];
  settings?: IIssuesSettings;
  lastPage?: number;
}
