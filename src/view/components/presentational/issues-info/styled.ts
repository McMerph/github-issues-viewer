import styled from "styled-components";
import { COLORS, FONTS_STACK } from "../constants";

const Card = styled.div`
  box-sizing: border-box;
  width: 98%;
  max-width: 640px;
`;

const Head = Card.extend`
  font: normal 500 26px/1 ${FONTS_STACK.ROBOTO};
  text-align: center;
  box-shadow:
    0 2px 4px -1px rgba(0, 0, 0, 0.2),
    0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 16px 24px;
  margin: 24px auto;
  background: ${COLORS.COLOR4};
`;

const Navigation = Card.extend`
  display: flex;
  justify-content: center;
  align-items: center;
  font: normal 500 16px/1 ${FONTS_STACK.ROBOTO};
  margin: 16px auto;
  background: ${COLORS.COLOR3};
  padding: 8px;
`;

const Issue = Card.extend`
  box-shadow:
    0 1px 5px 0 rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  padding: 16px;
  margin: 10px auto;
  background: ${COLORS.COLOR3};
`;

const IssueHeader = styled.div`
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

const Button = styled.button`
  border: 1px solid ${COLORS.COLOR6};
  border-radius: 3px;
  outline: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background: linear-gradient(to bottom, ${COLORS.COLOR3}, ${COLORS.COLOR5});
  padding: 14px;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  transition:
    border-radius 150ms ease-in-out,
    transform 150ms ease-in-out;

  &:active {
    border-radius: 30px;
    transform: scale(1.1);
  }
`;

const BackButton = Button.extend`
  margin-right: auto;
`;

const NextButton = Button.extend`
  margin-left: auto;
`;

export { Head, Navigation, Issue, IssueHeader, DateTime, Title, BackButton, NextButton };
