import ActionType from "../actions/ActionType";
import IAction from "../actions/IAction";
import IAddIssuesAction from "../actions/IAddIssuesAction";
import IIssuesList from "../entities/IIssuesList";
import IIssuesPage from "../entities/IIssuesPage";
import IIssuesSettings from "../entities/IIssuesSettings";
import { issues } from "./issues";

describe("issues() is a issues reducer", () => {
  test("issues() instantiates with correct initial state", () => {
    // Given
    const action: IAction = { type: ActionType.AddIssues };

    // When
    const state: IIssuesList = issues(undefined, action);

    // Then
    expect(state).toEqual({
      currentPage: 1,
      pages: [],
      settings: { perPage: 10 },
    });
  });

  test("issues() correctly handle addIssuesAction", () => {
    // Given
    const settings: IIssuesSettings = {
      login: "login",
      perPage: 10,
      repo: "repo",
    };
    const page: IIssuesPage = {
      eTag: "eTag",
      issues: [
        {
          creationDate: new Date("2018-01-23T21:39:10Z"),
          number: 1,
          title: "title1",
        },
      ],
    };
    const addIssuesAction: IAddIssuesAction = {
      payload: {
        page,
        pageNumber: 1,
        settings,
      },
      type: ActionType.AddIssues,
    };

    // When
    const state: IIssuesList = issues(undefined, addIssuesAction);

    // Then
    expect(state).toEqual({
      currentPage: 1,
      pages: [page],
      settings,
    });
  });
});
