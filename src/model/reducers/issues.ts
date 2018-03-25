import IAction from "../actions/IAction";
import { isAddIssuesAction } from "../actions/IAddIssuesAction";
import IIssuesList from "../entities/IIssuesList";
import IIssuesPage from "../entities/IIssuesPage";
import IIssuesSettings from "../entities/IIssuesSettings";

const defaultState: IIssuesList = {
  currentPage: 1,
  pages: [],
  settings: { perPage: 10 },
};

function equals(settings1: IIssuesSettings, settings2: IIssuesSettings): boolean {
  return settings1.login === settings2.login &&
    settings1.perPage === settings2.perPage &&
    settings1.repo === settings2.repo;
}

export const issues = (state: IIssuesList = defaultState, action: IAction): IIssuesList => {
  if (isAddIssuesAction(action)) {
    const { settings, pageNumber, page } = action.payload;
    const pages: IIssuesPage[] = equals(settings, state.settings) ? [...state.pages] : [];
    pages[pageNumber - 1] = page;

    return {
      currentPage: state.currentPage,
      pages,
      settings,
    };
  } else {
    return state;
  }
};
