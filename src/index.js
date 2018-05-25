import React from "react";
import { render } from "react-dom";
import MultiBlock from "./components/forms/MultiBlock";

import "semantic-ui-css/semantic.min.css";

const App = () => {
  return <MultiBlock />;
};

const ROOT = document.getElementById("root");
render(<App />, ROOT);
