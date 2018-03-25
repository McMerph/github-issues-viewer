import { injectGlobal } from "styled-components";

const RobotoLightLatinWoff2 = require("./resources/fonts/RobotoLightLatin.woff2");
const RobotoLightLatinWoff = require("./resources/fonts/RobotoLightLatin.woff");

const RobotoLightCyrillicWoff2 = require("./resources/fonts/RobotoLightCyrillic.woff2");
const RobotoLightCyrillicWoff = require("./resources/fonts/RobotoLightCyrillic.woff");

const RobotoRegularLatinWoff2 = require("./resources/fonts/RobotoRegularLatin.woff2");
const RobotoRegularLatinWoff = require("./resources/fonts/RobotoRegularLatin.woff");

const RobotoRegularCyrillicWoff2 = require("./resources/fonts/RobotoRegularCyrillic.woff2");
const RobotoRegularCyrillicWoff = require("./resources/fonts/RobotoRegularCyrillic.woff");

const RobotoMediumLatinWoff2 = require("./resources/fonts/RobotoMediumLatin.woff2");
const RobotoMediumLatinWoff = require("./resources/fonts/RobotoMediumLatin.woff");

const RobotoMediumCyrillicWoff2 = require("./resources/fonts/RobotoMediumCyrillic.woff2");
const RobotoMediumCyrillicWoff = require("./resources/fonts/RobotoMediumCyrillic.woff");

// tslint:disable:max-line-length
// tslint:disable-next-line:no-unused-expression
injectGlobal`
  html {
    touch-action: manipulation;
  }

  body {
    background-color: #e2e1e0;
  }

  /* RobotoLightLatin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src:
      local('Roboto Light'),
      local('Roboto-Light'),
      url(${RobotoLightLatinWoff2}) format('woff2'),
      url(${RobotoLightLatinWoff}) format('woff');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2212, U+2215;
  }

  /* RobotoLightCyrillic */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src:
      local('Roboto Light'),
      local('Roboto-Light'),
      url(${RobotoLightCyrillicWoff2}) format('woff2'),
      url(${RobotoLightCyrillicWoff}) format('woff');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }

  /* RobotoRegularLatin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src:
      local('Roboto'),
      local('Roboto-Regular'),
      url(${RobotoRegularLatinWoff2}) format('woff2'),
      url(${RobotoRegularLatinWoff}) format('woff');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2212, U+2215;
  }

  /* RobotoRegularCyrillic */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src:
      local('Roboto'),
      local('Roboto-Regular'),
      url(${RobotoRegularCyrillicWoff2}) format('woff2'),
      url(${RobotoRegularCyrillicWoff}) format('woff');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }

  /* RobotoMediumLatin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src:
      local('Roboto Medium'),
      local('Roboto-Medium'),
      url(${RobotoMediumLatinWoff2}) format('woff2'),
      url(${RobotoMediumLatinWoff}) format('woff');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2212, U+2215;
  }

  /* RobotoMediumCyrillic */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src:
      local('Roboto Medium'),
      local('Roboto-Medium'),
      url(${RobotoMediumCyrillicWoff2}) format('woff2'),
      url(${RobotoMediumCyrillicWoff}) format('woff');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
`;
// tslint:enable:max-line-length
