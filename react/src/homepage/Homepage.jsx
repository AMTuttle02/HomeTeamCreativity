import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import cart from "../assets/cart.png";

function Homepage() {
  const navigate = useNavigate();

  const [searchContents, setSearchContents] = useState("");
  const [totalItems, setTotalItems] = useState(0);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      fetch("/api/product/search.php", {
        method: "POST",
        body: JSON.stringify({ searchContents }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            navigate('/searchResults', { state: {result: data}}, {search: '?q:'});
          }
          else {
            navigate({
              pathname: "/noResults"
            });
          }
        });
      
      event.target.blur();
    }
  }
  
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    fetch("/api/admin/session.php")
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.first_name);
        let oID = 0;
        if (localStorage.getItem("oID")) {
          oID = localStorage.getItem("oID");
        }
        else if (data.userId) {
          oID = 0;
        }
        fetch("/api/order/totalItems.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: oID
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          if (data["SUM(product_quantity)"]) {
            setTotalItems(data["SUM(product_quantity)"]);
          }
          else {
            setTotalItems(0);
          }
        })
      });
      
  }, []);

  let Login = 'Login';

  if (firstName) {
    Login = 'Dashboard';
  }

  return (
    <div className="HomePage">
      <div className="navbar">
        <Link to="/" className="homeLink">
            <img src={logo} alt="Home Team Creativity Logo" className="logo"/>
        </Link>
        <Link to="products" className="navLink">
          Products
        </Link>
        <Link to="howitworks" className="navLink">
          How It Works
        </Link>
        <Link to="about" className="navLink">
          About Us
        </Link>
        <Link to="login" className="navLink">
          {Login}
        </Link>
        <form id="search" className="searchBox">
          <input type="text" className="search" placeholder="Search..." value={searchContents} onChange={(event) => setSearchContents(event.target.value)} onKeyDown={handleKeyDown} />
        </form>
        <Link to="cart" className="cartLink">
            <div className="imageSize">
              <img src={cart} alt="Cart" className="cart" />
              {totalItems ? 
                <div className="circle">
                  <span className="number">{totalItems}</span>
                </div>
              :
                <span />
              }
            </div>
        </Link>
      </div>
      <Outlet/>
      <footer>
        <br/>
        <h1>Thank you for supporting small businesses!</h1>
      </footer>
    </div>
  );
}
export default Homepage;