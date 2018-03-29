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

export interface IDispatchFromProps {
  actions: {
    onRetrieveIssues(request: IIssuesRequest): void;
    onRetrieveRepos(login: string): void;
  };
}

const App: React.SFC<IStateFromProps & IDispatchFromProps> = (props) => {
  const { issues, repos } = props;
  const { onRetrieveIssues, onRetrieveRepos } = props.actions;

  return (
    <Router>
      <React.Fragment>
        <Route
          exact={true}
          path="/"
          // tslint:disable-next-line:jsx-no-multiline-js jsx-no-lambda
          render={() => (
            <Issues
              issues={issues}
              repos={repos}
              onRetrieveIssues={onRetrieveIssues}
              onRetrieveRepos={onRetrieveRepos}
            />
          )}
        />

        <Route
          path="/issues/:id"
          // tslint:disable-next-line:jsx-no-multiline-js jsx-no-lambda
          render={(routerProps: RouteComponentProps<IDetailsMatchParams>) => (
            <Details
              {...routerProps}
              issues={issues}
            />
          )}
        />
      </React.Fragment>
    </Router>
  );
};

export default App;
