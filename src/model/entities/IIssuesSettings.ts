// TODO Rename to request parameters?
export default interface IIssuesSettings {
  login: string;
  repo: string;
  pageNumber: number;
  perPage: number;
}

export function isIssuesSettings(object: any): object is IIssuesSettings {
  const cast: IIssuesSettings = object as IIssuesSettings;
  return typeof cast.login === "string" &&
    typeof cast.perPage === "number" &&
    typeof cast.repo === "string" &&
    typeof cast.pageNumber === "number";
}
