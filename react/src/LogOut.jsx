import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

function LogOut() {
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.first_name);
      });
  }, []);

  if (firstName) {
    window.location.href='/loggedin';
  }
  else {
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
}
export default LogOut;
