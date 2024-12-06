import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import cart from "../assets/cart.png";
import profile from "../assets/profile.png";
import './homepage.css';
import searchGlass from "../assets/Magnifyingglass.png";
import editIcon from "../assets/editIcon.svg";

function Navbar() {
  const [totalItems, setTotalItems] = useState(0);
  const [navbarContent, setNavbarContent] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchContents, setSearchContents] = useState("");
  const [admin, setAdmin] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetch("/api/admin/getNavbar.php", {
      method: "GET"
    })
    .then((response) => response.json())
    .then((navbarValues) => {
      setNavbarContent(navbarValues);
    });
    fetch("/api/admin/session.php")
      .then((response) => response.json())
      .then((data) => {
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
    fetch("/api/admin/admin.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.admin);
      setAdmin(data.admin);
    });
  }, []);

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
  };

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


  if (navbarContent != []) {
    return (
      <div className="HomePage">
        {isMobile ? 
          <div className="navBar">
            <div class="dropdown">
              <button class="dropbtn">
              <div class="dots">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
              </button>
              <div class="dropdown-content">
                {navbarContent.map((item) => (
                <Link to={item.link} key={item.id}>
                  {item.name}
                </Link>
                ))}
              </div>
            </div>
            <img src={searchGlass} alt="Magnifying Glass" className="magnifyingGlass" onClick={handleSearchClick}/>
            {isSearchActive ? <>
              <form id="search" className="searchBox">
                <input type="text" className="search" value={searchContents} onChange={(event) => setSearchContents(event.target.value)} onKeyDown={handleKeyDown} />
                <button className='noDecoration' onClick={() => setIsSearchActive(false)}>X</button>
              </form>
              </>
            : <>
              <Link to="/" className="homeLink">
                  <img src={logo} alt="Home Team Creativity Logo" className="logo"/>
              </Link>
              <Link to="/login" className="profileLink">
                  <img src={profile} alt="Profile" className="profile" />
              </Link>
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
            </>}
          </div>
        :
          <div className="navBar">
            <Link to="/" className="homeLink">
                <img src={logo} alt="Home Team Creativity Logo" className="logo"/>
            </Link>
            {navbarContent.map((item) => (
                <Link to={item.link} className="navLink" key={item.id}>
                  {item.name}
                </Link>
            ))}
            <form id="search" className="searchBox">
              <input type="text" className="search" value={searchContents} onChange={(event) => setSearchContents(event.target.value)} onKeyDown={handleKeyDown} />
              <img src={searchGlass} alt="Magnifying Glass" className="magnifyingGlass" />
            </form>
            <Link to="/login" className="profileLink">
                <img src={profile} alt="Profile" className="profile" />
            </Link>
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
            {admin && 
            <>
              <Link to="editNavbar" className="editLink">
                  <img src={editIcon} alt="Edit Icon" className="editIcon" />
              </Link>
            </>}
          </div>
        }
        <Outlet/>
        <footer>
          <br/>
          <h1>Thank you for supporting small businesses!</h1>
        </footer>
      </div>
    );
  }
}
export default Navbar;