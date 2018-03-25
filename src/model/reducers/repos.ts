import IAction from "../actions/IAction";
import { isSetReposAction } from "../actions/ISetReposAction";
import IReposPage from "../entities/IReposPage";

export const repos = (state: IReposPage[] = [], action: IAction): IReposPage[] => {
  if (isSetReposAction(action)) {
    const newState = [...state];
    newState[action.page - 1] = action.repos;
    return newState;
  } else {
    return state;
  }
};
