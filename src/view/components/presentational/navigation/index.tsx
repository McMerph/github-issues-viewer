import * as React from "react";
import ApiState from "../../../../model/entities/ApiState";
import IIssues from "../../../../model/entities/IIssues";
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
  const { lastPage } = issues;

  const hasPrevious: boolean = props.hasPrevious();
  const hasNext: boolean = props.hasNext();
  const loading: boolean = issues.apiState === ApiState.Loading;
  const pageNumber: number | undefined = issues.settings && issues.settings.pageNumber;

  if (hasPrevious || hasNext) {
    return (
      <Wrapper>
        <BackButton
          type="button"
          disabled={!hasPrevious || loading}
          onClick={onPrevious}
        >
          ← Назад
        </BackButton>
        {pageNumber && <Info>{pageNumber} из {lastPage}</Info>}
        <NextButton
          type="button"
          disabled={!hasNext || loading}
          onClick={onNext}
        >
          Далее →
        </NextButton>
      </Wrapper>
    );
  } else {
    return null;
  }
};

export default Navigation;
