import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginSuccess() {
  const navigate = useNavigate();

  const logout = (e) => {
    fetch("/api/logout.php")
    .then((response) => response.json())
    .then((data) => {
      navigate("/loggedout");
      window.location.reload();
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

  if (firstName) {
    return (
      <div className='LoginSuccess'>
        <br />
        <div className="container">
          <h1>Hello {firstName}!</h1>
          <br />
          <h2>Welcome Back to Home Team Creativity!</h2>
          <h2>You are currently logged in.</h2>
          <br/>
          <button type="signUpButton" onClick={logout}>Log Out</button>
        </div>
      </div>
    );
  }
  else {
    navigate("/loggedout")
  }
}
export default LoginSuccess;
