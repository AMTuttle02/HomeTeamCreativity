import React from "react";
import { useNavigate } from "react-router-dom";

function EmailConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="EmailConfirmation">
      <br />
      <div className="container">
        <h1 className="center"> Reset Password Email Sent! </h1>
          <h3 className="center">
            Follow the link in the email to reset your password.
          </h3>
          <button onClick={() => navigate("/products")} className="default-button">Return to Shopping</button>
      </div>
    </div>
  );
}
export default EmailConfirmation;
