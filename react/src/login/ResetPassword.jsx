import React, { useState,useEffect } from "react";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

function NoMatchPassword() {
  return (
    <div className="red">
      <p>Passwords do not match. Please try again.</p>
    </div>
  );
}

function EmailFailed() {
  return (
    <div className="red">
      <p>Password reset has not been requested or token has expired. Please request a new token <Link to="/forgotpassword">here</Link>.</p>
    </div>
  );
}

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [badLogin, setBadLogin] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {token} = useParams();
  const navigate = useNavigate();

  const confirmLogin = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  }

  const handleValidation = (event) => {
    if (password != confirmPassword) {
      setBadLogin("password");
      return false;
    }
    if (!RegExp(/^.+@.+\..+$/).exec(email) || !email) {
      setEmailError("Email Not Valid");
      return false;
    } else {
      setEmailError("");
    }
    if (!RegExp(/^[\w\S]{8,}$/).exec(password) || !password) {
      setPasswordError(
        "Password must be at least 8 characters."
      );
      return false;
    } else {
      setPasswordError("");
    }
    return true;
  };

  const passwordResetSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(false);
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    if (handleValidation()) {
      fetch('/api/login/resetPassword.php', {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "password" : hashedPassword,
          "email" : email,
          "token" : token
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // If the email and password are valid, redirect to the homepage
          if (data === 1) {
            localStorage.clear();
            window.location.href='/login';
          } else {
            // If the email and password are not valid, display an error message
            setBadLogin("email");
          }
        });
    }
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
    setEmailError("");
  }, [email]);

  useEffect(() => {
    setPasswordError("");
  }, [password]);

  useEffect(() => {
    if (password != confirmPassword) {
      setBadLogin("password");
    }
    else {
      setBadLogin(false);
    }
  }, [confirmPassword]);

  if (firstName) {
    window.location.href='/login';
  }
  else {
    return (
      <div className="ResetPassword">
        <br/>
        <div className="container">
          <h1 className="center">Reset Your Password</h1>
          <form id="signupform">
            <label>Email address</label>
            <input
              type="email"
              className="default-input"
              id="EmailInput"
              name="EmailInput"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <small id="emailHelp" className="red">
              {emailError}
            </small>
            <br/>
            <label>New Password</label>
            <input
              type="password"
              className="default-input"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <small id="passworderror" className="red">
              {passwordError}
            </small>
            <br/>
            <label>Confirm Password</label>
            <input
              type="password"
              className="default-input"
              id="exampleInputPassword2"
              placeholder="Password"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <br />
            { badLogin === "password" && <NoMatchPassword /> }
            { badLogin === "email" && <EmailFailed /> }
            <br />
            {localStorage.getItem("oID") ?
                <span>
                <button type="submit" className="default-button" onClick={(event) => confirmLogin(event)}>Update Password</button>
                </span>
              :
                <span>
                <button type="submit" className="default-button" onClick={(event) => passwordResetSubmit(event)}>Update Password</button>
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
                  <button onClick={(e) => passwordResetSubmit(e)} className="delete-button">Update Password</button>
                </div>
              </div>
            </div>
          }
        </div>
        <p className="center">Not what you're looking for?</p>
        <div className="row">
          <div className="mobileSplit30">
            <p>
              <button onClick={() => navigate("/login")} className="default-button">
              Login Here
              </button>
            </p>
            </div>
        </div>
        <Outlet/>
      </div>
    );
  }
}
export default ResetPassword;