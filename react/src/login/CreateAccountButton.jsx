import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function CreateAccountButton() {
  const navigate = useNavigate();

  return (
    <div className="CreateAccountButton">
      <p className="center">Don't Have An Account?</p>
      <div className="row">
        <div className="split30">
          <p>
            <button onClick={() => navigate("/signup")} className="default-button">
              Create An Account
            </button>
          </p>
          </div>
      </div>
    </div>
  );
}

export default CreateAccountButton;
