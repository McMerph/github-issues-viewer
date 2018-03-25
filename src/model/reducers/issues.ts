import IAction from "../actions/IAction";
import { isSetIssuesAction } from "../actions/ISetIssuesAction";
import IIssuesPage from "../entities/IIssuesPage";

export const issues = (state: IIssuesPage[] = [], action: IAction): IIssuesPage[] => {
  if (isSetIssuesAction(action)) {
    const newState = [...state];
    newState[action.page - 1] = action.issues;
    return newState;
  } else {
    return state;
  }
};
