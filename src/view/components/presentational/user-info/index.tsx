import * as React from "react";
import { FormEvent } from "react";
import IUser from "../../../../model/entities/IUser";

interface IProps {
  user: IUser;
  onRetrieveUser(login: string): void;
}

interface IState {
  login: string;
}

export default class UserInfo extends React.PureComponent<IProps, IState> {

  public constructor(props: Readonly<IProps>) {
    super(props);
    this.state = { login: "" };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  public render(): React.ReactNode {
    const { user } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Login
          <input type="text" value={this.state.login} onChange={this.onChange}/>
        </label>
        <button type="submit">Retrieve</button>
        <div>apiState:{user.apiState}</div>
        <div>eTag:{user.eTag}</div>
        <div>login:{user.login}</div>
        <div>avatarUrl:{user.avatarUrl}</div>
      </form>
    );
  }

  private onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (this.state.login.length > 0) {
      this.props.onRetrieveUser(this.state.login);
      this.setState({ login: "" });
    }
  }

  private onChange(event: FormEvent<HTMLInputElement>): void {
    const login: string = event.currentTarget.value;
    this.setState({ login });
  }

}
