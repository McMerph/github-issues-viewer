import { Dispatch } from "redux";
import ActionType from "./actions/ActionType";
import IUpdateIssuesAction from "./actions/IUpdateIssuesAction";
import IUpdateReposAction from "./actions/IUpdateReposAction";
import NotModified from "./api/NotModified";
import retrieveIssues from "./api/retrieveIssues";
import retrieveRepos from "./api/retrieveRepos";
import equalsIssuesRequests from "./entities/issues/equalsIssuesRequests";
import IIssuesCacheEntry from "./entities/issues/IIssuesCacheEntry";
import IIssuesRequest from "./entities/issues/IIssuesRequest";
import IIssuesResponse from "./entities/issues/IIssuesResponse";
import equalsReposRequests from "./entities/repos/equalsReposRequests";
import IRepo from "./entities/repos/IRepo";
import IReposCacheEntry from "./entities/repos/IReposCacheEntry";
import IReposRequest from "./entities/repos/IReposRequest";
import IStore from "./IStore";
import SETTINGS from "./settings";

const handleErrorResponse = (dispatch: Dispatch<IStore>, error: Error, type: ActionType): void => {
  dispatch({ error: error.message, type });
  // tslint:disable-next-line:no-console
  console.error(error.message);
};

const actionCreator = {
  retrieveIssues: (request: IIssuesRequest) => {
    return (dispatch: Dispatch<IStore>, getState: () => IStore) => {
      dispatch({ type: ActionType.SetIssuesLoading });

      const cacheEntry: IIssuesCacheEntry | undefined = getState().issues.cache
        .find((entry) => equalsIssuesRequests(entry.request, request));
      const requestETag: string | undefined = cacheEntry && cacheEntry.eTag;

      const handleSuccessResponse = (response: IIssuesResponse, eTag: string): void => {
        const updateIssuesAction: IUpdateIssuesAction = {
          eTag, request, response,
          type: ActionType.UpdateIssues,
        };
        dispatch(updateIssuesAction);
      };

      retrieveIssues(request, requestETag)
        .then((apiResponse) => {
          const { lastPageNumber, page, eTag } = apiResponse;
          handleSuccessResponse({ lastPageNumber, page }, eTag);
        })
        .catch((error) => {
          if (error instanceof NotModified && cacheEntry && requestETag) {
            const { lastPageNumber, page } = cacheEntry.response;
            handleSuccessResponse({ lastPageNumber, page }, requestETag);
          } else {
            handleErrorResponse(dispatch, error, ActionType.SetIssuesError);
          }
        });
    };
  },
  retrieveRepos: (login: string) => {
    let pageNumber: number = 1;
    return (dispatch: Dispatch<IStore>, getState: () => IStore) => {
      const retrievePage = (): void => {
        const request: IReposRequest = { login, pageNumber, perPage: SETTINGS.REPOS_PER_PAGE };
        const cacheEntry: IReposCacheEntry | undefined = getState().repos.cache
          .find((entry) => equalsReposRequests(entry.request, request));
        const requestETag: string | undefined = cacheEntry && cacheEntry.eTag;

        const handleSuccessResponse = (eTag: string, hasNext: boolean, response: IRepo[]): void => {
          const updateReposAction: IUpdateReposAction = {
            eTag, hasNext, request, response, type: ActionType.UpdateRepos,
          };
          dispatch(updateReposAction);
          if (hasNext) {
            pageNumber++;
            retrievePage();
          }
        };

        retrieveRepos(request, requestETag)
          .then((apiResponse) =>
            handleSuccessResponse(apiResponse.eTag, apiResponse.hasNext, apiResponse.page))
          .catch((error) => {
            if (error instanceof NotModified && cacheEntry && requestETag) {
              handleSuccessResponse(requestETag, cacheEntry.hasNext, cacheEntry.response);
            } else {
              handleErrorResponse(dispatch, error, ActionType.SetReposError);
            }
          });
      };
      dispatch({ type: ActionType.SetReposLoading });
      retrievePage();
    };
  },
};

export default actionCreator;
