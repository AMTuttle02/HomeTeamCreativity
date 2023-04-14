import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function LoginSuccess() {

  const logout = (e) => {
    fetch("/api/logout.php")
    .then((response) => response.json())
    .then((data) => {
      window.location.href='/loggedout';
    })
  }

  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.first_name);
      });
  }, []);

  const [admin, setAdmin] = useState("");
  useEffect(() => {
    fetch("/api/admin.php")
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data.admin);
      });
  }, []);

  if (firstName) {
    return (
      <div className='LoginSuccess'>
        <br />
        <div className="container">
          <h1>Hello {firstName}!</h1>
          <br />
          <h2>Welcome Back to Home Team Creativity!</h2>
          <h2>You are currently logged in.</h2>
          {admin ? <h2>Upload Designs <Link to="/upload">Here</Link></h2> : <></>}
          <h2>Already Ordered? View Your Recent Order <Link to="/orderComplete">Here</Link>!</h2>
          <br/>
          <button type="signUpButton" onClick={logout}>Log Out</button>
        </div>
      </div>
    );
  }
  else {}
}
export default LoginSuccess;