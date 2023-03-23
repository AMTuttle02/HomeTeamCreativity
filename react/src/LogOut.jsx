import React from "react";
import { Outlet, Link } from "react-router-dom";

function LogOut() {
  return (
      <div className='LogOut'>
        <br />
        <div className="container">
          <h1>You Have Successfully Logged Out</h1>
          <br />
          <h1>Come Back Soon!</h1>
          <br />
          <center>
            <Link to="/" className="ReturnHome">Return Home</Link>
          </center>
        </div>
        <Outlet/>
      </div>
    );
}
export default LogOut;
