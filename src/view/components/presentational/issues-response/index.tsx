import * as React from "react";
import ApiState from "../../../../model/entities/ApiState";
import IIssue from "../../../../model/entities/issues/IIssue";
import IIssues from "../../../../model/entities/issues/IIssues";
import Error from "../error";
import Issue from "../issue";
import Spinner from "../spinner";
import { Ul } from "./styled";

interface IProps {
  issues: IIssues;
  page: IIssue[] | undefined;
}

const IssuesResponse: React.SFC<IProps> = (props) => {
  const { issues, page } = props;

  if (issues.apiStatus.state === ApiState.Loading) {
    return <Spinner/>;
  } else if (issues.apiStatus.state === ApiState.Error) {
    return <Error message={issues.apiStatus.error || ""}/>;
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

export default IssuesResponse;
