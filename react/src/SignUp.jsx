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
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const [fnameError, setfnameError] = useState("");
  const [lnameError, setlnameError] = useState("");
  const [badLogin, setBadLogin] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const confirmLogin = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  }

  const handleValidation = (event) => {
    let formIsValid = true;
    if (!fname) {
      formIsValid = false;
      setfnameError(
        "First Name is required."
      );
      return false;
    }
    else if (!fname.match(/^[a-zA-Z]{1,50}$/)) {
      formIsValid = false;
      setfnameError(
        "Sorry, your first name is too long. Try a shorter one."
      );
      return false;
    } else {
      setfnameError("");
      formIsValid = true;
    }
    if (!lname) {
      formIsValid = false;
      setlnameError(
        "Last Name is required."
      );
      return false;
    }
    else if (!lname.match(/^[a-zA-Z]{1,50}$/)) {
      formIsValid = false;
      setlnameError(
        "Sorry, your last name is too long. Can you shorten it?"
      );
      return false;
    } else {
      setlnameError("");
      formIsValid = true;
    }
    
    if (!email.match(/^.+@.+\..+$/) || !email) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }
    if (!password.match(/^[\w\S]{8,}$/) || !password) {
      formIsValid = false;
      setpasswordError(
        "Password must be at least 8 characters."
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }
    return formIsValid;
  };
  const signUpSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(false);
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    console.log(password);
    console.log(hashedPassword);
    if (handleValidation()) {
      fetch('/api/signup.php', {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          "fname":fname, 
          "lname" :lname,
          "email" : email,
          "password" : hashedPassword
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // If the email and password are valid, redirect to the homepage
          if (data.loggedin) {
            window.location.href = '/loggedin';
          } else {
            // If the email and password are not valid, display an error message
            setBadLogin(true);
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
    if (fname && fname.length < 51) {
      setfnameError("");
    }
    
  }, [fname]);

  useEffect(() => {
    if (lname && lname.length < 51) {
      setlnameError("");
    }
  }, [lname]);

  useEffect(() => {
    setemailError("");
  }, [email]);

  useEffect(() => {
    setpasswordError("");
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
                <>
                <button type="submit" onClick={(event) => confirmLogin(event)}>Sign Up</button>
                </>
              :
                <>
                <button type="submit" onClick={(event) => signUpSubmit(event)}>Sign Up</button>
                </>
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