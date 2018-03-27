import styled from "styled-components";
import { cardCss } from "../card/styled";
import { COLORS, FONTS_STACK } from "../constants";

const Wrapper = styled.li`
  ${cardCss};
  box-shadow:
    0 1px 5px 0 rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  padding: 16px;
  margin: 10px auto;
  background: ${COLORS.COLOR3};
  list-style: none;
`;

const Header = styled.div`
  display: flex;
  font: normal 400 14px/1 ${FONTS_STACK.ROBOTO};
  color: ${COLORS.COLOR2};
`;

const DateTime = styled.div`
  margin-left: auto;
`;

const Title = styled.div`
  color: ${COLORS.COLOR1};
  font: normal 500 16px/1 ${FONTS_STACK.ROBOTO};
  margin: 14px 0;
`;

export { Wrapper, Header, DateTime, Title };
