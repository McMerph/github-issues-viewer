// TODO Rename to parameters?
export default interface IIssuesSettings {
  login?: string;
  perPage: number;
  repo?: string;
  currentPage: number;
  lastPage?: number;
}

export function isIssuesSettings(object: any): object is IIssuesSettings {
  const cast: IIssuesSettings = object as IIssuesSettings;
  return (!cast.login || typeof cast.login === "string") &&
    typeof cast.perPage === "number" &&
    (!cast.repo || typeof cast.repo === "string") &&
    typeof cast.currentPage === "number" &&
    (!cast.lastPage || typeof cast.lastPage === "number");
}
