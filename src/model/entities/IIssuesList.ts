import IIssuesPage from "./IIssuesPage";
import IIssuesSettings from "./IIssuesSettings";

export default interface IIssuesList {
  currentPage: number;
  pages: IIssuesPage[];
  settings: IIssuesSettings;
}
