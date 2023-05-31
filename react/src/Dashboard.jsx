import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = (e) => {
    fetch("/api/logout.php")
    .then((response) => response.json())
    .then((data) => {
      window.location.href='/loggedout';
    })
  }

  const upload = (e) => {
    navigate("/upload");
  }

  const [firstName, setFirstName] = useState("");
  const [admin, setAdmin] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.first_name);
      });
  }, []);

  useEffect(() => {
    fetch("/api/admin.php")
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data.admin);
      });
    fetch("/api/allOrders.php")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);

  if (admin) {
    return (
      <div className='Dashboard'>
        <br />
        <div className="dashboardContainer">
            <div className="row">
                <div className="dashUpload">
                    <button type="signUpButton" onClick={upload}>Upload Designs</button>
                </div>
                <div className="dashName">
                    <h1>Hello {firstName}!</h1>
                </div>
                <div className="dashLogOut">
                    <button type="signUpButton" onClick={logout}>Log Out</button>
                </div>
            </div>
            <br />
            <div className="BlackLine" />
            <br />
            <center>
                <h1> Current Orders </h1>
            </center>

        </div>
      </div>
    );
  }
  else {
    
  }
}
export default Dashboard;