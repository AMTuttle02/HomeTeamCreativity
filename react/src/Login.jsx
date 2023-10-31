import React, { useState, useEffect } from "react";
import { Outlet, Link, Navigate, useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

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
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const confirmLogin = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(false);
    fetch("/api/loginDetails.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.user_id) {
          bcrypt.compare(password, data.pswrd, (err, isMatch) => {
            if (err) {
              setBadLogin(true);
              setLoginAttempted(true);
            } else if (isMatch) {
              // Passwords match, authentication successful
              fetch("/api/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.loggedin) {
                    localStorage.clear();
                    setLoggedIn(true);
                  } else {
                    setBadLogin(true);
                  }
                  setLoginAttempted(true); // Set login attempt status
                });
            } else {
              // Passwords do not match, authentication failed
              // Handle the failure appropriately
              setBadLogin(true);
              setLoginAttempted(true);
            }
          });
        }
        else {
          setBadLogin(true);
          setLoginAttempted(true); // Set login attempt status
        }
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
            <form id="loginform">
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
              <Link to="/forgotpassword">Forgot Password?</Link>
              {loginAttempted && badLogin && <LoginFailed />}
              <br />
              {localStorage.getItem("oID") ?
                <>
                <button type="submit" onClick={(event) => confirmLogin(event)}>Log In</button>
                </>
              :
                <>
                <button type="submit" onClick={(event) => loginSubmit(event)}>Log In</button>
                </>
              }
            </form>
            {showConfirmation &&
              <div className="confirmation-modal">
                <div className="confirmation-dialog">
                  <h3>Confirm Login</h3>
                  <p>This will remove any items you currently have in your cart.</p>
                  <div className="confirmation-buttons">
                    <button onClick={() => setShowConfirmation(false)}>Cancel</button>
                    <button onClick={(e) => loginSubmit(e)} className="delete-button">Login</button>
                  </div>
                </div>
              </div>
            }
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
