import * as React from "react";
import { FormEvent } from "react";
import { IRetrieveIssuesParameters } from "../../../../model/api/retrieveIssues";
import IIssuesList from "../../../../model/entities/IIssuesList";
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
import IIssuesPage from "../../../../model/entities/IIssuesPage";

interface IProps {
  issues: IIssuesList;
  onRetrieveIssues(parameters: IRetrieveIssuesParameters): void;
}

interface IState {
  login: string;
  repo: string;
  perPage: number;
}

export default class IssuesInfo extends React.PureComponent<IProps, IState> {

  public constructor(props: Readonly<IProps>) {
    super(props);
    this.state = { login: "reactjs", repo: "reactjs.org", perPage: 10 };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangeRepo = this.onChangeRepo.bind(this);
    this.onChangePerPage = this.onChangePerPage.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  public render(): React.ReactNode {
    const { pages, currentPage, lastPage } = this.props.issues;
    const { login, repo } = this.props.issues.settings;
    const page: IIssuesPage = pages[currentPage - 1];

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
          <HeadTitle>{login} / {repo}</HeadTitle>
          <Navigation>
            <BackButton type="button" disabled={!this.hasPrevious()} onClick={this.onPrevious}>← Назад</BackButton>
            <NavigationInfo>{currentPage} из {lastPage}</NavigationInfo>
            <NextButton type="button" disabled={!this.hasNext()} onClick={this.onNext}>Далее →</NextButton>
          </Navigation>
        </Head>
        {/*TODO Change to ul > li*/}
        {page && page.issues.length > 0 && page.issues.map((issue, issueIndex) =>
          <Issue key={issueIndex}>
            <IssueHeader>
              <div>{issue.number}</div>
              <IssueDateTime>{issue.creationDate.toLocaleString("ru")}</IssueDateTime>
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
    const { login, repo } = this.props.issues.settings;
    const { currentPage } = this.props.issues;

    return !!login && !!repo && currentPage > 1;
  }

  private hasNext(): boolean {
    const { login, repo } = this.props.issues.settings;
    const { currentPage, lastPage } = this.props.issues;

    return !!login && !!repo && !!lastPage && currentPage < lastPage;
  }

  private onPrevious(): void {
    if (this.hasPrevious()) {
      this.retrieve(this.props.issues.currentPage - 1);
    }
  }

  private onNext(): void {
    if (this.hasNext()) {
      this.retrieve(this.props.issues.currentPage + 1);
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
