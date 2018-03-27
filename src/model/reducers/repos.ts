import IAction from "../actions/IAction";
import { isSetReposAction } from "../actions/ISetReposAction";
import ApiState from "../entities/ApiState";
import ICachedReposPage from "../entities/repos/ICachedReposPage";
import IRepos from "../entities/repos/IRepos";
import { equalsReposSettings } from "../utils";

const defaultState: IRepos = {
  apiState: ApiState.Idle,
  cache: [],
  repos: [],
};

export const repos = (state: IRepos = defaultState, action: IAction): IRepos => {
  if (isSetReposAction(action)) {
    const { eTag, page, settings } = action;
    const cache: ICachedReposPage[] = [
      ...state.cache.filter((cachedPage) =>
        !equalsReposSettings(JSON.parse(cachedPage.settings), settings)),
      {
        eTag,
        page,
        settings: JSON.stringify(settings),
      },
    ];

    return {
      apiState: state.apiState,
      cache,
      repos: [...state.repos, ...action.page],
      settings,
    };
  } else {
    return state;
  }
};
