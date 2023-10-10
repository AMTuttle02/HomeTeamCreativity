import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function EmailConfirmation() {

  return (
    <div className="EmailConfirmation">
      <br />
      <div className="container">
        <h1> Reset Password Email Sent! </h1>
        <br />
          <h3>
            An email from "ResetPassword@hometeamcreativity.com" has been sent to you.
            Follow the link in the email to reset your password.
          </h3>
          <br />
          <center>
            <Link to="/products" className="ReturnShopping">Return to Shopping</Link>
          </center>
      </div>
    </div>
  );
}
export default EmailConfirmation;
