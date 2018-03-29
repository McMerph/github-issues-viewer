import Button from "../button/styled";
import { cardCss } from "../card/styled";
import { COLORS, FONTS_STACK } from "../constants";
import styled from "./styled-components";

const Wrapper = styled.form`
  ${cardCss};
  box-shadow:
    0 2px 4px -1px rgba(0, 0, 0, 0.2),
    0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 16px;
  margin: 24px auto;
  background: ${COLORS.COLOR04};
`;

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`;

const Legend = styled.legend`
  margin: 0 auto;
  font: normal 500 26px/1 ${FONTS_STACK.ROBOTO};
  text-align: center;
`;

const Label = styled.label`
  font: normal 500 16px/1 ${FONTS_STACK.ROBOTO};
  color: ${COLORS.COLOR01};
  display: flex;
  align-items: baseline;
  margin: 16px 0;
`;

const LabelWithAutoComplete = Label.extend`
  & > div {
    margin-left: auto;
    flex: 0 1 70%;
  }

  & input {
    font: normal 500 16px/1 ${FONTS_STACK.ROBOTO};
    color: ${COLORS.COLOR01};
    padding: 6px 0;
    width: 100%;
    box-sizing: border-box;
  }
`;

const Input = styled.input`
  font: normal 500 16px/1 ${FONTS_STACK.ROBOTO};
  color: ${COLORS.COLOR01};
  padding: 6px 0;
  margin-left: auto;
  flex: 0 1 70%;
  box-sizing: border-box;
`;

const RetrieveButton = Button.extend`
  width: 100%;
`;

const Title = styled.div`
  font: normal 500 26px/1 ${FONTS_STACK.ROBOTO};
  text-align: center;
  margin: 16px 0;
`;

const MenuItem = styled.div`
  padding: 6px 2px;
  display: flex;
  background-color: ${(props) => props.theme.highlighted ? COLORS.COLOR10 : "transparent"};
`;

const MenuItemAppendix = styled.div`
  margin-left: auto;
`;

export {
  Wrapper,
  Fieldset,
  Legend,
  Label,
  Input,
  LabelWithAutoComplete,
  Title,
  RetrieveButton,
  MenuItem,
  MenuItemAppendix,
};
