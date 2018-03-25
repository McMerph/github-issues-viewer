export default interface IIssuesSettings {
  login?: string;
  perPage: number;
  repo?: string;
}

export function isIssuesSettings(object: any): object is IIssuesSettings {
  const cast: IIssuesSettings = object as IIssuesSettings;
  return (!cast.login || typeof cast.login === "string") &&
    typeof cast.perPage === "number" &&
    (!cast.repo || typeof cast.repo === "string");
}
