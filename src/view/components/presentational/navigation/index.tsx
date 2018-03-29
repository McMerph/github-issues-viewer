import * as React from "react";
import ApiState from "../../../../model/entities/ApiState";
import IIssues from "../../../../model/entities/issues/IIssues";
import { DICTIONARY } from "../constants";
import { BackButton, Info, NextButton, Wrapper } from "./styled";

interface IProps {
  issues: IIssues;
  hasPrevious(): boolean;
  hasNext(): boolean;
  onPrevious(): void;
  onNext(): void;
}

const Navigation: React.SFC<IProps> = (props) => {
  const { issues, onPrevious, onNext } = props;

  const hasPrevious: boolean = props.hasPrevious();
  const hasNext: boolean = props.hasNext();
  const loading: boolean = issues.apiStatus.state === ApiState.Loading || false;
  const success: boolean = issues.apiStatus.state === ApiState.Success || false;
  const pageNumber: number | undefined = issues.request && issues.request.pageNumber;
  const lastPage: number | undefined = issues.response && issues.response.lastPageNumber || undefined;

  if (success && (hasPrevious || hasNext)) {
    return (
      <Wrapper>
        <BackButton
          type="button"
          disabled={!hasPrevious || loading}
          onClick={onPrevious}
        >
          ← {DICTIONARY.BACK}
        </BackButton>
        {pageNumber && lastPage && <Info>{pageNumber} {DICTIONARY.OF} {lastPage}</Info>}
        <NextButton
          type="button"
          disabled={!hasNext || loading}
          onClick={onNext}
        >
          {DICTIONARY.NEXT} →
        </NextButton>
      </Wrapper>
    );
  } else {
    return null;
  }
};

export default Navigation;
