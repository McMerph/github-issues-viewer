import IAction from "./IAction";

export default interface ISetErrorAction extends IAction {
  error: string;
}

export function isSetErrorAction(action: IAction): action is ISetErrorAction {
  const cast: ISetErrorAction = action as ISetErrorAction;
  return typeof cast.error === "string";
}
