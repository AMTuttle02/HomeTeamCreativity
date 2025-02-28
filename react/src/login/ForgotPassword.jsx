import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./login.css";
import CreateAccountButton from "./CreateAccountButton";

function LoginFailed() {
  return (
    <div className="red">
      <p>We don't have that email on file. Try another one!</p>
    </div>
  );
}

function ForgotPassword() {
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
    fetch("/api/login/newPasswordRequest.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data === 1) {
          navigate('/emailconfirmation');
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
  }, [email]);

  if (loggedIn) {
    navigate("/loggedin");
  } else {
    return (
      <div className="ForgotPassword">
        <br />
        <div className="container">
          <h1 className="center">
            Forgot Password
          </h1>
          <form id="loginform">
            <label>Email Address</label>
            <input
              type="email"
              className="default-input"
              id="EmailInput"
              name="EmailInput"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            {loginAttempted && badLogin && <LoginFailed />}
            {localStorage.getItem("oID") ?
              <span>
              <button type="submit" className="default-button" onClick={(event) => confirmLogin(event)}>Request New Password</button>
              </span>
            :
              <span>
              <button type="submit" className="default-button" onClick={(event) => loginSubmit(event)}>Request New Password</button>
              </span>
            }
          </form>
          {showConfirmation &&
            <div className="confirmation-modal">
              <div className="confirmation-dialog">
                <h3>Confirm Password Reset</h3>
                <p>This will remove any items you currently have in your cart.</p>
                <div className="confirmation-buttons">
                  <button onClick={() => setShowConfirmation(false)} className="default-button">Cancel</button>
                  <button onClick={(e) => loginSubmit(e)} className="delete-button">Reset Password</button>
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

export default ForgotPassword;
