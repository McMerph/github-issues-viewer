import ActionType from "../actions/ActionType";
import IAction from "../actions/IAction";
import IAddIssuesAction from "../actions/IAddIssuesAction";
import IIssue from "../entities/IIssue";
import IIssues, { ICachedIssue } from "../entities/IIssues";
import IIssuesSettings from "../entities/IIssuesSettings";
import { issues } from "./issues";

describe("issues() is a issues reducer", () => {
  test("issues() instantiates with correct initial state", () => {
    // Given
    const action: IAction = { type: ActionType.AddIssues };

    // When
    const state: IIssues = issues(undefined, action);

    // Then
    expect(state).toEqual({ cache: [] });
  });

  test("issues() correctly handle addIssuesAction", () => {
    // Given
    const settings: IIssuesSettings = {
      login: "login",
      pageNumber: 1,
      perPage: 10,
      repo: "repo",
    };
    const page: IIssue[] = [
      {
        creationDate: new Date("2018-01-23T21:39:10Z").toString(),
        number: 1,
        title: "title1",
      },
    ];
    const lastPage = 3;
    const eTag: string = "eTag";
    const addIssuesAction: IAddIssuesAction = {
      payload: { page, settings, eTag, lastPage },
      type: ActionType.AddIssues,
    };
    const cache: ICachedIssue[] = [{ eTag, page, settings: JSON.stringify(settings), lastPage }];

    // When
    const state: IIssues = issues(undefined, addIssuesAction);

    // Then
    expect(state).toEqual({ cache, page, settings, lastPage });
  });
});
