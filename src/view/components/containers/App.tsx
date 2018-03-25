import * as React from "react";
import IUser from "../../../model/entities/IUser";
import UserInfo from "../presentational/user-info";
import ReposInfo from "../presentational/repos-info";
import IReposPage from "../../../model/entities/IReposPage";
import IssuesInfo from "../presentational/issues-info";
import IIssuesPage from "../../../model/entities/IIssuesPage";

export interface IStateFromProps {
  issues: IIssuesPage[];
  user: IUser;
  repos: IReposPage[];
}

export interface IDispatchFromProps {
  actions: {
    onRetrieveIssues(login: string, repo: string, page: number): void;
    onRetrieveUser(login: string): void;
    onRetrieveRepos(login: string): void;
  };
}

interface IAppProps extends IStateFromProps, IDispatchFromProps {
}

const App: React.SFC<IAppProps> = (props) => (
  <React.Fragment>
    <UserInfo
      user={props.user}
      onRetrieveUser={props.actions.onRetrieveUser}
    />
    <ReposInfo
      repos={props.repos}
      onRetrieveRepos={props.actions.onRetrieveRepos}
    />
    <IssuesInfo
      issues={props.issues}
      onRetrieveIssues={props.actions.onRetrieveIssues}
    />
  </React.Fragment>
);

export default App;
