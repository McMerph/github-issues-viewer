import ApiState from "./ApiState";

export default interface IApiStatus {
  error?: string;
  state: ApiState;
}

export function isApiStatus(object: any): object is IApiStatus {
  const cast: IApiStatus = object as IApiStatus;
  return (!cast.error || typeof cast.error === "string") &&
    Object.values(ApiState).includes(cast.state);
}
