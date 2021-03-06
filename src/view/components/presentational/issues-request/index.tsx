import * as React from "react";
import { FormEvent } from "react";
import * as Autocomplete from "react-autocomplete";
import ApiState from "../../../../model/entities/ApiState";
import IIssues from "../../../../model/entities/issues/IIssues";
import IRepo from "../../../../model/entities/repos/IRepo";
import IRepos from "../../../../model/entities/repos/IRepos";
import { DICTIONARY, SETTINGS } from "../constants";
import Error from "../error";
import Navigation from "../navigation";
import {
  Fieldset,
  Input,
  Label,
  LabelWithAutoComplete,
  Legend,
  MenuItem,
  MenuItemAppendix,
  RetrieveButton,
  Title,
  Wrapper,
} from "./styled";

interface IProps {
  displayedLogin: string | undefined;
  displayedRepo: string | undefined;
  issues: IIssues;
  repos: IRepos;
  hasNext(): boolean;
  hasPrevious(): boolean;
  onNext(parameters: IIssuesRequestState): void;
  onPrevious(parameters: IIssuesRequestState): void;
  onSubmit(parameters: IIssuesRequestState): void;
  onRetrieveRepos(login: string): void;
}

interface IIssuesRequestState {
  login: string;
  perPage: number;
  repo: string;
}

export default class IssuesRequest extends React.PureComponent<IProps, IIssuesRequestState> {

  private autoCompleteRef: any;

  public constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      login: (props.issues.request && props.issues.request.login) || SETTINGS.DEFAULT_LOGIN,
      perPage: (props.issues.request && props.issues.request.perPage) || SETTINGS.DEFAULT_PER_PAGE,
      repo: (props.issues.request && props.issues.request.repo) || "",
    };
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangeRepo = this.onChangeRepo.bind(this);
    this.onChangePerPage = this.onChangePerPage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.updateRepos = this.updateRepos.bind(this);
    this.sameLoginAndRepo = this.sameLoginAndRepo.bind(this);
  }

  // https://github.com/reactjs/react-autocomplete/issues/218
  public componentDidMount(): void {
    this.autoCompleteRef.refs.input.addEventListener("click", (e: any) => e.stopPropagation());
  }

  public render(): React.ReactNode {
    const {
      displayedLogin,
      displayedRepo,
      hasNext,
      hasPrevious,
      issues,
      repos,
    } = this.props;
    const { login, repo, perPage } = this.state;

    return (
      <Wrapper onSubmit={this.onSubmit}>
        <Fieldset>
          <Legend>{DICTIONARY.CHOOSE_REPOSITORY}</Legend>
          <Label>
            {DICTIONARY.LOGIN}
            <Input
              onBlur={this.updateRepos}
              type="text"
              placeholder={DICTIONARY.LOGIN_PLACEHOLDER}
              value={login}
              onChange={this.onChangeLogin}
            />
          </Label>
          <LabelWithAutoComplete>
            {DICTIONARY.REPO}
            <Autocomplete
              ref={(ref: any) => this.autoCompleteRef = ref}
              onMenuVisibilityChange={this.updateRepos}
              items={this.props.repos.list || []}
              shouldItemRender={this.shouldRepoRender}
              getItemValue={this.getRepoName}
              renderItem={this.renderRepo}
              value={repo}
              onChange={this.onChangeRepo}
              onSelect={this.onSelect}
              wrapperStyle={{}}
            />
          </LabelWithAutoComplete>
          <Label>
            {DICTIONARY.PER_PAGE}
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
            {DICTIONARY.RETRIEVE_UPDATE}
          </RetrieveButton>
        </Fieldset>
        {repos.apiStatus.error && <Error message={repos.apiStatus.error}/>}
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

  private shouldRepoRender(repo: IRepo, value: string): boolean {
    return repo.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
  }

  private getRepoName(repo: IRepo): string {
    return repo.name;
  }

  private renderRepo(repo: IRepo, highlighted: boolean): React.ReactNode {
    return (
      <MenuItem
        key={repo.name}
        theme={{ highlighted }}
      >
        {repo.name}
        <MenuItemAppendix>{repo.issues}</MenuItemAppendix>
      </MenuItem>
    );
  }

  private onSelect(value: string): void {
    this.setState({ repo: value }, () => {
      if (!this.sameLoginAndRepo() && this.props.issues.apiStatus.state !== ApiState.Loading) {
        this.props.onSubmit(this.state);
      }
    });
  }

  private updateRepos(): void {
    const sameLogin: boolean = this.props.repos.login === this.state.login;
    if (!sameLogin && this.props.repos.apiStatus.state !== ApiState.Loading && this.state.login) {
      this.props.onRetrieveRepos(this.state.login);
    }
  }

  private sameLoginAndRepo(): boolean {
    const sameLogin: boolean =
      (this.props.issues.request && this.props.issues.request.login === this.state.login) || false;
    const sameRepo: boolean =
      (this.props.issues.request && this.props.issues.request.repo === this.state.repo) || false;

    return sameLogin && sameRepo;
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
    if (this.state.login && this.state.repo) {
      this.props.onSubmit(this.state);
    }
  }

}

export { IIssuesRequestState };
