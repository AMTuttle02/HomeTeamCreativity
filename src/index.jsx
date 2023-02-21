import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Homepage from "./Homepage";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <Homepage />
  </StrictMode>,
  rootElement
);
