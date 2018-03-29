import * as React from "react";
import { Redirect, RouteComponentProps } from "react-router";
import IIssue from "../../../../model/entities/issues/IIssue";
import IIssues from "../../../../model/entities/issues/IIssues";
import { Img, ProfileWrapper, Wrapper } from "./styled";

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
    const { profile, login: userLogin, avatar } = issue.user;

    return (
      <Wrapper>
        <h1>{login}/{repo}</h1>

        <h3>Issue number</h3>
        <p>{issueNumber}</p>

        <h3>Issue title</h3>
        <p>{title}</p>

        <h3>Issue creation date</h3>
        <p>{new Date(creationDate).toLocaleString("ru")}</p>

        <h3>Issue author</h3>

        <ProfileWrapper>
          <a href={profile}>{userLogin}</a>
        </ProfileWrapper>
        <Img src={avatar} alt="User avatar"/>
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
