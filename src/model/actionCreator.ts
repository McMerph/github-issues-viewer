import * as parse from "parse-link-header";
import { Dispatch } from "redux";
import ActionType from "./actions/ActionType";
import IAddIssuesAction from "./actions/IAddIssuesAction";
import retrieveIssues from "./api/retrieveIssues";
import retrieveRepos from "./api/retrieveRepos";
import retrieveUser from "./api/retrieveUser";
import IIssuesSettings, { isIssuesSettings } from "./entities/IIssuesSettings";
import IStore from "./IStore";
import NotModifiedError from "./api/NotModifiedError";
import ICachedPage from "./entities/ICachedPage";
import ApiState from "./entities/ApiState";
import ISetIssuesApiStateAction from "./actions/ISetIssuesApiStateAction";

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
    return (dispatch: Dispatch<IStore>) => {
      const retrieveNextPage = (): void => {
        page++;
        retrievePage();
      };
      const retrievePage = (): void => {
        retrieveRepos(login, page)
          .then((reposPageResponse) => {
            dispatch({ type: ActionType.SetRepos, repos: reposPageResponse.page, page });
            if (reposPageResponse.linkHeader && !!parse(reposPageResponse.linkHeader).next) {
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
  retrieveIssues: (parameters: IIssuesSettings) => {
    return (dispatch: Dispatch<IStore>, getState: () => IStore) => {
      const cachedPage: ICachedPage | undefined = getState().issues.cache
        .find((pageInJsonFormat) => {
          const cachedSettings = JSON.parse(pageInJsonFormat.settings);
          if (isIssuesSettings(cachedSettings)) {
            return cachedSettings.login === parameters.login &&
              cachedSettings.repo === parameters.repo &&
              cachedSettings.pageNumber === parameters.pageNumber &&
              cachedSettings.perPage === parameters.perPage;
          }
          return false;
        });
      let requestETag: string | undefined;
      if (cachedPage) {
        requestETag = cachedPage.eTag;
      }

      retrieveIssues(parameters, requestETag)
        .then((issuesResponse) => {
          const { page, link, eTag } = issuesResponse;
          const parsedLink = parse(link);
          const lastPage: number = (parsedLink && parsedLink.last) ?
            parseInt(parsedLink.last.page, 10) :
            issuesResponse.settings.pageNumber;
          const settings: IIssuesSettings = { ...issuesResponse.settings };
          const addIssuesAction: IAddIssuesAction = {
            payload: { page, settings, eTag, lastPage },
            type: ActionType.AddIssues,
          };
          dispatch(addIssuesAction);
          const setSuccessAction: ISetIssuesApiStateAction = {
            state: ApiState.Success,
            type: ActionType.SetIssuesApiState,
          };
          dispatch(setSuccessAction);
        })
        .catch((error) => {
          if (error instanceof NotModifiedError) {
            if (cachedPage && requestETag) {
              const addIssuesAction: IAddIssuesAction = {
                payload: {
                  eTag: requestETag,
                  lastPage: cachedPage.lastPage,
                  page: cachedPage.page,
                  settings: parameters,
                },
                type: ActionType.AddIssues,
              };
              dispatch(addIssuesAction);
              const setSuccessAction: ISetIssuesApiStateAction = {
                state: ApiState.Success,
                type: ActionType.SetIssuesApiState,
              };
              dispatch(setSuccessAction);
            }
          } else {
            const setErrorAction: ISetIssuesApiStateAction = {
              state: ApiState.Error,
              type: ActionType.SetIssuesApiState,
            };
            dispatch(setErrorAction);
            // TODO handle error?
            console.error("There has been a problem with your fetch operation: " + error.message);
          }
        });
    };
  },
  setIssuesApiState: (state: ApiState) => ({ type: ActionType.SetIssuesApiState, state }),
};

export default actionCreator;
