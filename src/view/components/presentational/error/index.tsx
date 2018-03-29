import * as React from "react";
import { Img, Wrapper } from "./styled";

interface IProps {
  message: string;
}

const icon = require("../../../resources/icons/warning.svg");

const Error: React.SFC<IProps> = (props) => (
  <Wrapper>
    <Img src={icon} alt="Ошибка"/>
    {props.message}
  </Wrapper>
);

export default Error;
