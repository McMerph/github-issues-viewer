import IAction from "../actions/IAction";
import { isSetUserAction } from "../actions/ISetUserAction";
import ApiState from "../entities/ApiState";
import IUser from "../entities/IUser";

export const user = (state: IUser = { apiState: ApiState.Idle }, action: IAction): IUser => {
  if (isSetUserAction(action)) {
    return { ...action.user };
  } else {
    return state;
  }
};
