import * as parse from "parse-link-header";
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
import ICachedReposPage from "./entities/repos/ICachedReposPage";
import IReposSettings from "./entities/repos/IReposSettings";
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
    let page: number = 1;
    return (dispatch: Dispatch<IStore>, getState: () => IStore) => {
      const retrieveNextPage = (): void => {
        page++;
        retrievePage();
      };
      const retrievePage = (): void => {
        const settings: IReposSettings = {
          login,
          pageNumber: page,
          perPage: 10,
        };
        const cachedPage: ICachedReposPage | undefined = getState().repos.cache
          .find((pageInJsonFormat) =>
            equalsReposSettings(JSON.parse(pageInJsonFormat.settings), settings));
        let requestETag: string | undefined;
        if (cachedPage) {
          requestETag = cachedPage.eTag;
        }

        retrieveRepos(settings, requestETag)
          .then((reposResponse) => {
            const { page: reposPage, eTag } = reposResponse;
            const reposResponseSettings: IReposSettings = { ...reposResponse.settings };
            const setReposAction: ISetReposAction = {
              eTag,
              page: reposPage,
              settings: reposResponseSettings,
              type: ActionType.SetRepos,
            };
            dispatch(setReposAction);

            if (reposResponse.link && !!parse(reposResponse.link).next) {
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
          eTag, request, response, type: ActionType.UpdateIssues,
        };
        dispatch(updateIssuesAction);
      };

      const cacheEntry: IIssuesCacheEntry | undefined = getState().issues.cache
        .find((entry) => equalsIssuesRequests(entry.request, request));
      const requestETag: string | undefined = cacheEntry && cacheEntry.eTag;

      retrieveIssues(request, requestETag)
        .then((issuesResponse) => {
          const { lastPageNumber, page, eTag } = issuesResponse;
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
