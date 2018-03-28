import throttle = require("lodash/throttle");
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import IStore from "./IStore";
import { loadState, saveState } from "./localStorage";
import combinedReducer from "./reducers";

// TODO Spread persisted state with default states of reducers?
const persistedState = loadState() || {};
const store = createStore<IStore>(
  combinedReducer,
  persistedState as IStore,
  composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(throttle(() => {
  saveState({
    issues: {
      cache: store.getState().issues.cache,
    },
  });
}, 1000));

export default store;
