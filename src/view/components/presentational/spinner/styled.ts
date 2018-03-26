import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  width: 40px;
  height: 40px;
  color: rgb(156, 39, 176);
  margin: 0 auto;
`;

const rotateAnimation = keyframes`
  to { transform: rotate(360deg); }
`;

const dashAnimation = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -120px;
  }
`;

const Svg = styled.svg`
  animation: ${rotateAnimation} 1.4s linear infinite;
`;

const Circle = styled.circle`
  stroke: currentColor;
  stroke-linecap: round;
  animation: ${dashAnimation} 1.4s ease-in-out infinite;
  stroke-dasharray: 80px, 200px;
  stroke-dashoffset: 0;
`;

export { Wrapper, Svg, Circle };
