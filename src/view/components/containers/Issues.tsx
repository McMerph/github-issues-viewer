import * as React from "react";
import ApiState from "../../../model/entities/ApiState";
import IIssue from "../../../model/entities/issues/IIssue";
import IIssues from "../../../model/entities/issues/IIssues";
import IIssuesRequest from "../../../model/entities/issues/IIssuesRequest";
import IRepos from "../../../model/entities/repos/IRepos";
import { IIssuesRequestState } from "../presentational/issues-request";
import IssuesRequest from "../presentational/issues-request/index";
import IssuesResponse from "../presentational/issues-response/index";

interface IProps {
  issues: IIssues;
  repos: IRepos;
  onRetrieveIssues(request: IIssuesRequest): void;
  onRetrieveRepos(login: string): void;
}

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
    const page: IIssue[] | undefined = issues.response && issues.response.page;

    return (
      <React.Fragment>
        <IssuesRequest
          displayedLogin={issues.request && issues.request.login}
          displayedRepo={issues.request && issues.request.repo}
          issues={issues}
          repos={this.props.repos}
          hasNext={this.hasNext}
          hasPrevious={this.hasPrevious}
          onNext={this.onNext}
          onPrevious={this.onPrevious}
          onSubmit={this.onSubmit}
          onRetrieveRepos={this.props.onRetrieveRepos}
        />
        <IssuesResponse
          page={page}
          issues={issues}
        />
      </React.Fragment>
    );
  }

  private hasPrevious(): boolean {
    if (this.props.issues.request) {
      const { login, repo, pageNumber } = this.props.issues.request;
      return !!login && !!repo && pageNumber > 1;
    } else {
      return false;
    }
  }

  private hasNext(): boolean {
    if (this.props.issues.request) {
      const lastPage = this.props.issues.response && this.props.issues.response.lastPageNumber;
      const { login, repo, pageNumber } = this.props.issues.request;
      return !!login && !!repo && !!lastPage && pageNumber < lastPage;
    } else {
      return false;
    }
  }

  private onSubmit(parameters: IIssuesRequestState): void {
    if (this.props.issues.apiStatus.state !== ApiState.Loading &&
      parameters.login.length > 0 &&
      parameters.repo.length > 0) {
      this.retrieve(parameters, 1);
    }
  }

  private onPrevious(parameters: IIssuesRequestState): void {
    if (this.props.issues.request && this.hasPrevious()) {
      this.retrieve(parameters, this.props.issues.request.pageNumber - 1);
    }
  }

  private onNext(parameters: IIssuesRequestState): void {
    if (this.props.issues.request && this.hasNext()) {
      this.retrieve(parameters, this.props.issues.request.pageNumber + 1);
    }
  }

  private retrieve(parameters: IIssuesRequestState, pageNumber: number): void {
    this.props.onRetrieveIssues({
      login: parameters.login,
      pageNumber,
      perPage: parameters.perPage,
      repo: parameters.repo,
    });
  }

}
