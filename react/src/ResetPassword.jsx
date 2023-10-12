import React, { useState,useEffect } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import bcrypt from 'bcryptjs';

function NoMatchPassword() {
  return (
    <div className="incorrectPassword">
      <h2>Passwords do not match. Please try again.</h2>
    </div>
  );
}

function EmailFailed() {
  return (
    <div className="incorrectPassword">
      <h2>Password reset has not been requested or token has expired. Please request a new token <Link to="/forgotpassword">here</Link>.</h2>
    </div>
  );
}

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [badLogin, setBadLogin] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {token} = useParams();

  const confirmLogin = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  }

  const handleValidation = (event) => {
    if (password != confirmPassword) {
      setBadLogin("password");
      return false;
    }
    if (!email.match(/^.+@.+\..+$/) || !email) {
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
    }
    if (!password.match(/^[\w\S]{8,}$/) || !password) {
      setpasswordError(
        "Password must be at least 8 characters."
      );
      return false;
    } else {
      setpasswordError("");
    }
    return true;
  };

  const passwordResetSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(false);
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    if (handleValidation()) {
      fetch('/api/resetPassword.php', {  
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
            console.log(data);
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

  useEffect(() => {
    setemailError("");
  }, [email]);

  useEffect(() => {
    setpasswordError("");
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
          <h1><u>Reset Your Password</u></h1>
          <form id="signupform">
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
            <br/>
            <label>New Password</label>
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
            <br/>
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Password"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <br />
            { badLogin === "password" && <NoMatchPassword /> }
            { badLogin === "email" && <EmailFailed /> }
            <br />
            {localStorage.getItem("oID") ?
                <>
                <button type="submit" onClick={(event) => confirmLogin(event)}>Update Password</button>
                </>
              :
                <>
                <button type="submit" onClick={(event) => passwordResetSubmit(event)}>Update Password</button>
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
                  <button onClick={(e) => passwordResetSubmit(e)} className="delete-button">Update Password</button>
                </div>
              </div>
            </div>
          }
        </div>
        <div className="UserAccess">
          <br/><br/>
          <p>Not what you're looking for?</p> 
          <p>
          <Link to="/login" className="signUpButton">Login Here</Link>
          </p>
        </div>
        <Outlet/>
      </div>
    );
  }
}
export default ResetPassword;