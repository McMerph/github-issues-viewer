import ApiState from "./ApiState";

export default interface IApiStatus {
  error?: string;
  state: ApiState;
}
