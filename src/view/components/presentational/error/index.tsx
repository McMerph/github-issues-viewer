import * as React from "react";
import { DICTIONARY } from "../constants";
import { Img, Wrapper } from "./styled";

interface IProps {
  message: string;
}

// tslint:disable-next-line:no-var-requires
const icon = require("../../../resources/icons/warning.svg");

const Error: React.SFC<IProps> = (props) => (
  <Wrapper>
    <Img src={icon} alt={DICTIONARY.ERROR}/>
    {props.message}
  </Wrapper>
);

export default Error;
