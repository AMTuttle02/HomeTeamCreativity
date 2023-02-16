import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Login from "./login";
import Header from "./header"

function Index () {
  return (
    <div className="index">
      <div className="row">
        <div className="side">
          <h2>Order Now Button Here</h2>
        </div>
        <div className="main">
          <h2>Recent Products Here</h2>
        </div>
      </div>
    </div>
  );
}


const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <Header/>
    <Index/>
  </StrictMode>,
  rootElement
);
