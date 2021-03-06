import styled from "styled-components";
import { cardCss } from "../card/styled";
import { COLORS, FONTS_STACK } from "../constants";

const Wrapper = styled.div`
  ${cardCss};
  margin: 14px auto;
  text-align: center;
  color: ${COLORS.COLOR01};
  font: normal 500 16px/1 ${FONTS_STACK.ROBOTO};
  word-wrap: break-word;
`;

const Img = styled.img`
  display: block;
  margin: 10px auto;
  width: 100px;
`;

export { Wrapper, Img };
