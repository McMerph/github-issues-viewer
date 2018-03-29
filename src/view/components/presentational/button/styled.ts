import styled from "styled-components";
import { COLORS, FONTS_STACK } from "../constants";

const Button = styled.button`
  font: normal 500 16px/1 ${FONTS_STACK.ROBOTO};
  color: ${COLORS.COLOR01};
  cursor: pointer;
  border: none;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border-radius: 2px;
  background-color: ${COLORS.COLOR07};
  box-shadow:
    0 1px 5px 0 rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  user-select: none;
  padding: 14px;
  text-transform: uppercase;
  transition:
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:active,
  &:focus {
    box-shadow:
      0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 6px 10px 0 rgba(0, 0, 0, 0.14),
      0 1px 18px 0 rgba(0, 0, 0, 0.12);
  }

  &:disabled {
    color: ${COLORS.COLOR05};
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: ${COLORS.COLOR08};
  }

  &:active:enabled {
    background-color: ${COLORS.COLOR09};
  }
`;

export default Button;
