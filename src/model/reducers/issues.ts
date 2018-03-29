import ActionType from "../actions/ActionType";
import IAction from "../actions/IAction";
import { isSetErrorAction } from "../actions/ISetErrorAction";
import { isUpdateIssuesAction } from "../actions/IUpdateIssuesAction";
import ApiState from "../entities/ApiState";
import equalsIssuesRequests from "../entities/issues/equalsIssuesRequests";
import IIssues from "../entities/issues/IIssues";
import IIssuesCacheEntry from "../entities/issues/IIssuesCacheEntry";

const defaultState: IIssues = {
  apiStatus: { state: ApiState.Idle },
  cache: [],
};

const issues = (state: IIssues = defaultState, action: IAction): IIssues => {
  if (isUpdateIssuesAction(action)) {
    const { eTag, request, response } = action;
    const cache: IIssuesCacheEntry[] = [
      ...state.cache.filter((cacheEntry) =>
        !equalsIssuesRequests(cacheEntry.request, request)),
      { eTag, request, response },
    ];

    return {
      apiStatus: { state: ApiState.Success },
      cache, request, response,
    };
  } else if (action.type === ActionType.SetIssuesError && isSetErrorAction(action)) {
    return {
      apiStatus: {
        error: action.error,
        state: ApiState.Error,
      },
      cache: state.cache,
    };
  } else if (action.type === ActionType.SetIssuesLoading) {
    return {
      apiStatus: { state: ApiState.Loading },
      cache: state.cache,
    };
  } else {
    // TODO WTF? just return state
    return { ...defaultState, ...state };
  }
};

export default issues;
export { defaultState };
