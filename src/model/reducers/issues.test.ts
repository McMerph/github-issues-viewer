import ActionType from "../actions/ActionType";
import IAction from "../actions/IAction";
import IUpdateIssuesAction from "../actions/IUpdateIssuesAction";
import ApiState from "../entities/ApiState";
import IApiStatus from "../entities/IApiStatus";
import IIssue from "../entities/issues/IIssue";
import IIssues from "../entities/issues/IIssues";
import IIssuesCacheEntry from "../entities/issues/IIssuesCacheEntry";
import IIssuesRequest from "../entities/issues/IIssuesRequest";
import IIssuesResponse from "../entities/issues/IIssuesResponse";
import { issues } from "./issues";

describe("issues() is a issues reducer", () => {
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

  test("issues() correctly handle addIssuesAction", () => {
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
      },
    ];
    const lastPage = 3;
    const eTag: string = "eTag";
    const updateIssuesAction: IUpdateIssuesAction = {
      apiStatus: {
        state: ApiState.Success,
      },
      eTag,
      request,
      response: {
        lastPageNumber: lastPage,
        page,
      },
      type: ActionType.UpdateIssues,
    };
    const response: IIssuesResponse = {
      lastPageNumber: lastPage,
      page,
    };
    const cache: IIssuesCacheEntry[] = [{
      eTag,
      request,
      response: {
        lastPageNumber: lastPage,
        page,
      },
    }];
    const apiStatus: IApiStatus = {
      state: ApiState.Success,
    };
    const expectedState: IIssues = {
      apiStatus,
      cache,
      request,
      response,
    };

    // When
    const state: IIssues = issues(undefined, updateIssuesAction);

    // Then
    expect(state).toEqual(expectedState);
  });
});
