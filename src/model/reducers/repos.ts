import IAction from "../actions/IAction";
import { isSetReposAction } from "../actions/ISetReposAction";
import ApiState from "../entities/ApiState";
import IRepos from "../entities/repos/IRepos";
import IReposCacheEntry from "../entities/repos/IReposCacheEntry";
import { equalsReposSettings } from "../utils";

const defaultState: IRepos = {
  apiStatus: {
    state: ApiState.Idle,
  },
  cache: [],
  list: [],
};

export const repos = (state: IRepos = defaultState, action: IAction): IRepos => {
  if (isSetReposAction(action)) {
    const { eTag, response, request } = action;
    const cache: IReposCacheEntry[] = [
      ...state.cache.filter((cachedEntry) =>
        !equalsReposSettings(cachedEntry.request, request)),
      {
        eTag,
        request,
        response,
      },
    ];

    return {
      apiStatus: {
        state: state.apiStatus.state,
      },
      cache,
      list: [...state.list, ...action.response],
    };
  } else {
    return state;
  }
};
