import ActionType from "../actions/ActionType";
import IAction from "../actions/IAction";
import IAddIssuesAction from "../actions/IAddIssuesAction";
import IIssues, { ICachedIssue } from "../entities/IIssues";
import IIssuesPage from "../entities/IIssuesPage";
import IIssuesSettings from "../entities/IIssuesSettings";
import { issues } from "./issues";

describe("issues() is a issues reducer", () => {
  test("issues() instantiates with correct initial state", () => {
    // Given
    const action: IAction = { type: ActionType.AddIssues };

    // When
    const state: IIssues = issues(undefined, action);

    // Then
    expect(state).toEqual({
      cache: new Map<string, ICachedIssue>(),
      settings: {
        currentPage: 1,
        perPage: 10,
      },
    });
  });

  test("issues() correctly handle addIssuesAction", () => {
    // Given
    const settings: IIssuesSettings = {
      currentPage: 1,
      lastPage: 3,
      login: "login",
      perPage: 10,
      repo: "repo",
    };
    const page: IIssuesPage = {
      issues: [
        {
          creationDate: new Date("2018-01-23T21:39:10Z"),
          number: 1,
          title: "title1",
        },
      ],
    };
    const eTag: string = "eTag";
    const addIssuesAction: IAddIssuesAction = {
      payload: { page, settings, eTag },
      type: ActionType.AddIssues,
    };

    // When
    const state: IIssues = issues(undefined, addIssuesAction);
    const cache: Map<string, ICachedIssue> = new Map();
    cache.set(JSON.stringify(settings), { page, eTag });

    // Then
    expect(state).toEqual({ cache, page, settings });
  });
});
