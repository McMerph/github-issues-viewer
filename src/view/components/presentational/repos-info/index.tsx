import * as React from "react";
import { FormEvent } from "react";
import IReposPage from "../../../../model/entities/IReposPage";

interface IProps {
  repos: IReposPage[];
  onRetrieveRepos(login: string): void;
}

interface IState {
  login: string;
}

export default class ReposInfo extends React.PureComponent<IProps, IState> {

  public constructor(props: Readonly<IProps>) {
    super(props);
    this.state = { login: "" };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  public render(): React.ReactNode {
    const { repos } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Login
          <input type="text" value={this.state.login} onChange={this.onChange}/>
        </label>
        <button type="submit">Retrieve</button>
        {/*TODO Change to ul > li*/}
        {repos.map((page, index) => (
          <div key={index}>
            <div>Page {index + 1}:</div>
            <div>apiState:{page.apiState}</div>
            <div>eTag:{page.eTag}</div>
            <div>Repos:</div>
            {page.repos && page.repos.map((repo, repoIndex) => <div key={repoIndex}>{repo.name}:{repo.issues}</div>)}
          </div>
        ))}
      </form>
    );
  }

  private onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (this.state.login.length > 0) {
      this.props.onRetrieveRepos(this.state.login);
      this.setState({ login: "" });
    }
  }

  private onChange(event: FormEvent<HTMLInputElement>): void {
    const login: string = event.currentTarget.value;
    this.setState({ login });
  }

}
