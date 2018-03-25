import * as React from "react";
import { FormEvent } from "react";
import IIssuesPage from "../../../../model/entities/IIssuesPage";

interface IProps {
  issues: IIssuesPage[];
  onRetrieveIssues(login: string, repo: string, page: number): void;
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
        {/*TODO Change to ul > li*/}
        {issues.map((page, index) => (
          <div key={index}>
            <div>Page {index + 1}:</div>
            <div>apiState:{page.apiState}</div>
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
      this.props.onRetrieveIssues(this.state.login, this.state.repo, 1);
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
