import ActionType from "../actions/ActionType";
import IAction from "../actions/IAction";
import { isSetIssuesErrorAction } from "../actions/ISetIssuesErrorAction";
import { isUpdateIssuesAction } from "../actions/IUpdateIssuesAction";
import ApiState from "../entities/ApiState";
import IIssues from "../entities/issues/IIssues";
import IIssuesCacheEntry from "../entities/issues/IIssuesCacheEntry";
import { equalsIssuesRequests } from "../utils";

const defaultState: IIssues = {
  apiStatus: {
    state: ApiState.Idle,
  },
  cache: [],
};

export const issues = (state: IIssues = defaultState, action: IAction): IIssues => {
  if (isUpdateIssuesAction(action)) {
    const { eTag, request, apiStatus } = action;
    const { lastPageNumber, page } = action.response;
    const cache: IIssuesCacheEntry[] = [
      ...state.cache.filter((cachedEntry) =>
        !equalsIssuesRequests(cachedEntry.request, request)),
      {
        eTag,
        request,
        response: {
          lastPageNumber,
          page,
        },
      },
    ];

    return {
      apiStatus,
      cache,
      request,
      response: action.response,
    };
  } else if (isSetIssuesErrorAction(action)) {
    return {
      apiStatus: {
        error: action.error,
        state: ApiState.Error,
      },
      cache: state.cache,
    };

    // TODO Pass request?
  } else if (action.type === ActionType.SetIssuesLoading) {
    return {
      apiStatus: {
        state: ApiState.Loading,
      },
      cache: state.cache,
    };
  } else {
    // TODO WTF? just return state
    return { ...defaultState, ...state };
  }
};
