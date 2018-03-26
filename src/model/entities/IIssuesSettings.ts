// TODO Rename to parameters?
export default interface IIssuesSettings {
  login?: string;
  repo?: string;
  currentPage: number;
  perPage: number;
}

export function isIssuesSettings(object: any): object is IIssuesSettings {
  const cast: IIssuesSettings = object as IIssuesSettings;
  return (!cast.login || typeof cast.login === "string") &&
    typeof cast.perPage === "number" &&
    (!cast.repo || typeof cast.repo === "string") &&
    typeof cast.currentPage === "number";
}
