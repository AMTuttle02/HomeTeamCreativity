import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

function LoginPage ({onSignUpButton}) {
    return (
            <div className = "UserAccess">
                <Login />
                <br/><br/>
                <p>Don't Have An Account?
                <button onClick={onSignUpButton} className="signUpButton">Create An Account</button>
                </p>
            </div>
    );
}

function SignUpPage ({onLoginButton}) {
    return (
        <div className = "UserAccess">
            <SignUp />
            <br/><br/>
                <p>Already Have An Account?
                <button onClick={onLoginButton} className="signUpButton">Login </button>
                </p>
        </div>
    );
}

function UserAccess() {
    const [currentPage,setCurrentPage]=useState("login");

    const handleSignUpButton = () => {
        setCurrentPage("signup");
    }

    const handleLoginButton = () => {
        setCurrentPage("login");
    }

    return (
        <div className = "UserAccess">
            {currentPage === "login" ? (
                <LoginPage onSignUpButton={handleSignUpButton} />
            ): (
                <SignUpPage onLoginButton={handleLoginButton} />
            )}
        </div>
    );
}
export default UserAccess;