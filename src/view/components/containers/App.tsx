import * as React from "react";
import { RouteComponentProps } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import IIssues from "../../../model/entities/issues/IIssues";
import IIssuesRequest from "../../../model/entities/issues/IIssuesRequest";
import IRepos from "../../../model/entities/repos/IRepos";
import Details, { IDetailsMatchParams } from "../presentational/details";
import Issues from "./Issues";

export interface IStateFromProps {
  issues: IIssues;
  repos: IRepos;
}

// TODO DRY It is part of action creator interface
export interface IDispatchFromProps {
  actions: {
    onRetrieveIssues(request: IIssuesRequest): void;
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
