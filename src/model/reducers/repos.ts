import ActionType from "../actions/ActionType";
import IAction from "../actions/IAction";
import { isSetErrorAction } from "../actions/ISetErrorAction";
import { isUpdateReposAction } from "../actions/IUpdateReposAction";
import ApiState from "../entities/ApiState";
import equalsReposRequests from "../entities/repos/equalsReposRequests";
import IRepos from "../entities/repos/IRepos";
import IReposCacheEntry from "../entities/repos/IReposCacheEntry";

const defaultState: IRepos = {
  apiStatus: { state: ApiState.Idle },
  cache: [],
};

export const repos = (state: IRepos = defaultState, action: IAction): IRepos => {
  if (isUpdateReposAction(action)) {
    const { eTag, hasNext, request, response } = action;
    const cache: IReposCacheEntry[] = [
      ...state.cache.filter((cacheEntry) =>
        !equalsReposRequests(cacheEntry.request, request)),
      { eTag, hasNext, request, response },
    ];

    return {
      apiStatus: {
        state: hasNext ? ApiState.Loading : ApiState.Success,
      },
      cache,
      list: [...(state.list || []), ...action.response],
      login: action.request.login,
    };
  } else if (action.type === ActionType.SetReposError && isSetErrorAction(action)) {
    return {
      apiStatus: {
        error: action.error,
        state: ApiState.Error,
      },
      cache: state.cache,
      list: state.list,
    };
  } else if (action.type === ActionType.SetReposLoading) {
    return {
      apiStatus: { state: ApiState.Loading },
      cache: state.cache,
      list: [],
    };
  } else {
    // TODO WTF? just return state
    return { ...defaultState, ...state };
  }
};
