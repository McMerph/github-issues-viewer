import * as React from "react";
import { IRetrieveIssuesParameters } from "../../../model/api/retrieveIssues";
import IReposPage from "../../../model/entities/IReposPage";
import IUser from "../../../model/entities/IUser";
import IssuesInfo from "../presentational/issues-info";
import ReposInfo from "../presentational/repos-info";
import UserInfo from "../presentational/user-info";
import IIssuesList from "../../../model/entities/IIssuesList";

export interface IStateFromProps {
  issues: IIssuesList;
  user: IUser;
  repos: IReposPage[];
}

export interface IDispatchFromProps {
  actions: {
    onRetrieveIssues(parameters: IRetrieveIssuesParameters): void;
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
