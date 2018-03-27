import * as parse from "parse-link-header";
import { Dispatch } from "redux";
import ActionType from "./actions/ActionType";
import IAddIssuesAction from "./actions/IAddIssuesAction";
import retrieveIssues from "./api/retrieveIssues";
import retrieveRepos from "./api/retrieveRepos";
import retrieveUser from "./api/retrieveUser";
import IIssuesSettings from "./entities/IIssuesSettings";
import IStore from "./IStore";
import NotModifiedError from "./api/NotModifiedError";
import ICachedIssuesPage from "./entities/ICachedIssuesPage";
import ApiState from "./entities/ApiState";
import ISetIssuesApiStateAction from "./actions/ISetIssuesApiStateAction";
import { equalsIssuesSettings, equalsReposSettings } from "./utils";
import IReposSettings from "./entities/IReposSettings";
import ICachedReposPage from "./entities/ICachedReposPage";
import ISetReposAction from "./actions/ISetReposAction";

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
  retrieveIssues: (parameters: IIssuesSettings) => {
    return (dispatch: Dispatch<IStore>, getState: () => IStore) => {
      const cachedPage: ICachedIssuesPage | undefined = getState().issues.cache
        .find((pageInJsonFormat) =>
          equalsIssuesSettings(JSON.parse(pageInJsonFormat.settings), parameters));
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
          const setSuccessAction: ISetIssuesApiStateAction = {
            state: ApiState.Success,
            type: ActionType.SetIssuesApiState,
          };
          dispatch(setSuccessAction);
          const addIssuesAction: IAddIssuesAction = {
            payload: {
              eTag,
              lastPage,
              page,
              settings,
            },
            type: ActionType.AddIssues,
          };
          dispatch(addIssuesAction);
        })
        .catch((error) => {
          if (error instanceof NotModifiedError) {
            if (cachedPage && requestETag) {
              const setSuccessAction: ISetIssuesApiStateAction = {
                state: ApiState.Success,
                type: ActionType.SetIssuesApiState,
              };
              dispatch(setSuccessAction);
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
            }
          } else {
            const setErrorAction: ISetIssuesApiStateAction = {
              error: "There has been a problem with your fetch operation: " + error.message,
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
