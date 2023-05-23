import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

function LoginFailed() {
  return (
    <div className="incorrectPassword">
      <h2>Incorrect Email or Password</h2>
    </div>
  );
}
function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const [badLogin, setBadLogin] = useState("");
  const handleValidation = (event) => {
    let formIsValid = true;
    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
    } else {
      setemailError("");
    }
    if (!password.match(/^[\w\S]{8,}$/)) {
      formIsValid = false;
      setpasswordError(
        "Length must best min 8 Chracters and Max 22 Chracters"
      );
    } else {
      setpasswordError("");
    }
    return formIsValid;
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      fetch("/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          // If the email and password are valid, redirect to the homepage
          if (data.loggedin) {
            window.location.href = '/loggedin';
          } else {
            // If the email and password are not valid, display an error message
            setBadLogin(true);
          }
        });
    }
  };
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
    <div className="UpdatedLogin">
      <br />
      <div className="LoginPage">
        <div className="container">
          <h1>
            <u>Login</u>
          </h1>
          <form id="loginform" onSubmit={loginSubmit}>
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              id="EmailInput"
              name="EmailInput"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <small id="emailHelp" className="text-danger form-text">
              {emailError}
            </small>
            <br />
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <small id="passworderror" className="text-danger form-text">
              {passwordError}
            </small>
            { badLogin && <LoginFailed /> }
            <br />
            <button type="submit">Log In</button>
          </form>
        </div>
        <div className="UserAccess">
          <br />
          <br />
          <p>
            Don't Have An Account?
            <Link to="/signup" className="signUpButton">
              Create An Account
            </Link>
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
  }
}
export default Login;