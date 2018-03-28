import * as React from "react";
import { RouteComponentProps } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import IIssues from "../../../model/entities/issues/IIssues";
import IIssuesRequest from "../../../model/entities/issues/IIssuesRequest";
import IUser from "../../../model/entities/IUser";
import IRepos from "../../../model/entities/repos/IRepos";
import Details, { IDetailsMatchParams } from "../presentational/details";
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

const App: React.SFC<IStateFromProps & IDispatchFromProps> = (props) => {
  return (
    <Router>
      <React.Fragment>
        <Route
          exact={true}
          path="/"
          render={() => (
            <Issues
              issues={props.issues}
              repos={props.repos}
              onRetrieveIssues={props.actions.onRetrieveIssues}
              onRetrieveRepos={props.actions.onRetrieveRepos}
            />
          )}
        />

        <Route
          path="/user-info"
          render={() => (
            <UserInfo
              user={props.user}
              onRetrieveUser={props.actions.onRetrieveUser}
            />
          )}
        />

        <Route
          path="/issues/:id"
          render={(routerProps: RouteComponentProps<IDetailsMatchParams>) => (
            <Details
              {...routerProps}
              issues={props.issues}
            />
          )}
        />
      </React.Fragment>
    </Router>
  );
};

export default App;
