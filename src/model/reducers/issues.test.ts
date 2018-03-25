import ActionType from "../actions/ActionType";
import IAction from "../actions/IAction";
import ISetIssuesAction from "../actions/ISetIssuesAction";
import ApiState from "../entities/ApiState";
import IIssuesPage from "../entities/IIssuesPage";
import { issues } from "./issues";

describe("issues() is a reducer for repositories of current user", () => {
  test("issues() instantiated with correct initial state", () => {
    // Given
    const action: IAction = { type: ActionType.SetIssues, };

    // When
    const state: IIssuesPage[] = issues(undefined, action);

    // Then
    expect(state).toEqual([]);
  });

  test("issues() correctly handle apiState change", () => {
    // Given
    const setIssuesAction: ISetIssuesAction = {
      issues: { apiState: ApiState.Error },
      page: 1,
      type: ActionType.SetIssues,
    };

    // When
    const state: IIssuesPage[] = issues(undefined, setIssuesAction);

    // Then
    expect(state).toEqual([{ apiState: ApiState.Error }]);
  });

  test("issues() correctly set issues fields", () => {
    // Given
    const issuesState: IIssuesPage = {
        apiState: ApiState.Success,
        eTag: "Loremipsumdolorsitamet,consecteturadipisicingelit.Culpalaudantium",
        issues: [
          { title: "title1", number: 1, creationDate: new Date("2018-01-23T21:39:10Z") },
          { title: "title2", number: 2, creationDate: new Date("2018-03-23T21:39:10Z") },
        ],
      }
    ;
    const setIssuesAction: ISetIssuesAction = {
      issues: issuesState,
      page: 2,
      type: ActionType.SetIssues,
    };

    // When
    const state: IIssuesPage[] = issues(undefined, setIssuesAction);

    // Then
    expect(state).toEqual([undefined, {
      apiState: ApiState.Success,
      eTag: "Loremipsumdolorsitamet,consecteturadipisicingelit.Culpalaudantium",
      issues: [
        { title: "title1", number: 1, creationDate: new Date("2018-01-23T21:39:10Z") },
        { title: "title2", number: 2, creationDate: new Date("2018-03-23T21:39:10Z") },
      ],
    }]);
  });
});
