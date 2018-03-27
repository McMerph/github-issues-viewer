export default interface IIssuesRequest {
  login: string;
  repo: string;
  pageNumber: number;
  perPage: number;
}

export function isIssuesRequest(object: {}): object is IIssuesRequest {
  const cast: IIssuesRequest = object as IIssuesRequest;
  return typeof cast.login === "string" &&
    typeof cast.perPage === "number" &&
    typeof cast.repo === "string" &&
    typeof cast.pageNumber === "number";
}
