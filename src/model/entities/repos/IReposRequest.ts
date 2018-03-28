export default interface IReposRequest {
  login: string;
  pageNumber: number;
  perPage: number;
}

export function isReposRequest(object: {}): object is IReposRequest {
  const cast: IReposRequest = object as IReposRequest;
  return typeof cast.login === "string" &&
    typeof cast.pageNumber === "number" &&
    typeof cast.perPage === "number";
}
