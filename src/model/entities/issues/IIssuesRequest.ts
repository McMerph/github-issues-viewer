export default interface IIssuesRequest {
  login: string;
  pageNumber: number;
  perPage: number;
  repo: string;
}

export function isIssuesRequest(object: any): object is IIssuesRequest {
  const cast: IIssuesRequest = object as IIssuesRequest;
  return typeof cast.login === "string" &&
    typeof cast.pageNumber === "number" &&
    typeof cast.perPage === "number" &&
    typeof cast.repo === "string";
}
