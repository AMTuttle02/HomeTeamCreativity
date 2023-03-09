import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { useActionData } from "react-router-dom";

function LoginSuccess() {
  return (
    <div>
      <h1>Login Successful!</h1>
    </div>
  );
}

function LoginFailed() {
  return (
    <div>
      <h1>Login Failed!</h1>
    </div>
  );
}

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");

  const [goodLogin, setGoodLogin] = useState(false);
  const [badLogin, setBadLogin] = useState(false)

  const handleValidation = (event) => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
    } else {
      setemailError("");
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
    } else {
      setpasswordError("");
    }

    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    
    if (handleValidation()) {
      fetch('http://localhost:80/PHP/login.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      })
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            setGoodLogin(true);
            setBadLogin(false);
          } else {
            setGoodLogin(false)
            setBadLogin(true);
          }
        })
        .catch(error => {
          console.error(error);
          setLoginStatus(false);
        });
    }

    return loginAccess;
  };

  return (
    <div className="UpdatedLogin">
      {goodLogin ? (
        <LoginSuccess />
      ) : (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
          <label><h1><u>Login</u></h1></label>
            {badLogin && <LoginFailed />}
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">
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
              </div>
              <div className="form-group">
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
              </div>
              <div className="form-group form-check">
                <a href="#">Forgot Password?</a>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
export default Login;
