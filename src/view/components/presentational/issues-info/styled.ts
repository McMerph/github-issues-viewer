import styled from "styled-components";
import Button from "../button/styled";
import Card from "../card/styled";
import { COLORS, FONTS_STACK } from "../constants";

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`;

const Legend = styled.legend`
  margin: 0 auto;
  font: normal 500 26px/1 ${FONTS_STACK.ROBOTO};
`;

const Label = styled.label`
  font: normal 500 16px/1 ${FONTS_STACK.ROBOTO};
  color: ${COLORS.COLOR1};
  display: flex;
  align-items: baseline;
  margin: 16px 0;
`;

const Input = styled.input`
  font: normal 500 16px/1 ${FONTS_STACK.ROBOTO};
  color: ${COLORS.COLOR1};
  padding: 6px 0;
  margin-left: auto;
  flex: 0 1 70%;
`;

const Head = Card.extend`
  box-shadow:
    0 2px 4px -1px rgba(0, 0, 0, 0.2),
    0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 16px;
  margin: 24px auto;
  background: ${COLORS.COLOR4};
`;

const HeadTitle = styled.div`
  font: normal 500 26px/1 ${FONTS_STACK.ROBOTO};
  text-align: center;
  margin: 16px 0;
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
`;

const RetrieveButton = Button.extend`
  width: 100%;
`;

export {
  Fieldset,
  Head,
  HeadTitle,
  Input,
  Label,
  Legend,
  RetrieveButton,
  Ul,
};
