// TODO Rename to request parameters?
export default interface IReposSettings {
  login: string;
  pageNumber: number;
  perPage: number;
}

export function isReposSettings(object: any): object is IReposSettings {
  const cast: IReposSettings = object as IReposSettings;
  return typeof cast.login === "string" &&
    typeof cast.pageNumber === "number" &&
    typeof cast.perPage === "number";
}
