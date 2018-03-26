import * as React from "react";
import { FormEvent } from "react";
import IIssues from "../../../../model/entities/IIssues";
import {
  BackButton,
  Fieldset,
  Head,
  HeadTitle,
  Input,
  Issue,
  IssueDateTime,
  IssueHeader,
  IssueTitle,
  Label,
  Legend,
  Navigation,
  NavigationInfo,
  NextButton,
  RetrieveButton,
} from "./styled";
import IIssue from "../../../../model/entities/IIssue";
import IIssuesSettings from "../../../../model/entities/IIssuesSettings";

interface IProps {
  issues: IIssues;
  onRetrieveIssues(parameters: IIssuesSettings): void;
}

interface IState {
  login: string;
  repo: string;
  perPage: number;
}

export default class IssuesInfo extends React.PureComponent<IProps, IState> {

  public constructor(props: Readonly<IProps>) {
    super(props);
    this.state = { login: "reactjs", repo: "reactjs.org", perPage: 100 };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangeRepo = this.onChangeRepo.bind(this);
    this.onChangePerPage = this.onChangePerPage.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  public render(): React.ReactNode {
    const { lastPage } = this.props.issues;
    // TODO Introduce Navigation component?
    let pageNumber;
    let login;
    let repo;
    if (this.props.issues.settings) {
      pageNumber = this.props.issues.settings.pageNumber;
      login = this.props.issues.settings.login;
      repo = this.props.issues.settings.repo;
    }
    const page: IIssue[] | undefined = this.props.issues.page;

    return (
      <React.Fragment>
        <Head>
          <form onSubmit={this.onSubmit}>
            <Fieldset>
              <Legend>Choose repository</Legend>
              <Label>
                Login
                <Input type="text" placeholder="e.g. reactjs" value={this.state.login} onChange={this.onChangeLogin}/>
              </Label>
              <Label>
                Repo
                <Input type="text" placeholder="e.g. reactjs.org" value={this.state.repo} onChange={this.onChangeRepo}/>
              </Label>
              <Label>
                Per page
                <Input type="number" value={this.state.perPage} onChange={this.onChangePerPage}/>
              </Label>
              <RetrieveButton type="submit">Retrieve</RetrieveButton>
            </Fieldset>
          </form>
          {login && repo && <HeadTitle>{login} / {repo}</HeadTitle>}
          {(this.hasPrevious() || this.hasNext()) && (
            <Navigation>
              <BackButton type="button" disabled={!this.hasPrevious()} onClick={this.onPrevious}>← Назад</BackButton>
              <NavigationInfo>{pageNumber} из {lastPage}</NavigationInfo>
              <NextButton type="button" disabled={!this.hasNext()} onClick={this.onNext}>Далее →</NextButton>
            </Navigation>
          )}
        </Head>
        {/*TODO Change to ul > li*/}
        {page && page.length > 0 && page.map((issue, issueIndex) =>
          <Issue key={issueIndex}>
            <IssueHeader>
              <div>{issue.number}</div>
              <IssueDateTime>{new Date(issue.creationDate).toLocaleString("ru")}</IssueDateTime>
            </IssueHeader>
            <IssueTitle>{issue.title}</IssueTitle>
          </Issue>)}
      </React.Fragment>
    );
  }

  private onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (this.state.login.length > 0 && this.state.repo.length > 0) {
      this.retrieve(1);
    }
  }

  private retrieve(pageNumber: number): void {
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
    }

    return false;
  }

  private hasNext(): boolean {
    if (this.props.issues.settings) {
      const { lastPage } = this.props.issues;
      const { login, repo, pageNumber } = this.props.issues.settings;

      return !!login && !!repo && !!lastPage && pageNumber < lastPage;
    }

    return false;
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
    const login: string = event.currentTarget.value;
    this.setState({ login });
  }

  private onChangeRepo(event: FormEvent<HTMLInputElement>): void {
    const repo: string = event.currentTarget.value;
    this.setState({ repo });
  }

  private onChangePerPage(event: FormEvent<HTMLInputElement>): void {
    let perPage: number = parseInt(event.currentTarget.value, 10);
    if (isNaN(perPage) || perPage < 1) {
      perPage = 1;
    }
    this.setState({ perPage });
  }

}
