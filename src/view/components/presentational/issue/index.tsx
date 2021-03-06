import * as React from "react";
import { Link } from "react-router-dom";
import IIssue from "../../../../model/entities/issues/IIssue";
import { DICTIONARY } from "../constants";
import { DateTime, Header, Title, Wrapper } from "./styled";

interface IProps {
  issue: IIssue;
}

const Issue: React.SFC<IProps> = (props) => {
  const { issue } = props;
  const { number: indexNumber, creationDate, title } = issue;
  const link: string = `/issues/${issue.number}`;

  return (
    <Wrapper>
      <Header>
        <div>{indexNumber}</div>
        <DateTime>
          {new Date(creationDate).toLocaleString("ru")}
        </DateTime>
      </Header>
      <Title>{title}</Title>

      <Link to={link}>{DICTIONARY.VIEW}</Link>
    </Wrapper>
  );
};

export default Issue;
