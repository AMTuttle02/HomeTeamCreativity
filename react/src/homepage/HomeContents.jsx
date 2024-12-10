import React, { useState, useEffect } from "react";
import DisplayProduct from "../products/DisplayProduct";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getFirstName } from "../admin/getName";
import axios  from "axios";
import "./homepage.css";

function HomeContents() {
  const [firstName, setFirstName] = useState("");
  const [products, setProducts] = useState([]);
  const [welcome, setWelcome] = useState("");
  const [headerLinks, setHeaderLinks] = useState([]);
  const [featured, setFeatured] = useState("");
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

    const fetchHeaderLinks = async () => {
      const formData = new FormData();
      formData.append('page', 'homepage');
      formData.append('location', 'headerLinks');
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
      setHeaderLinks(links);
    };
    fetchHeaderLinks();

    const fetchFeatured = async () => {
      const formData = new FormData();
      formData.append('page', 'homepage');
      formData.append('location', 'featured');
      const response = await axios.post('/api/admin/getStaticText.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFeatured(response.data);
    };
    fetchFeatured();
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
      <h1 className="welcome">{welcome.replace('{firstName}', firstName)}</h1>
      <div className="row">
          {headerLinks.map((item) => (
            <Link to={item.link} className="homepageLink" key={item.name}>
              {item.name}
            </Link>
          ))}
      </div>
      <div className="row">
        <h1 className="featured">{featured}</h1>
      </div>
      
      <div className="row">
        {products.map((product) => (
          <div key={product.product_id} className="homeProductsCell">
            <button onClick={() => orderProduct(product.product_id)} className="magnify">
              <DisplayProduct product={product} />
              <p>{product.product_name}</p>
              <p>{"$" + (getPrice(product.price, product.default_style)).toFixed(2)}</p>
            </button>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default HomeContents;
