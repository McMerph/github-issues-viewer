import * as React from "react";
import { FormEvent } from "react";
import ApiState from "../../../../model/entities/ApiState";
import IIssues from "../../../../model/entities/IIssues";
import Navigation from "../navigation";
import { Fieldset, Input, Label, Legend, RetrieveButton, Title, Wrapper } from "./styled";

interface IProps {
  displayedLogin: string | undefined;
  displayedRepo: string | undefined;
  issues: IIssues;
  login: string;
  perPage: number;
  repo: string;
  hasNext(): boolean;
  hasPrevious(): boolean;
  onChangeLogin(event: FormEvent<HTMLInputElement>): void;
  onChangePerPage(event: FormEvent<HTMLInputElement>): void;
  onChangeRepo(event: FormEvent<HTMLInputElement>): void;
  onNext(): void;
  onPrevious(): void;
  onSubmit(event: FormEvent<HTMLFormElement>): void;
}

const IssuesPageRequest: React.SFC<IProps> = (props) => {
  const {
    displayedLogin,
    displayedRepo,
    issues,
    login,
    perPage,
    repo,
    hasNext,
    hasPrevious,
    onChangeLogin,
    onChangePerPage,
    onChangeRepo,
    onNext,
    onPrevious,
    onSubmit,
  } = props;

  return (
    <Wrapper onSubmit={onSubmit}>
      <Fieldset>
        <Legend>Choose repository</Legend>
        <Label>
          Login
          <Input
            type="text"
            placeholder="e.g. reactjs"
            value={login}
            onChange={onChangeLogin}
          />
        </Label>
        <Label>
          Repo
          <Input
            type="text"
            placeholder="e.g. reactjs.org"
            value={repo}
            onChange={onChangeRepo}
          />
        </Label>
        <Label>
          Per page
          <Input
            type="number"
            value={perPage}
            onChange={onChangePerPage}
          />
        </Label>
        <RetrieveButton
          type="submit"
          disabled={issues.apiState === ApiState.Loading}
        >
          Retrieve
        </RetrieveButton>
      </Fieldset>
      {displayedLogin && displayedRepo && <Title>{displayedLogin} / {displayedRepo}</Title>}
      <Navigation
        issues={issues}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </Wrapper>
  );
};

export default IssuesPageRequest;
