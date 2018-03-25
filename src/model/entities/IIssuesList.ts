import IIssuesPage from "./IIssuesPage";
import IIssuesSettings from "./IIssuesSettings";

export default interface IIssuesList {
  currentPage: number;
  lastPage?: number;
  pages: IIssuesPage[];
  settings: IIssuesSettings;
}
