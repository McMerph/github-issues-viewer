import IAction from "../actions/IAction";
import { isAddIssuesAction } from "../actions/IAddIssuesAction";
import IIssues, { ICachedIssue } from "../entities/IIssues";

const defaultState: IIssues = {
  cache: [],
};

export const issues = (state: IIssues = defaultState, action: IAction): IIssues => {
  if (isAddIssuesAction(action)) {
    const { page, eTag, lastPage } = action.payload;
    const { settings } = action.payload;
    const cache: ICachedIssue[] = [
      ...state.cache.filter((cachedPage) => cachedPage.eTag !== eTag),
      { eTag, page, settings: JSON.stringify(settings), lastPage },
    ];

    return { page, settings, cache, lastPage };
  } else {
    return state;
  }
};
