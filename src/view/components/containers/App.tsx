import * as React from "react";
import ApiState from "../../../model/entities/ApiState";
import IIssues from "../../../model/entities/IIssues";
import IIssuesSettings from "../../../model/entities/IIssuesSettings";
import IReposPage from "../../../model/entities/IReposPage";
import IUser from "../../../model/entities/IUser";
import ReposInfo from "../presentational/repos-info";
import UserInfo from "../presentational/user-info";
import Issues from "./Issues";

export interface IStateFromProps {
  issues: IIssues;
  user: IUser;
  repos: IReposPage[];
}

// TODO DRY It is part of action creator interface
export interface IDispatchFromProps {
  actions: {
    onRetrieveIssues(parameters: IIssuesSettings): void;
    onRetrieveUser(login: string): void;
    onRetrieveRepos(login: string): void;
    onSetIssuesApiState(state: ApiState): void;
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
    <Issues
      issues={props.issues}
      onRetrieveIssues={props.actions.onRetrieveIssues}
      onSetIssuesApiState={props.actions.onSetIssuesApiState}
    />
  </React.Fragment>
);

export default App;
