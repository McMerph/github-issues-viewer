import { keyframes } from "styled-components";
import styled from "./styled-components";

const animation = keyframes`
  to { transform: rotate(360deg); }
`;

const StyledSpinner = styled.div`
  border-radius: 50%;
  color: #9c27b0;
  font-size: 11px;
  margin: 48px auto;
  position: relative;
  width: 10em;
  height: 10em;
  box-shadow: inset 0 0 0 1em;

  &::before,
  &::after {
    position: absolute;
    content: '';
    border-radius: 50%;
    background: ${(props) => props.theme.backgroundColor};
    width: 5.2em;
    height: 10.2em;
  }

  &::before {
    border-radius: 10.2em 0 0 10.2em;
    top: -0.1em;
    left: -0.1em;
    transform-origin: 5.2em 5.1em;
    animation: ${animation} 2s infinite ease 1.5s;
  }

  &::after {
    border-radius: 0 10.2em 10.2em 0;
    top: -0.1em;
    left: 5.1em;
    transform-origin: 0 5.1em;
    animation: ${animation} 2s infinite ease;
  }
`;

export { StyledSpinner };
