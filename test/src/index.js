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
          <button>Order Now</button>
        </div>
        <div className="main">
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
