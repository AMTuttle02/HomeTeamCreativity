import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import cart from "../assets/cart.png";
import profile from "../assets/profile.png";
import './navbar.css';
import searchGlass from "../assets/Magnifyingglass.png";
import editIcon from "../assets/editIcon.svg";
import axios from "axios";
import email from "../assets/email.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";

function Navbar() {
  const [totalItems, setTotalItems] = useState(0);
  const [navbarContent, setNavbarContent] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchContents, setSearchContents] = useState("");
  const [admin, setAdmin] = useState(0);
  const [footer, setFooter] = useState("");
  const [footerLinks, setFooterLinks] = useState([]);
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

    const fetchFooter = async () => {
      const formData = new FormData();
      formData.append('page', 'homepage');
      formData.append('location', 'footer');
      const response = await axios.post('/api/admin/getStaticText.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFooter(response.data);
    };
    fetchFooter();

    const fetchFooterLinks = async () => {
      const formData = new FormData();
      formData.append('page', 'homepage');
      formData.append('location', 'footerLinks');
      const response = await axios.post('/api/admin/getStaticText.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const inputString = response.data;
      const links = inputString
                              .split(';')
                              .map(item => {
                                const [namePart, linkPart] = item.split(',');
                                const name = namePart.split('=')[1];
                                const link = linkPart.split('=')[1];
                                return { name, link };
                              });
      setFooterLinks(links);
    };
    fetchFooterLinks();
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
            <div className="dropdown">
              <button className="dropbtn">
              <div className="dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              </button>
              <div className="dropdown-content">
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
            {admin > 0 && 
            <>
              <Link to="editNavbar" className="editLink">
                  <img src={editIcon} alt="Edit Icon" className="editIcon" />
              </Link>
            </>}
          </div>
        }
        <Outlet/>
        <footer>
          {/* Footer Message */}
          <br/>
          <h1 className="noBold">{footer}</h1>
          {/* Footer Contents */}
          <div className="doubleRow">
            {footerLinks.map((item) => (
              <Link to={item.link} onClick={() => window.scrollTo(0,0)} className="footerLink" key={item.id}>
                {item.name}
              </Link>
            ))}

            {/* Social Media Image Links */}
            <Link to="https://www.facebook.com/hometeamcreativity?mibextid=ZbWKwL" target="_blank" className="socialMediaLink">
                <img src={facebook} alt="Facebook" className="socialMediaImg" />
            </Link>
            <Link to="https://www.instagram.com/hometeamcreativity?igsh=bGw1Z3lwcTcydzAx" target="_blank" className="socialMediaLink">
                <img src={instagram} alt="Instragram" className="socialMediaImg" />
            </Link>
            <Link to="mailto:admin@hometeamcreativity.com" target="_blank" className="socialMediaLink">
                <img src={email} alt="Email" className="socialMediaImg" />
            </Link>

            {navbarContent.map((item) => (
              <Link to={item.link} onClick={() => window.scrollTo(0,0)} className="footerHeaderLink" key={item.id}>
                <h1 className="noBold">{item.name}</h1>
              </Link>
            ))}
            <Link to={"/login"} onClick={() => window.scrollTo(0,0)} className="footerHeaderLink" key={"Login"}>
              <h1 className="noBold">Login</h1>
            </Link>
          </div>
        </footer>
      </div>
    );
  }
}
export default Navbar;