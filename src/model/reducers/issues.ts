import IAction from "../actions/IAction";
import { isAddIssuesAction } from "../actions/IAddIssuesAction";
import IIssues, { ICachedIssue } from "../entities/IIssues";
import IIssuesSettings from "../entities/IIssuesSettings";

const defaultState: IIssues = {
  cache: new Map<string, ICachedIssue>(),
  settings: {
    currentPage: 1,
    perPage: 10,
  },
};

// function equals(settings1: IIssuesSettings, settings2: IIssuesSettings): boolean {
//   return settings1.login === settings2.login &&
//     settings1.perPage === settings2.perPage &&
//     settings1.repo === settings2.repo;
// }

export const issues = (state: IIssues = defaultState, action: IAction): IIssues => {
  if (isAddIssuesAction(action)) {
    const { page, eTag } = action.payload;
    const { currentPage, lastPage } = action.payload.settings;
    const { settings: actionSettings } = action.payload;
    // TODO Delete?
    // const pages: IIssuesPage[] = equals(actionSettings, state.settings) ? [...state.pages] : [];
    // pages[currentPage - 1] = page;
    const settings: IIssuesSettings = { ...actionSettings, currentPage, lastPage };
    const cache: Map<string, ICachedIssue> = new Map(state.cache);
    cache.set(JSON.stringify(settings), { page, eTag });

    return { page, settings, cache };
  } else {
    return state;
  }
};
