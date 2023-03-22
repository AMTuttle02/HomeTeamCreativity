import React, { useState, useEffect } from "react";

function HomeContents() {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.first_name);
      });
  }, []);

  return (
    <div className="index">
      {firstName ? <h1>Welcome Back {firstName}!</h1> : <h1><b>Welcome to Home Team Creativity!</b></h1>}
      <div className="row">
        <div className="side">
          <h2>Order Now Button Here</h2>
        </div>
        <div className="main">
          <h2>Featured Products Here</h2>
        </div>
      </div>
    </div>
  );
}

export default HomeContents;
