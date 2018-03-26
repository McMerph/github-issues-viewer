import IAction from "../actions/IAction";
import { isAddIssuesAction } from "../actions/IAddIssuesAction";
import IIssues, { ICachedIssue } from "../entities/IIssues";

const defaultState: IIssues = {
  cache: new Map<string, ICachedIssue>(),
  settings: {
    currentPage: 1,
    perPage: 10,
  },
};

export const issues = (state: IIssues = defaultState, action: IAction): IIssues => {
  if (isAddIssuesAction(action)) {
    const { page, eTag, lastPage } = action.payload;
    const { settings } = action.payload;
    const cache: Map<string, ICachedIssue> = new Map(state.cache);
    cache.set(JSON.stringify(settings), { page, eTag });

    return { page, settings, cache, lastPage };
  } else {
    return state;
  }
};
