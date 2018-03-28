import * as React from "react";
import { Redirect, RouteComponentProps } from "react-router";
import IIssue from "../../../../model/entities/issues/IIssue";
import IIssues from "../../../../model/entities/issues/IIssues";
import { Wrapper } from "./styled";

interface IDetailsMatchParams {
  id: string;
}

interface IProps extends RouteComponentProps<IDetailsMatchParams> {
  issues: IIssues;
}

const Details: React.SFC<IProps> = (props: IProps) => {
  const issueNumber: number = parseInt(props.match.params.id, 10);
  const issue: IIssue | undefined = props.issues.response &&
    props.issues.response.page.find((value) => value.number === issueNumber);

  if (props.issues.request && issue) {
    const { login, repo } = props.issues.request;
    const { title, creationDate } = issue;

    return (
      <Wrapper>
        <h3>Login</h3>
        <p>{login}</p>

        <h3>Repo</h3>
        <p>{repo}</p>

        <h3>Issue number</h3>
        <p>{issueNumber}</p>

        <h3>Issue title</h3>
        <p>{title}</p>

        <h3>Issue creation date</h3>
        <p>{new Date(creationDate).toLocaleString("ru")}</p>
      </Wrapper>
    );
  } else {
    return (
      <Redirect to="/"/>
    );
  }
};

export default Details;
export { IDetailsMatchParams };
