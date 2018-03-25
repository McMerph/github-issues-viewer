import * as React from "react";
import { FormEvent } from "react";
import { IRetrieveIssuesParameters } from "../../../../model/api/retrieveIssues";
import IIssuesList from "../../../../model/entities/IIssuesList";
import { BackButton, DateTime, Head, Issue, IssueHeader, Navigation, NextButton, Title } from "./styled";
import IIssuesPage from "../../../../model/entities/IIssuesPage";

interface IProps {
  issues: IIssuesList;
  onRetrieveIssues(parameters: IRetrieveIssuesParameters): void;
}

interface IState {
  // TODO Add page
  login: string;
  repo: string;
}

export default class IssuesInfo extends React.PureComponent<IProps, IState> {

  public constructor(props: Readonly<IProps>) {
    super(props);
    this.state = { login: "", repo: "" };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangeRepo = this.onChangeRepo.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  public render(): React.ReactNode {
    const { pages, currentPage, lastPage } = this.props.issues;
    const { login, repo } = this.props.issues.settings;
    const page: IIssuesPage = pages[currentPage - 1];

    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Login
          <input type="text" value={this.state.login} onChange={this.onChangeLogin}/>
        </label>
        <label>
          Repo
          <input type="text" value={this.state.repo} onChange={this.onChangeRepo}/>
        </label>
        <button type="submit">Retrieve</button>
        <Head>{login} / {repo}</Head>
        <Navigation>
          <BackButton type="button" disabled={!this.hasPrevious()} onClick={this.onPrevious}>← Назад</BackButton>
          <div>{currentPage} из {lastPage}</div>
          <NextButton type="button" disabled={!this.hasNext()} onClick={this.onNext}>Далее →</NextButton>
        </Navigation>
        {/*TODO Change to ul > li*/}
        {page && page.issues.length > 0 && page.issues.map((issue, issueIndex) =>
          <Issue key={issueIndex}>
            <IssueHeader>
              <div>{issue.number}</div>
              <DateTime>{issue.creationDate.toLocaleString("ru")}</DateTime>
            </IssueHeader>
            <Title>{issue.title}</Title>
          </Issue>)}
      </form>
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
      perPage: 10,
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

}
