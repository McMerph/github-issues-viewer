import * as React from "react";
import { FormEvent } from "react";
import ApiState from "../../../model/entities/ApiState";
import IIssue from "../../../model/entities/IIssue";
import IIssues from "../../../model/entities/IIssues";
import IIssuesSettings from "../../../model/entities/IIssuesSettings";
import IssuesPageRequest from "../presentational/issues-page-request/index";
import IssuesPageResponse from "../presentational/issues-page-response/index";

interface IProps {
  issues: IIssues;
  onRetrieveIssues(parameters: IIssuesSettings): void;
  onSetIssuesApiState(state: ApiState): void;
}

interface IState {
  login: string;
  perPage: number;
  repo: string;
}

export default class Issues extends React.PureComponent<IProps, IState> {

  public constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      login: "reactjs",
      perPage: 100,
      repo: "reactjs.org",
    };
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangeRepo = this.onChangeRepo.bind(this);
    this.onChangePerPage = this.onChangePerPage.bind(this);
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
          login={this.state.login}
          perPage={this.state.perPage}
          repo={this.state.repo}
          hasNext={this.hasNext}
          hasPrevious={this.hasPrevious}
          onChangeLogin={this.onChangeLogin}
          onChangePerPage={this.onChangePerPage}
          onChangeRepo={this.onChangeRepo}
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

  private onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (this.props.issues.apiState !== ApiState.Loading &&
      this.state.login.length > 0 &&
      this.state.repo.length > 0) {
      this.retrieve(1);
    }
  }

  private retrieve(pageNumber: number): void {
    this.props.onSetIssuesApiState(ApiState.Loading);
    this.props.onRetrieveIssues({
      login: this.state.login,
      pageNumber,
      perPage: this.state.perPage,
      repo: this.state.repo,
    });
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

  private onPrevious(): void {
    if (this.props.issues.settings && this.hasPrevious()) {
      this.retrieve(this.props.issues.settings.pageNumber - 1);
    }
  }

  private onNext(): void {
    if (this.props.issues.settings && this.hasNext()) {
      this.retrieve(this.props.issues.settings.pageNumber + 1);
    }
  }

  private onChangeLogin(event: FormEvent<HTMLInputElement>): void {
    this.setState({ login: event.currentTarget.value });
  }

  private onChangeRepo(event: FormEvent<HTMLInputElement>): void {
    this.setState({ repo: event.currentTarget.value });
  }

  private onChangePerPage(event: FormEvent<HTMLInputElement>): void {
    let perPage: number = parseInt(event.currentTarget.value, 10);
    if (isNaN(perPage) || perPage < 1) {
      perPage = 1;
    }
    this.setState({ perPage });
  }

}
