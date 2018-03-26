import * as React from "react";
import { StyledSpinner } from "./styled";

interface IProps {
  backgroundColor: string;
}

const Spinner: React.SFC<IProps> = (props) =>
  <StyledSpinner theme={{ backgroundColor: props.backgroundColor }}/>;

export default Spinner;
