import * as React from "react";
import { FormEvent } from "react";
import ApiState from "../../../../model/entities/ApiState";
import IIssue from "../../../../model/entities/IIssue";
import IIssues from "../../../../model/entities/IIssues";
import IIssuesSettings from "../../../../model/entities/IIssuesSettings";
import Spinner from "../spinner";
import {
  BackButton,
  Fieldset,
  Head,
  HeadTitle,
  Input,
  IssueDateTime,
  IssueHeader,
  IssueTitle,
  Label,
  Legend,
  NavigationInfo,
  NextButton,
  RetrieveButton,
  StyledIssue,
  StyledNavigation,
  Ul,
} from "./styled";

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
  }

  public render(): React.ReactNode {
    const issues: IIssues = this.props.issues;
    const login: string | undefined = issues.settings ? issues.settings.login : undefined;
    const repo: string | undefined = issues.settings ? issues.settings.repo : undefined;
    const page: IIssue[] | undefined = issues.page;

    const Navigation: React.SFC<{}> = () => (
      (this.hasPrevious() || this.hasNext()) ? (
        <StyledNavigation>
          <BackButton
            type="button"
            disabled={!this.hasPrevious() || issues.apiState === ApiState.Loading}
            onClick={this.onPrevious}
          >
            ← Назад
          </BackButton>
          <NavigationInfo>{issues.settings && issues.settings.pageNumber} из {issues.lastPage}</NavigationInfo>
          <NextButton
            type="button"
            disabled={!this.hasNext() || issues.apiState === ApiState.Loading}
            onClick={this.onNext}
          >
            Далее →
          </NextButton>
        </StyledNavigation>
      ) : null
    );

    const Issue: React.SFC<{ issue: IIssue }> = (props) => (
      <StyledIssue>
        <IssueHeader>
          <div>{props.issue.number}</div>
          <IssueDateTime>
            {new Date(props.issue.creationDate).toLocaleString("ru")}
          </IssueDateTime>
        </IssueHeader>
        <IssueTitle>{props.issue.title}</IssueTitle>
      </StyledIssue>
    );

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
          <Navigation/>
        </Head>
        {issues.apiState === ApiState.Loading ? <Spinner backgroundColor="#e2e1e0"/> : (<Ul>
          {page && page.length > 0 && page.map((issue, issueIndex) =>
            <Issue issue={issue} key={issueIndex}/>)}
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
