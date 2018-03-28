import * as React from "react";
import ApiState from "../../../../model/entities/ApiState";
import IIssue from "../../../../model/entities/issues/IIssue";
import IIssues from "../../../../model/entities/issues/IIssues";
import Issue from "../issue";
import Spinner from "../spinner";
import { Error, Img, Ul } from "./styled";

const warning = require("../../../resources/icons/warning.svg");

interface IProps {
  issues: IIssues;
  page: IIssue[] | undefined;
}

const IssuesResponse: React.SFC<IProps> = (props) => {
  const { issues, page } = props;

  if (issues.apiStatus.state === ApiState.Loading) {
    return <Spinner/>;
  } else if (issues.apiStatus.state === ApiState.Error) {
    return (
      // TODO Change to figure tag?
      <Error>
        <Img src={warning} alt="Ошибка"/>
        {issues.apiStatus.error}
      </Error>
    );
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
