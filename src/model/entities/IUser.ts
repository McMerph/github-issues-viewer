import ApiState from "./ApiState";

export default interface IUser {
  apiState: ApiState;
  login?: string;
  avatarUrl?: string;
  eTag?: string;
}

export function isUser(object: any): object is IUser {
  const cast: IUser = object as IUser;
  return Object.values(ApiState).includes(cast.apiState);
}
