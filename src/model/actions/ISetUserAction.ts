import IUser, { isUser } from "../entities/IUser";
import ActionType from "./ActionType";
import IAction from "./IAction";

export default interface ISetUserAction extends IAction {
  user: IUser;
}

export function isSetUserAction(action: IAction): action is ISetUserAction {
  const cast: ISetUserAction = action as ISetUserAction;
  return cast.type === ActionType.SetUser && cast.user && isUser(cast.user);
}
