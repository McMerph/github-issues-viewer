import * as parse from "parse-link-header";
import { Dispatch } from "redux";
import ActionType from "./actions/ActionType";
import retrieveRepos from "./api/retrieveRepos";
import retrieveUser from "./api/retrieveUser";
import IStore from "./IStore";
import retrieveIssues, { IRetrieveIssuesParameters } from "./api/retrieveIssues";
import IAddIssuesAction from "./actions/IAddIssuesAction";

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
  retrieveIssues: (parameters: IRetrieveIssuesParameters) => {
    return (dispatch: Dispatch<IStore>) => {
      retrieveIssues(parameters)
        .then((issuesResponse) => {
          const addIssuesAction: IAddIssuesAction = {
            payload: {
              page: issuesResponse.page,
              pageNumber: issuesResponse.pageNumber,
              settings: issuesResponse.settings,
            },
            type: ActionType.AddIssues,
          };
          dispatch(addIssuesAction);
        })
        .catch((error) => {
          // TODO handle error
          console.error(error);
        });
    };
  },
};

export default actionCreator;
