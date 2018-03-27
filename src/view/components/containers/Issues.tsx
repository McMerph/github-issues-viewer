import * as React from "react";
import ApiState from "../../../model/entities/ApiState";
import IIssue from "../../../model/entities/IIssue";
import IIssues from "../../../model/entities/IIssues";
import IIssuesSettings from "../../../model/entities/IIssuesSettings";
import { IIssuesPageRequestState } from "../presentational/issues-page-request";
import IssuesPageRequest from "../presentational/issues-page-request/index";
import IssuesPageResponse from "../presentational/issues-page-response/index";

interface IProps {
  issues: IIssues;
  onRetrieveIssues(parameters: IIssuesSettings): void;
  onSetIssuesApiState(state: ApiState): void;
}

// TODO Make React.SFC?
export default class Issues extends React.PureComponent<IProps, {}> {

  public constructor(props: Readonly<IProps>) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);
    this.hasPrevious = this.hasPrevious.bind(this);
    this.hasNext = this.hasNext.bind(this);
  }

  public render(): React.ReactNode {
    const issues: IIssues = this.props.issues;
    const login: string | undefined = issues.settings ? issues.settings.login : undefined;
    const repo: string | undefined = issues.settings ? issues.settings.repo : undefined;
    const page: IIssue[] | undefined = issues.page;

    return (
      <React.Fragment>
        <IssuesPageRequest
          displayedLogin={login}
          displayedRepo={repo}
          issues={issues}
          hasNext={this.hasNext}
          hasPrevious={this.hasPrevious}
          onNext={this.onNext}
          onPrevious={this.onPrevious}
          onSubmit={this.onSubmit}
        />
        <IssuesPageResponse
          page={page}
          issues={issues}
        />
      </React.Fragment>
    );
  }

  private hasPrevious(): boolean {
    if (this.props.issues.settings) {
      const { login, repo, pageNumber } = this.props.issues.settings;
      return !!login && !!repo && pageNumber > 1;
    } else {
      return false;
    }
  }

  private hasNext(): boolean {
    if (this.props.issues.settings) {
      const { lastPage } = this.props.issues;
      const { login, repo, pageNumber } = this.props.issues.settings;
      return !!login && !!repo && !!lastPage && pageNumber < lastPage;
    } else {
      return false;
    }
  }

  private onSubmit(parameters: IIssuesPageRequestState): void {
    if (this.props.issues.apiState !== ApiState.Loading &&
      parameters.login.length > 0 &&
      parameters.repo.length > 0) {
      this.retrieve(parameters, 1);
    }
  }

  private onPrevious(parameters: IIssuesPageRequestState): void {
    if (this.props.issues.settings && this.hasPrevious()) {
      this.retrieve(parameters, this.props.issues.settings.pageNumber - 1);
    }
  }

  private onNext(parameters: IIssuesPageRequestState): void {
    if (this.props.issues.settings && this.hasNext()) {
      this.retrieve(parameters, this.props.issues.settings.pageNumber + 1);
    }
  }

  private retrieve(parameters: IIssuesPageRequestState, pageNumber: number): void {
    this.props.onSetIssuesApiState(ApiState.Loading);
    this.props.onRetrieveIssues({
      login: parameters.login,
      pageNumber,
      perPage: parameters.perPage,
      repo: parameters.repo,
    });
  }

}
