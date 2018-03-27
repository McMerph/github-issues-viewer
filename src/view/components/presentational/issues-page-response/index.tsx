import * as React from "react";
import ApiState from "../../../../model/entities/ApiState";
import IIssue from "../../../../model/entities/IIssue";
import IIssues from "../../../../model/entities/IIssues";
import Issue from "../issue";
import Spinner from "../spinner";
import { Ul } from "./styled";

interface IProps {
  issues: IIssues;
  page: IIssue[] | undefined;
}

const IssuesPageResponse: React.SFC<IProps> = (props) => {
  const { issues, page } = props;

  if (issues.apiState === ApiState.Loading) {
    return <Spinner/>;
  } else if (issues.apiState === ApiState.Error) {
    // TODO Display error
    return null;
  } else if (page && page.length > 0) {
    return (
      <Ul>
        {page.map((issue, index) => <Issue issue={issue} key={index}/>)}
      </Ul>
    );
  } else {
    return null;
  }
};

export default IssuesPageResponse;
