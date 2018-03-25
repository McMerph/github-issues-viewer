import ActionType from "../actions/ActionType";
import IAction from "../actions/IAction";
import ISetReposAction from "../actions/ISetReposAction";
import ApiState from "../entities/ApiState";
import IReposPage from "../entities/IReposPage";
import { repos } from "./repos";

describe("repos() is a reducer for repositories of current user", () => {
  test("repos() instantiated with correct initial state", () => {
    // Given
    const action: IAction = {
      type: ActionType.SetUser,
    };

    // When
    const state: IReposPage[] = repos(undefined, action);

    // Then
    expect(state).toEqual([]);
  });

  test("repos() correctly handle apiState change", () => {
    // Given
    const setReposAction: ISetReposAction = {
      page: 1,
      repos: { apiState: ApiState.Error },
      type: ActionType.SetRepos,
    };

    // When
    const state: IReposPage[] = repos(undefined, setReposAction);

    // Then
    expect(state).toEqual([{ apiState: ApiState.Error }]);
  });

  test("repos() correctly set repos fields", () => {
    // Given
    const reposState: IReposPage = {
      apiState: ApiState.Success,
      eTag: "Loremipsumdolorsitamet,consecteturadipisicingelit.Culpalaudantium",
      repos: [
        { name: "name1", issues: 17 },
        { name: "name2", issues: 0 },
      ],
    };
    const setReposAction: ISetReposAction = {
      page: 2,
      repos: reposState,
      type: ActionType.SetRepos,
    };

    // When
    const state: IReposPage[] = repos(undefined, setReposAction);

    // Then
    expect(state).toEqual([undefined, {
      apiState: ApiState.Success,
      eTag: "Loremipsumdolorsitamet,consecteturadipisicingelit.Culpalaudantium",
      repos: [
        { name: "name1", issues: 17 },
        { name: "name2", issues: 0 },
      ],
    }]);
  });
});
