import * as React from "react";
import IIssue from "../../../../model/entities/IIssue";
import { DateTime, Header, Title, Wrapper } from "./styled";

interface IProps {
  issue: IIssue;
}

// TODO Check dateTime zone
const Issue: React.SFC<IProps> = (props) => {
  const { issue } = props;
  const { number: indexNumber, creationDate, title } = issue;

  return (
    <Wrapper>
      <Header>
        <div>{indexNumber}</div>
        <DateTime>
          {new Date(creationDate).toLocaleString("ru")}
        </DateTime>
      </Header>
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default Issue;
