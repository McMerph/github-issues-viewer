import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";
import Theme from "./ITheme";

const { default: styled } = styledComponents as ThemedStyledComponentsModule<Theme>;

export default styled;
