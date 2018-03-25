import * as parse from "parse-link-header";
import { Dispatch } from "redux";
import ActionType from "./actions/ActionType";
import retrieveRepos from "./api/retrieveRepos";
import retrieveUser from "./api/retrieveUser";
import IStore from "./IStore";
import retrieveIssues from "./api/retrieveIssues";

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
  retrieveIssues: (login: string, repo: string, page: number) => {
    return (dispatch: Dispatch<IStore>) => {
      retrieveIssues(login, repo, page)
        .then((issuesPageResponse) => {
          dispatch({ type: ActionType.SetIssues, issues: issuesPageResponse.page, page });
        })
        .catch((error) => {
          // TODO handle error
          console.error(error);
        });
    };
  },
};

export default actionCreator;
