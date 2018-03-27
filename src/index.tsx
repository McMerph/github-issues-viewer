import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./model/store";
import ConnectedApp from "./view/components/containers/ConnectedApp";

import "babel-polyfill";
import "normalize.css/normalize.css";
import "whatwg-fetch";

import "./view/inject-global";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}><ConnectedApp/></Provider>,
    document.getElementById("root"),
  );
});
