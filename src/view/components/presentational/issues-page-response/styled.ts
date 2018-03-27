import styled from "styled-components";
import { cardCss } from "../card/styled";
import { COLORS, FONTS_STACK } from "../constants";

const Error = styled.div`
  ${cardCss};
  margin: 14px auto;
  text-align: center;
  color: ${COLORS.COLOR1};
  font: normal 500 16px/1 ${FONTS_STACK.ROBOTO};
`;

const Img = styled.img`
  display: block;
  margin: 10px auto;
  width: 100px;
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
`;

export { Error, Img, Ul };
