import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

function LoginPage ({onSignUpButton}) {

    return (
        <div className = "UserAccess">
            <Login />
            <button onClick={onSignUpButton}>SignUp </button>
        </div>
    );
}

function SignUpPage ({onLoginButton}) {
    return (
        <div className = "UserAccess">
            <SignUp />
            <button onClick={onLoginButton}>Login </button>
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