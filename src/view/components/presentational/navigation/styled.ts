import styled from "styled-components";
import Button from "../button/styled";
import { FONTS_STACK } from "../constants";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  font: normal 500 16px/1 ${FONTS_STACK.ROBOTO};
`;

const BackButton = Button.extend`
  margin-right: auto;
`;

const NextButton = Button.extend`
  margin-left: auto;
`;

export { Wrapper, Info, BackButton, NextButton };
