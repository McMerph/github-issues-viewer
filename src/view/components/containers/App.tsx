import * as React from "react";
import IIssues from "../../../model/entities/issues/IIssues";
import IIssuesRequest from "../../../model/entities/issues/IIssuesRequest";
import IUser from "../../../model/entities/IUser";
import IRepos from "../../../model/entities/repos/IRepos";
import UserInfo from "../presentational/user-info";
import Issues from "./Issues";

export interface IStateFromProps {
  issues: IIssues;
  user: IUser;
  repos: IRepos;
}

// TODO DRY It is part of action creator interface
export interface IDispatchFromProps {
  actions: {
    onRetrieveIssues(request: IIssuesRequest): void;
    onRetrieveUser(login: string): void;
    onRetrieveRepos(login: string): void;
  };
}

const App: React.SFC<IStateFromProps & IDispatchFromProps> = (props) => (
  <React.Fragment>
    <UserInfo
      user={props.user}
      onRetrieveUser={props.actions.onRetrieveUser}
    />
    <Issues
      issues={props.issues}
      repos={props.repos}
      onRetrieveIssues={props.actions.onRetrieveIssues}
      onRetrieveRepos={props.actions.onRetrieveRepos}
    />
  </React.Fragment>
);

export default App;
