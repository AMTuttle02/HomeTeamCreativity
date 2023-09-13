import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import BlackTshirt from "./assets/blackTShirt.png";
import GrayTshirt from "./assets/GreyTShirt.png";
import RedTshirt from "./assets/RedTShirt.png";
import YellowTshirt from "./assets/YellowTShirt.png";
import PinkTshirt from "./assets/PinkTShirt.png";
import GreenTshirt from "./assets/GreenTShirt.png";
import MaroonTshirt from "./assets/MaroonTShirt.png";
import OrangeTshirt from "./assets/OrangeTShirt.png";
import PurpleTshirt from "./assets/PurpleTShirt.png";
import RoyalTshirt from "./assets/RoyalTShirt.png";
import WhiteTshirt from "./assets/WhiteTShirt.png";
import NavyTshirt from "./assets/NavyTShirt.png";

function Products() {
  const [products, setProducts] = useState([]);
  const [admin, setAdmin] = useState(0);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1199);

  useEffect(() => {
    // Function to update the isMobile state variable based on screen size
    function handleResize() {
      setIsMobile(window.innerWidth <= 1199);
    }

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const orderProduct = (productId) => {
    if (productId != 0) {
      const data = { id: productId };
      fetch("/api/setCurrentProduct.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            navigate("/order");
          }
        })
        .catch((error) => console.error(error));
    }
    else {
      navigate("/customOrder");
    }
  };

  const removeProduct = (productId) => {
    const data = { id: productId };
    fetch("/api/deleteProduct.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data == 1) {
          window.location.reload();
        }
        else {
          console.log(data);
        }
      })
  }

  useEffect(() => {
    fetch("/api/products.php")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });

      fetch("/api/session.php")
        .then((response) => response.json())
        .then((data) => {
          setAdmin(data.admin);
        });
  }, []);

  const currentColor = (product) => {
    const tShirtMap = {
      "Black": BlackTshirt,
      "Gray": GrayTshirt,
      "Yellow": YellowTshirt,
      "Pink": PinkTshirt,
      "Green": GreenTshirt,
      "Maroon": MaroonTshirt,
      "Orange": OrangeTshirt,
      "Purple": PurpleTshirt,
      "Red": RedTshirt,
      "Royal": RoyalTshirt,
      "White": WhiteTshirt,
      "Navy": NavyTshirt
    }
    const regex = /\S+/;
    let firstWord = product.tColors.match(regex)[0];
    return(tShirtMap[firstWord]);
  }

  return (
    <div className="Products">
        <div className="productFilterRow">
          <div className="button-wrapper">
            <button>Faith</button>
          </div>
          <div className="button-wrapper">
            <button>Family</button>
          </div>
          <div className="button-wrapper">
            <button>Health {isMobile ? <></> : <>&#9660;</>}</button>
            <div className="subcategories">
              <button>Autism</button>
            </div>
          </div>
          <div className="button-wrapper">
            <button>Holiday {isMobile ? <></> : <>&#9660;</>}</button>
              <div className="subcategories">
                <button>Christmas</button>
                <button>Halloween</button>
                <button>Thanksgiving</button>
                <button>Valentines</button>
              </div>
          </div>
          <div className="button-wrapper">
            <button>Ohio</button>
          </div>
          <div className="button-wrapper">
            <button>Other {isMobile ? <></> : <>&#9660;</>}</button>
              <div className="subcategories">
                <button>Disney</button>
                <button>Farming</button>
                <button>Fishing</button>
                <button>Friends Sitcom</button>
                <button>Quotes</button>
                <button>Scouts</button>
              </div>
          </div>
          <div className="button-wrapper">
            <button>Patriotic</button>
          </div>
          <div className="button-wrapper">
            <button>School {isMobile ? <></> : <>&#9660;</>}</button>
              <div className="subcategories">
                <button>Akron</button>
                <button>Chicago Moos</button>
                <button>Findlay</button>
                <button>Galion</button>
                <button>Kentucky</button>
                <button>Mount Gilead</button>
                <button>Northmor</button>
                <button>Ontario</button>
                <button>St. Joseph</button>
                <button>Seniors</button>
                <button>Teachers</button>
              </div>
          </div>
          <div className="button-wrapper">
            <button>Seasons {isMobile ? <></> : <>&#9660;</>}</button>
              <div className="subcategories">
                <button>Fall</button>
                <button>Spring</button>
                <button>Summer</button>
                <button>Winter</button>
              </div>
          </div>
          <div className="button-wrapper">
            <button>Sports {isMobile ? <></> : <>&#9660;</>}</button>
              <div className="subcategories">
                <button>Baseball</button>
                <button>Basketball</button>
                <button>Bowling</button>
                <button>Dance</button>
                <button>Football</button>
              </div>
          </div>
        </div>
      <h1>Products</h1>
      <p>
        For custom apparel,{" "}
        <a href="https://linktr.ee/hometeamcreativity" target="_blank">send us a message!</a>
      </p>
      <div className="productsRow">
        {products.map((product) => (
          <div key={product.product_id} className="productsCell">
            <div className="productDetails">
              <button onClick={() => orderProduct(product.product_id)} className="orderProducts">
              <div className="fullDesign">
                <img
                  src={currentColor(product)}
                  alt="Home Team Creativity Logo"
                  className="tshirt"
                />
                <img
                  src={"api/images/" + product.filename}
                  alt={product.filename}
                  className="design"
                />
              </div>
              <p>{product.product_name}</p>
              <p>{"$" + product.price}</p>
              </button>
              {admin ?
                <div className="center">
                  <button onClick={() => removeProduct(product.product_id)} className="RemoveProductButton">Delete</button>
                </div>
              : 
                <div />
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Products;
