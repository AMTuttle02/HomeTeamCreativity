import React, { useState, useEffect } from "react";
import { Outlet, Link, Navigate, useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

function LoginFailed() {
  return (
    <div className="incorrectPassword">
      <h2>We don't have that email on file. Try another one!</h2>
    </div>
  );
}

function Login() {
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
    fetch("/api/newPasswordRequest.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data) {
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
  }, [email]);

  if (loggedIn) {
    window.location.href = "/loggedin";
  } else {
    return (
      <div className="UpdatedLogin">
        <br />
        <div className="LoginPage">
          <div className="container">
            <h1>
              <u>Forgot Password</u>
            </h1>
            <form id="loginform">
              <label>Email Address</label>
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
              {loginAttempted && badLogin && <LoginFailed />}
              <br />
              {localStorage.getItem("oID") ?
                <>
                <button type="submit" onClick={(event) => confirmLogin(event)}>Request New Password</button>
                </>
              :
                <>
                <button type="submit" onClick={(event) => loginSubmit(event)}>Request New Password</button>
                </>
              }
            </form>
            {showConfirmation &&
              <div className="confirmation-modal">
                <div className="confirmation-dialog">
                  <h3>Confirm Password Reset</h3>
                  <p>This will remove any items you currently have in your cart.</p>
                  <div className="confirmation-buttons">
                    <button onClick={() => setShowConfirmation(false)}>Cancel</button>
                    <button onClick={(e) => loginSubmit(e)} className="delete-button">Send Request</button>
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
