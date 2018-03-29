import ActionType from "../actions/ActionType";
import IAction from "../actions/IAction";
import ISetErrorAction from "../actions/ISetErrorAction";
import IUpdateIssuesAction from "../actions/IUpdateIssuesAction";
import ApiState from "../entities/ApiState";
import IIssue from "../entities/issues/IIssue";
import IIssues from "../entities/issues/IIssues";
import IIssuesRequest from "../entities/issues/IIssuesRequest";
import issues from "./issues";

describe("issues() is a reducer for issues of current repository", () => {
  test("issues() instantiates with correct initial state", () => {
    // Given
    const action: IAction = { type: ActionType.UpdateIssues };
    const expectedState: IIssues = {
      apiStatus: {
        state: ApiState.Idle,
      },
      cache: [],
    };

    // When
    const state: IIssues = issues(undefined, action);

    // Then
    expect(state).toEqual(expectedState);
  });

  test("issues() correctly handle loading action", () => {
    // Given
    const action: IAction = { type: ActionType.SetIssuesLoading };
    const expectedState: IIssues = {
      apiStatus: {
        state: ApiState.Loading,
      },
      cache: [],
    };

    // When
    const state: IIssues = issues(undefined, action);

    // Then
    expect(state).toEqual(expectedState);
  });

  test("issues() correctly handle error action", () => {
    // Given
    const error: string = "It's not an error. It's test.";
    const errorAction: ISetErrorAction = {
      error,
      type: ActionType.SetIssuesError,
    };
    const expectedState: IIssues = {
      apiStatus: {
        error,
        state: ApiState.Error,
      },
      cache: [],
    };

    // When
    const state: IIssues = issues(undefined, errorAction);

    // Then
    expect(state).toEqual(expectedState);
  });

  test("issues() correctly handle update action", () => {
    // Given
    const request: IIssuesRequest = {
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
        url: "issueUrl",
        user: {
          avatar: "avatarUel",
          login: "userLogin",
          profile: "profileUrl",
        },
      },
    ];
    const lastPageNumber = 3;
    const eTag: string = "eTag";
    const updateIssuesAction: IUpdateIssuesAction = {
      eTag,
      request,
      response: {
        lastPageNumber,
        page,
      },
      type: ActionType.UpdateIssues,
    };
    const expectedState: IIssues = {
      apiStatus: { state: ApiState.Success },
      cache: [{
        eTag,
        request,
        response: {
          lastPageNumber,
          page,
        },
      }],
      request,
      response: {
        lastPageNumber,
        page,
      },
    };

    // When
    const state: IIssues = issues(undefined, updateIssuesAction);

    // Then
    expect(state).toEqual(expectedState);
  });
});
