import React, { useState, useEffect } from "react";
import DisplayProduct from "../products/DisplayProduct";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getFirstName } from "../admin/getName";
import axios  from "axios";

function HomeContents() {
  const [firstName, setFirstName] = useState("");
  const [products, setProducts] = useState([]);
  const [welcome, setWelcome] = useState("");
  const navigate = useNavigate();

  const orderProduct = (productId) => {
    if (productId != 0) {
      navigate("/order/" + productId);
    }
    else {
      navigate("/customOrder");
    }
  };

  const getPrice = (price, style) => {
    if (style === "tshirt") {
      return ((price * 1 + 0));
    }
    else if (style === "longsleeve") {
      return ((price * 1 + 4));
    }
    else if (style === "crewneck") {
      return ((price * 1 + 8));
    }
    else if (style === "hoodie") {
      return ((price * 1 + 12)); 
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const fetchedFirstName = await getFirstName(); 
      setFirstName(fetchedFirstName);
    };
    fetchData();

    fetch("/api/product/featuredProducts.php")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const fetchWelcome = async () => {
      if (firstName) {
        try {
          const formData = new FormData();
          formData.append('page', 'homepage');
          formData.append('location', 'welcomeLogin');
          const response = await axios.post('/api/admin/getStaticText.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setWelcome(response.data);
        } catch (error) {
          reportError(error, "HomeContents.jsx");
        }
      } else {
        try {
          const formData = new FormData();
          formData.append('page', 'homepage');
          formData.append('location', 'welcomeNoLogin');
          const response = await axios.post('/api/admin/getStaticText.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setWelcome(response.data);
        } catch (error) {
          reportError(error, "HomeContents.jsx");
        }
      }
    }
    fetchWelcome();
  }, [firstName]);

  useEffect(() => {
    
  }, []);

  return (
    <div className="index">
      <h1 className="center">{welcome.replace('{firstName}', firstName)}</h1>
      <div className="HomeRow">
        <div className="homeSide">
          <div className="orderLinks">
            <br /><br /><br />
            <Link to='/order' className="OrderButton">Order Now</Link>
            <br /><br />
            <Link to='/products/School/St.%20Joseph' className="OrderButton">St. Joseph Products</Link>
            <br /><br />
            <Link to='/about' className="OrderButton">About Us</Link>
            <br /><br />
            <Link to="https://linktr.ee/hometeamcreativity" target="_blank" className="OrderButton">Contact Us</Link>
          </div>
        </div>
        <div className="homeMain">
          <h2>Featured Products</h2>
          <br />
          <div className="productsRow">
            {products.map((product) => (
              <div key={product.product_id} className="homeProductsCell">
                <div className="productDetails">
                  <button onClick={() => orderProduct(product.product_id)} className="magnify">
                  <DisplayProduct product={product} />
                  <p>{product.product_name}</p>
                  <p>{"$" + (getPrice(product.price, product.default_style)).toFixed(2)}</p>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default HomeContents;
