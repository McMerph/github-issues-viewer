import styled from "styled-components";
import { cardCss } from "../card/styled";
import { COLORS, FONTS_STACK } from "../constants";

const Wrapper = styled.div`
  ${cardCss};
  box-shadow:
    0 1px 5px 0 rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  padding: 16px;
  margin: 10px auto;
  background: ${COLORS.COLOR03};
  color: ${COLORS.COLOR01};
  font: normal 500 16px/1 ${FONTS_STACK.ROBOTO};
`;

const H1 = styled.h1`
  word-wrap: break-word;
`;

const ProfileWrapper = styled.div`
  margin: 16px 0;
`;

const Img = styled.img`
  width: 100%;
`;

export { Wrapper, H1, ProfileWrapper, Img };
