import React from "react";
import { render } from "react-dom";
import App from "@components/app";
import WebFont from "webfontloader";

// add google webfonts here, then use in sass files
WebFont.load({
  google: {
    families: ["Rubik", "Karla", "Heebo", "sans-serif"]
  }
});

// import sass files
import "./styles/style.sass";

render(<App />, document.querySelector("#root"));

// absolutely needed for react hmr to work
// if using typescript, be sure to install @types/webpack -D
module.hot.accept();
