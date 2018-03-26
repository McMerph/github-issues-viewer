import IIssuesPage from "./IIssuesPage";
import IIssuesSettings from "./IIssuesSettings";

export interface ICachedIssue {
  eTag: string;
  page: IIssuesPage;
}

export default interface IIssues {
  cache: Map<string, ICachedIssue>;
  page?: IIssuesPage;
  settings: IIssuesSettings;
}
