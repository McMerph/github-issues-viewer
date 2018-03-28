import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";
import ITheme from "./ITheme";

const { default: styled } = styledComponents as ThemedStyledComponentsModule<ITheme>;

export default styled;
