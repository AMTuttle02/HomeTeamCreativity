import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
import CreateAccountButton from "./CreateAccountButton";

function LoginFailed() {
  return (
    <div className="red">
      <p>Incorrect Email or Password</p>
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
    fetch("/api/login/loginDetails.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.user_id) {
          bcrypt.compare(password, data.pswrd, (err, isMatch) => {
            if (isMatch) {
              // Passwords match, authentication successful
              fetch("/api/login/login.php", {
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
    fetch("/api/admin/session.php")
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
    // Have to do a redirect. Cannot use navigate due to required navbar updates
    window.location.href = "/dashboard";
  } else {
    return (
      <div className="Login">
        <br />
        <div className="container">
          <h1 className="center">
            Login
          </h1>
          <form>
            <label>Email address</label>
            <input
              type="email"
              className="default-input"
              name="EmailInput"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <label>Password</label>
            <input
              type="password"
              className="default-input"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={() => navigate("/forgotpassword")} className="forgotPasswordButton">Forgot Password?</button>
            {loginAttempted && badLogin && <LoginFailed />}
            {localStorage.getItem("oID") ?
              <span>
              <button type="submit" className="default-button" onClick={(event) => confirmLogin(event)}>Log In</button>
              </span>
            :
              <span>
                <button type="submit" className="default-button" onClick={(event) => loginSubmit(event)}>Log In</button>
              </span>
            }
          </form>
          {showConfirmation &&
            <div className="confirmation-modal">
              <div className="confirmation-dialog">
                <h3>Confirm Login</h3>
                <p>This will remove any items you currently have in your cart.</p>
                <div className="confirmation-buttons">
                  <button onClick={() => setShowConfirmation(false)} className="default-button">Cancel</button>
                  <button onClick={(e) => loginSubmit(e)} className="delete-button">Login</button>
                </div>
              </div>
            </div>
          }
        </div>
        <CreateAccountButton />
        <Outlet />
      </div>
    );
  }
}

export default Login;
