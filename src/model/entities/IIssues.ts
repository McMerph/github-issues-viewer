import IIssuesSettings from "./IIssuesSettings";
import IIssue from "./IIssue";

export interface ICachedIssue {
  eTag: string;
  page: IIssue[];
}

export default interface IIssues {
  cache: Map<string, ICachedIssue>;
  page?: IIssue[];
  settings: IIssuesSettings;
  lastPage?: number;
}
