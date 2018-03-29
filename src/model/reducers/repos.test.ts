import ActionType from "../actions/ActionType";
import IAction from "../actions/IAction";
import ISetErrorAction from "../actions/ISetErrorAction";
import IUpdateReposAction from "../actions/IUpdateReposAction";
import ApiState from "../entities/ApiState";
import IRepo from "../entities/repos/IRepo";
import IRepos from "../entities/repos/IRepos";
import IReposRequest from "../entities/repos/IReposRequest";
import repos from "./repos";

describe("repos() is a reducer for repositories of current user", () => {
  test("repos() instantiates with correct initial state", () => {
    // Given
    const action: IAction = { type: ActionType.UpdateRepos };
    const expectedState: IRepos = {
      apiStatus: {
        state: ApiState.Idle,
      },
      cache: [],
    };

    // When
    const state: IRepos = repos(undefined, action);

    // Then
    expect(state).toEqual(expectedState);
  });

  test("repos() correctly handle loading action", () => {
    // Given
    const action: IAction = { type: ActionType.SetReposLoading };
    const expectedState: IRepos = {
      apiStatus: {
        state: ApiState.Loading,
      },
      cache: [],
      list: [],
    };

    // When
    const state: IRepos = repos(undefined, action);

    // Then
    expect(state).toEqual(expectedState);
  });

  test("repos() correctly handle error action", () => {
    // Given
    const error: string = "It's not an error. It's test.";
    const errorAction: ISetErrorAction = {
      error,
      type: ActionType.SetReposError,
    };
    const expectedState: IRepos = {
      apiStatus: {
        error,
        state: ApiState.Error,
      },
      cache: [],
    };

    // When
    const state: IRepos = repos(undefined, errorAction);

    // Then
    expect(state).toEqual(expectedState);
  });

  test("repos() correctly handle update action", () => {
    // Given
    const login: string = "login";
    const eTag: string = "eTag";
    const hasNext: boolean = false;
    const request: IReposRequest = {
      login,
      pageNumber: 1,
      perPage: 10,
    };
    const response: IRepo[] = [
      {
        issues: 42,
        name: "Number 1",
      },
    ];
    const updateReposAction: IUpdateReposAction = {
      eTag, hasNext, request, response, type: ActionType.UpdateRepos,
    };
    const expectedState: IRepos = {
      apiStatus: { state: ApiState.Success },
      cache: [{ eTag, request, response, hasNext }],
      list: response,
      login,
    };

    // When
    const state: IRepos = repos(undefined, updateReposAction);

    // Then
    expect(state).toEqual(expectedState);
  });
});
