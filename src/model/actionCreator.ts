import * as parse from "parse-link-header";
import { Dispatch } from "redux";
import ActionType from "./actions/ActionType";
import IAddIssuesAction from "./actions/IAddIssuesAction";
import retrieveIssues, { IRetrieveIssuesParameters } from "./api/retrieveIssues";
import retrieveRepos from "./api/retrieveRepos";
import retrieveUser from "./api/retrieveUser";
import IIssuesSettings from "./entities/IIssuesSettings";
import IStore from "./IStore";

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
    return (dispatch: Dispatch<IStore>, getState: () => IStore) => {
      console.log(getState());
      retrieveIssues(parameters)
        .then((issuesResponse) => {
          const { page, link } = issuesResponse;
          const parsedLink = parse(link);
          const lastPage: number = (parsedLink && parsedLink.last) ?
            parseInt(parsedLink.last.page, 10) :
            issuesResponse.settings.currentPage;
          const settings: IIssuesSettings = { ...issuesResponse.settings, lastPage };
          const addIssuesAction: IAddIssuesAction = {
            payload: { page, settings, eTag: issuesResponse.eTag },
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
