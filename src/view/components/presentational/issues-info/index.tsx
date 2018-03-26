import * as React from "react";
import { FormEvent } from "react";
import ApiState from "../../../../model/entities/ApiState";
import IIssue from "../../../../model/entities/IIssue";
import IIssues from "../../../../model/entities/IIssues";
import IIssuesSettings from "../../../../model/entities/IIssuesSettings";
import Navigation from "../navigation";
import Spinner from "../spinner";
import { Fieldset, Head, HeadTitle, Input, Label, Legend, RetrieveButton, Ul, } from "./styled";
import Issue from "../issue";

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

export default class IssuesInfo extends React.PureComponent<IProps, IState> {

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
        <Head>
          <form onSubmit={this.onSubmit}>
            <Fieldset>
              <Legend>Choose repository</Legend>
              <Label>
                Login
                <Input
                  type="text"
                  placeholder="e.g. reactjs"
                  value={this.state.login}
                  onChange={this.onChangeLogin}
                />
              </Label>
              <Label>
                Repo
                <Input
                  type="text"
                  placeholder="e.g. reactjs.org"
                  value={this.state.repo}
                  onChange={this.onChangeRepo}
                />
              </Label>
              <Label>
                Per page
                <Input
                  type="number"
                  value={this.state.perPage}
                  onChange={this.onChangePerPage}
                />
              </Label>
              <RetrieveButton
                type="submit"
                disabled={issues.apiState === ApiState.Loading}
              >
                Retrieve
              </RetrieveButton>
            </Fieldset>
          </form>
          {login && repo && <HeadTitle>{login} / {repo}</HeadTitle>}
          <Navigation
            issues={issues}
            hasPrevious={this.hasPrevious}
            hasNext={this.hasNext}
            onPrevious={this.onPrevious}
            onNext={this.onNext}
          />
        </Head>
        {issues.apiState === ApiState.Loading ? <Spinner/> : (<Ul>
          {page && page.length > 0 && page.map((issue, issueIndex) =>
            <Issue
              issue={issue}
              key={issueIndex}
            />)}
        </Ul>)}
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
