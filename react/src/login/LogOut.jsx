import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function LogOut() {
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/api/admin/session.php")
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.first_name);
      });
  }, []);

  if (firstName) {
    navigate('/dashboard');
  }
  else {
    return (
        <div className='LogOut'>
          <br />
          <div className="container">
            <h1 className="center">You Have Successfully Logged Out</h1>
            <h1 className="center">Come Back Soon!</h1>
              <button onClick={() => navigate("/")} className="default-button">Return Home</button>
          </div>
        </div>
      );
  }
}
export default LogOut;
