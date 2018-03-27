import IIssue from "../entities/issues/IIssue";

export default interface IRetrieveIssuesResponse {
  eTag: string;
  lastPageNumber: number;
  page: IIssue[];
}
