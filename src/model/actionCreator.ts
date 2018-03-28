import { Dispatch } from "redux";
import ActionType from "./actions/ActionType";
import ISetIssuesErrorAction from "./actions/ISetIssuesErrorAction";
import ISetReposAction from "./actions/ISetReposAction";
import IUpdateIssuesAction from "./actions/IUpdateIssuesAction";
import NotModifiedError from "./api/NotModifiedError";
import retrieveIssues from "./api/retrieveIssues";
import retrieveRepos from "./api/retrieveRepos";
import retrieveUser from "./api/retrieveUser";
import ApiState from "./entities/ApiState";
import IIssuesCacheEntry from "./entities/issues/IIssuesCacheEntry";
import IIssuesRequest from "./entities/issues/IIssuesRequest";
import IIssuesResponse from "./entities/issues/IIssuesResponse";
import IReposCacheEntry from "./entities/repos/IReposCacheEntry";
import IReposRequest from "./entities/repos/IReposRequest";
import IStore from "./IStore";
import { equalsIssuesRequests, equalsReposSettings } from "./utils";

const actionCreator = {
  retrieveUser: (login: string) => {
    return (dispatch: Dispatch<IStore>) => {
      retrieveUser(login)
        .then((user) => {
          dispatch({ type: ActionType.SetUser, user });
        })
        .catch((error) => {
          // TODO handle error
          console.error(error);
        });
    };
  },
  retrieveRepos: (login: string) => {
    let pageNumber: number = 1;
    return (dispatch: Dispatch<IStore>, getState: () => IStore) => {
      const retrieveNextPage = (): void => {
        pageNumber++;
        retrievePage();
      };
      const retrievePage = (): void => {
        // TODO Set per_page to 100 after tests
        const request: IReposRequest = { login, pageNumber, perPage: 10 };
        const cacheEntry: IReposCacheEntry | undefined = getState().repos.cache
          .find((entry) => equalsReposSettings(entry.request, request));
        const requestETag: string | undefined = cacheEntry && cacheEntry.eTag;

        retrieveRepos(request, requestETag)
          .then((response) => {
            const { page, eTag } = response;
            const setReposAction: ISetReposAction = {
              eTag, response: page, request,
              type: ActionType.SetRepos,
            };
            dispatch(setReposAction);

            if (response.hasNext) {
              retrieveNextPage();
            }
          })
          .catch((error) => {
            // TODO handle error
            console.error(error);
          });
      };
      retrievePage();
    };
  },
  retrieveIssues: (request: IIssuesRequest) => {
    return (dispatch: Dispatch<IStore>, getState: () => IStore) => {
      dispatch({ type: ActionType.SetIssuesLoading });

      const handleSuccessResponse = (response: IIssuesResponse, eTag: string): void => {
        const updateIssuesAction: IUpdateIssuesAction = {
          apiStatus: { state: ApiState.Success },
          eTag, request, response,
          type: ActionType.UpdateIssues,
        };
        dispatch(updateIssuesAction);
      };

      const cacheEntry: IIssuesCacheEntry | undefined = getState().issues.cache
        .find((entry) => equalsIssuesRequests(entry.request, request));
      const requestETag: string | undefined = cacheEntry && cacheEntry.eTag;

      retrieveIssues(request, requestETag)
        .then((response) => {
          const { lastPageNumber, page, eTag } = response;
          handleSuccessResponse({ lastPageNumber, page }, eTag);
        })
        .catch((error) => {
          if (error instanceof NotModifiedError && cacheEntry && requestETag) {
            const { lastPageNumber, page } = cacheEntry.response;
            handleSuccessResponse({ lastPageNumber, page }, requestETag);
          } else {
            const setErrorAction: ISetIssuesErrorAction = {
              error: `There has been a problem with your fetch operation: ${error.message}`,
              type: ActionType.SetIssuesError,
            };
            dispatch(setErrorAction);
            console.error(`There has been a problem with your fetch operation: ${error.message}`);
          }
        });
    };
  },
  setIssuesLoading: () => ({ type: ActionType.SetIssuesLoading }),
};

export default actionCreator;
