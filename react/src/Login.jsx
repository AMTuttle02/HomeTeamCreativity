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
  const [badLogin, setBadLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false); // New state variable to track login attempts

  const loginSubmit = (e) => {
    e.preventDefault();
    fetch("/api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.loggedin) {
          setLoggedIn(true);
        } else {
          setBadLogin(true);
        }
        setLoginAttempted(true); // Set login attempt status
      });
  };

  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.first_name);
      });
  }, []);

  useEffect(() => {
    if (firstName) {
      setLoggedIn(true);
    }
  }, [firstName]);

  useEffect(() => {
    setBadLogin(false);
  }, [email, password]);

  if (loggedIn) {
    window.location.href = "/loggedin";
  } else {
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
              <br />
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              {loginAttempted && badLogin && <LoginFailed />}
              <br />
              <button type="submit">Log In</button>
            </form>
          </div>
          <div className="UserAccess">
            <br />
            <br />
            <p>Don't Have An Account?</p>
            <p>
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
