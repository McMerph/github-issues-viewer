import throttle = require("lodash/throttle");
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import IIssues from "./entities/issues/IIssues";
import { isIssuesCacheEntry } from "./entities/issues/IIssuesCacheEntry";
import IRepos from "./entities/repos/IRepos";
import { isReposCacheEntry } from "./entities/repos/IReposCacheEntry";
import IStore from "./IStore";
import { loadState, saveState } from "./localStorage";
import combinedReducer from "./reducers";
import { defaultState as defaultIssuesState } from "./reducers/issues";
import { defaultState as defaultReposState } from "./reducers/repos";

const persistedState: any | undefined = loadState();

let persistedIssues: IIssues | undefined;
if (persistedState &&
  persistedState.issues &&
  persistedState.issues.cache &&
  Array.isArray(persistedState.issues.cache) &&
  persistedState.issues.cache.every((cacheEntry: any) => isIssuesCacheEntry(cacheEntry))) {
  persistedIssues = {
    ...defaultIssuesState,
    cache: persistedState.issues.cache,
  };
}

let persistedRepos: IRepos | undefined;
if (persistedState &&
  persistedState.repos &&
  persistedState.repos.cache &&
  Array.isArray(persistedState.repos.cache) &&
  persistedState.repos.cache.every((cacheEntry: any) => isReposCacheEntry(cacheEntry))) {
  persistedRepos = {
    ...defaultReposState,
    cache: persistedState.repos.cache,
  };
}

const store = createStore<IStore>(
  combinedReducer,
  {
    issues: persistedIssues || defaultIssuesState,
    repos: persistedRepos || defaultReposState,
  },
  composeWithDevTools(applyMiddleware(thunk)),
);

store.subscribe(throttle(() => {
  saveState({
    issues: { cache: store.getState().issues.cache },
    repos: { cache: store.getState().repos.cache },
  });
}, 1000));

export default store;
