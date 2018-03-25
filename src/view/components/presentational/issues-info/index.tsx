import * as React from "react";
import { FormEvent } from "react";
import { IRetrieveIssuesParameters } from "../../../../model/api/retrieveIssues";
import IIssuesList from "../../../../model/entities/IIssuesList";

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
  }

  public render(): React.ReactNode {
    const { issues } = this.props;
    const { settings } = issues;

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
        <div>
          <button type="button">Prev</button>
          <button type="button">Next</button>
        </div>
        <div>Current page: {issues.currentPage}</div>
        <div> Login: {settings.login}, Repo: {settings.repo}, PerPage: {settings.perPage}</div>
        {/*TODO Change to ul > li*/}
        {issues.pages.map((page, index) => (
          <div key={index}>
            <div>Page {index + 1}:</div>
            <div>eTag:{page.eTag}</div>
            <div>Issues:</div>
            {page.issues && page.issues.map((issue, issueIndex) =>
              <div key={issueIndex}>{issue.title}---{issue.number}---{issue.creationDate.toLocaleString("ru")}</div>)}
          </div>
        ))}
      </form>
    );
  }

  private onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (this.state.login.length > 0 && this.state.repo.length > 0) {
      this.props.onRetrieveIssues({
        login: this.state.login,
        pageNumber: 1,
        perPage: 10,
        repo: this.state.repo,
      });
      this.setState({ login: "", repo: "" });
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
