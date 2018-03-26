import styled from "styled-components";
import { COLORS, FONTS_STACK } from "../constants";

const Button = styled.button`
  font: normal 500 16px/1 ${FONTS_STACK.ROBOTO};
  color: ${COLORS.COLOR1};
  cursor: pointer;
  border: 1px solid ${COLORS.COLOR6};
  border-radius: 3px;
  outline: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background: linear-gradient(to bottom, ${COLORS.COLOR3}, ${COLORS.COLOR5});
  padding: 14px;
  transition:
    border-radius 150ms ease-in-out,
    transform 150ms ease-in-out;

  &:active {
    border-radius: 30px;
    transform: scale(1.03);
  }

  &:disabled {
    color: ${COLORS.COLOR7};
    cursor: not-allowed;
  }
`;

export default Button;
