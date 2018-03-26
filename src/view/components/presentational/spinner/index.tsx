import * as React from "react";
import { Circle, Svg, Wrapper } from "./styled";

const Spinner: React.SFC<{}> = () => (
  <Wrapper role="progressbar">
    <Svg viewBox="0 0 50 50">
      <Circle cx="25" cy="25" r="20" fill="none" strokeWidth="7"/>
    </Svg>
  </Wrapper>
);

export default Spinner;
