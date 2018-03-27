import * as React from "react";
import { FormEvent } from "react";
import ApiState from "../../../../model/entities/ApiState";
import IIssues from "../../../../model/entities/issues/IIssues";
import Navigation from "../navigation";
import { Fieldset, Input, Label, Legend, RetrieveButton, Title, Wrapper } from "./styled";

interface IProps {
  displayedLogin: string | undefined;
  displayedRepo: string | undefined;
  issues: IIssues;
  hasNext(): boolean;
  hasPrevious(): boolean;
  onNext(parameters: IIssuesPageRequestState): void;
  onPrevious(parameters: IIssuesPageRequestState): void;
  onSubmit(parameters: IIssuesPageRequestState): void;
}

interface IIssuesPageRequestState {
  login: string;
  perPage: number;
  repo: string;
}

export default class IssuesPageRequest extends React.PureComponent<IProps, IIssuesPageRequestState> {

  public constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      // TODO Make "" after finish
      login: "reactjs",
      perPage: 100,
      // TODO Make "" after finish
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
    const {
      displayedLogin,
      displayedRepo,
      issues,
      hasNext,
      hasPrevious,
    } = this.props;
    const { login, repo, perPage } = this.state;

    return (
      <Wrapper onSubmit={this.onSubmit}>
        <Fieldset>
          <Legend>Choose repository</Legend>
          <Label>
            Login
            <Input
              type="text"
              placeholder="e.g. reactjs"
              value={login}
              onChange={this.onChangeLogin}
            />
          </Label>
          <Label>
            Repo
            <Input
              type="text"
              placeholder="e.g. reactjs.org"
              value={repo}
              onChange={this.onChangeRepo}
            />
          </Label>
          <Label>
            Per page
            <Input
              type="number"
              value={perPage}
              onChange={this.onChangePerPage}
            />
          </Label>
          <RetrieveButton
            type="submit"
            disabled={issues.apiStatus.state === ApiState.Loading}
          >
            Retrieve
          </RetrieveButton>
        </Fieldset>
        {displayedLogin && displayedRepo && <Title>{displayedLogin} / {displayedRepo}</Title>}
        <Navigation
          issues={issues}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          onPrevious={this.onPrevious}
          onNext={this.onNext}
        />
      </Wrapper>
    );
  }

  private onPrevious(): void {
    this.props.onPrevious(this.state);
  }

  private onNext(): void {
    this.props.onNext(this.state);
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

  private onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

}

export { IIssuesPageRequestState };
