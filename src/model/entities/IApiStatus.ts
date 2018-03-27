import ApiState from "./ApiState";

export default interface IApiStatus {
  state: ApiState;
  error?: string;
}

export function isApiStatus(object: any): object is IApiStatus {
  const cast: IApiStatus = object as IApiStatus;
  return Object.values(ApiState).includes(cast.state) &&
    (!cast.error || typeof cast.error === "string");
}
