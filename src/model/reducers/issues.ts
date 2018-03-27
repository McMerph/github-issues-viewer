import IAction from "../actions/IAction";
import { isAddIssuesAction } from "../actions/IAddIssuesAction";
import { isSetIssuesApiStateAction } from "../actions/ISetIssuesApiStateAction";
import ApiState from "../entities/ApiState";
import ICachedPage from "../entities/ICachedPage";
import IIssues from "../entities/IIssues";
import equalsIssuesSettings from "../utils";

const defaultState: IIssues = {
  apiState: ApiState.Idle,
  cache: [],
};

export const issues = (state: IIssues = defaultState, action: IAction): IIssues => {
  if (isAddIssuesAction(action)) {
    const { eTag, lastPage, page, settings } = action.payload;
    const cache: ICachedPage[] = [
      ...state.cache.filter((cachedPage) =>
        !equalsIssuesSettings(JSON.parse(cachedPage.settings), settings)),
      {
        eTag,
        lastPage,
        page,
        settings: JSON.stringify(settings),
      },
    ];

    return {
      apiState: state.apiState,
      cache,
      lastPage,
      page,
      settings,
    };
  } else if (isSetIssuesApiStateAction(action)) {
    return { cache: state.cache, apiState: action.state, apiError: action.error };
  } else {
    return state;
  }
};
