import React, { useState,useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import bcrypt from 'bcryptjs';

function SignUpFailed() {
  return (
    <div className="incorrectPassword">
      <h2>Sorry, that email is already registered.</h2>
    </div>
  );
}

function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [badLogin, setBadLogin] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const confirmLogin = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  }

  const handleValidation = (event) => {
    if (!fName) {
      setFnameError(
        "First Name is required."
      );
      return false;
    }
    else if (!RegExp(/^[a-zA-Z]{1,50}$/).exec(fName)) {
      setFnameError(
        "Sorry, your first name is too long. Try a shorter one."
      );
      return false;
    } else {
      setFnameError("");
    }
    if (!lName) {
      setLnameError(
        "Last Name is required."
      );
      return false;
    }
    else if (!RegExp(/^[a-zA-Z]{1,50}$/).exec(lName)) {
      setLnameError(
        "Sorry, your last name is too long. Can you shorten it?"
      );
      return false;
    } else {
      setLnameError("");
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
  const signUpSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(false);
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    if (handleValidation()) {
      fetch('/api/signup.php', {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          "fname":fName, 
          "lname" :lName,
          "email" : email,
          "password" : hashedPassword
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // If the email and password are valid, redirect to the homepage
          if (data.loggedin) {
            localStorage.clear();
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

  useEffect(() => {
    if (fName && fName.length < 51) {
      setFnameError("");
    }
    
  }, [fName]);

  useEffect(() => {
    if (lName && lName.length < 51) {
      setLnameError("");
    }
  }, [lName]);

  useEffect(() => {
    setEmailError("");
  }, [email]);

  useEffect(() => {
    setPasswordError("");
  }, [password]);

  if (firstName) {
    window.location.href='/loggedin';
  }
  else {
    return (
      <div className="SignUp">
        <br/>
        <div className="container">
          <h1><u>Sign Up Below!</u></h1>
          <form id="signupform">
            <label>First Name</label>
            <input
              type="name"
              className="form-control"
              id="NameInput"
              name="NameInput"
              aria-describedby="nameHelp"
              placeholder="Enter your first name"
              onChange={(event) => setFName(event.target.value)}
            />
            <small id="nameHelp" className="text-danger form-text">
              {fnameError}
            </small>
            <br/>
            <label>Last Name</label>
            <input
              type="name"
              className="form-control"
              id="NameInput"
              name="NameInput"
              aria-describedby="nameHelp"
              placeholder="Enter your last name"
              onChange={(event) => setLName(event.target.value)}
            />
            <small id="nameHelp" className="text-danger form-text">
              {lnameError}
            </small>
            <br/>
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
            <br/>
            { badLogin && <SignUpFailed /> }
            <br />
            {localStorage.getItem("oID") ?
                <span>
                <button type="submit" onClick={(event) => confirmLogin(event)}>Sign Up</button>
                </span>
              :
                <span>
                <button type="submit" onClick={(event) => signUpSubmit(event)}>Sign Up</button>
                </span>
              }
          </form>
          {showConfirmation &&
            <div className="confirmation-modal">
              <div className="confirmation-dialog">
                <h3>Confirm Signup</h3>
                <p>This will remove any items you currently have in your cart.</p>
                <div className="confirmation-buttons">
                  <button onClick={() => setShowConfirmation(false)}>Cancel</button>
                  <button onClick={(e) => signUpSubmit(e)} className="delete-button">Sign Up</button>
                </div>
              </div>
            </div>
          }
        </div>
        <div className="UserAccess">
          <br/><br/>
          <p>Creating an account allows you to view past orders, see payments, and quickly buy again!</p>
          <p>Already Have An Account?</p> 
          <p>
          <Link to="/login" className="signUpButton">Login </Link>
          </p>
          
        </div>
        <Outlet/>
      </div>
    );
  }
}
export default SignUp;