import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const [fnameError, setfnameError] = useState("");
  const [lnameError, setlnameError] = useState("");

  const handleValidation = (event) => {
    let formIsValid = true;

    if (!fname.match(/^[a-zA-Z]{2,22}$/)) {
      formIsValid = false;
      setfnameError(
        "Only Letters and length must be min 2 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setfnameError("");
      formIsValid = true;
    }
    if (!lname.match(/^[a-zA-Z]{2,22}$/)) {
      formIsValid = false;
      setlnameError(
        "Only Letters and length must be min 2 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setlnameError("");
      formIsValid = true;
    }
    
    
    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
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
    handleValidation();
  };

  return (
    <div className="SignUp">
      <br/>
      <div className="container">
        <h1><u>Sign Up Below!</u></h1>
        <form id="signupform" onSubmit={signUpSubmit}>
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
          <button type="submit">
            Sign In
          </button>
        </form>
      </div>
      <div className="UserAccess">
        <br/><br/>
        <p>Already Have An Account?
        <Link to="/login" className="signUpButton">Login </Link>
        </p>
      </div>
      <Outlet/>
    </div>
  );
}
export default SignUp;
/*
fetch('signup.php', {  
  method: "POST",
  body: JSON.stringify({ 
    "first name":fname, 
    "last name" :lname,
    "email" : email,
    "password" : password
  }),
})*/
