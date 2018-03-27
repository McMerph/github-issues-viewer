import IIssue from "./IIssue";

export default interface IIssuesResponse {
  page: IIssue[];
  lastPageNumber: number;
}
