import * as React from "react";
import { Redirect, RouteComponentProps } from "react-router";
import IIssue from "../../../../model/entities/issues/IIssue";
import IIssues from "../../../../model/entities/issues/IIssues";
import { DICTIONARY } from "../constants";
import { H1, Img, ProfileWrapper, Wrapper } from "./styled";

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
    const { title, creationDate, url } = issue;
    const { profile, login: userLogin, avatar } = issue.user;

    return (
      <Wrapper>
        <H1>{login} / {repo}</H1>

        <h3>{DICTIONARY.ISSUE_NUMBER}</h3>
        <p>{issueNumber}</p>

        <h3>{DICTIONARY.ISSUE_TITLE}</h3>
        <p>{title}</p>

        <h3>{DICTIONARY.ISSUE_CREATION_DATE}</h3>
        <p>{new Date(creationDate).toLocaleString("ru")}</p>

        <a href={url}>{DICTIONARY.ISSUE_LINK}</a>

        <h3>{DICTIONARY.ISSUE_AUTHOR}</h3>
        <ProfileWrapper>
          <a href={profile}>{userLogin}</a>
        </ProfileWrapper>
        <Img src={avatar} alt={DICTIONARY.USER_AVATAR}/>
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
