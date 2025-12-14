import React, { useState, useEffect } from "react";
import DisplayProduct from "../products/DisplayProduct";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getFirstName } from "../admin/getName";
import axios  from "axios";
import "./homepage.css";
import { GetProductPrice } from "../products/GetProductPrice";
import editIcon from "../assets/editIcon.svg";

function HomeContents() {
  const [firstName, setFirstName] = useState("");
  const [products, setProducts] = useState([]);
  const [welcome, setWelcome] = useState("");
  const [headerLinks, setHeaderLinks] = useState([]);
  const [featured, setFeatured] = useState("");
  const [featuredBelow, setFeaturedBelow] = useState("");
  const [categoryLinks, setCategoryLinks] = useState([]);
  const [admin, setAdmin] = useState(0);
  const navigate = useNavigate();

  const orderProduct = (productId) => {
      navigate("/order/" + productId);
  };

  useEffect(() => {
    fetch("/api/admin/admin.php")
    .then((response) => response.json())
    .then((data) => {
      setAdmin(data.admin);
    });

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

    const fetchFeaturedBelow = async () => {
      const formData = new FormData();
      formData.append('page', 'homepage');
      formData.append('location', 'featuredBelow');
      const response = await axios.post('/api/admin/getStaticText.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFeaturedBelow(response.data);
    };
    fetchFeaturedBelow();

    const fetchCategoryLinks = async () => {
      fetch("/api/category/getCategories.php", {
        method: "GET"
      })
      .then((response) => response.json())
      .then((categories) => {
        setCategoryLinks(categories);
      });
    };
    fetchCategoryLinks();
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

  return (
    <div className="index">
      {/* Welcome Message */}
      <h1 className="welcome">{welcome.replace('{firstName}', firstName)}</h1>

      {/* Welcome Links */}
      <div className="row">
          {headerLinks.map((item) => (
            <Link to={item.link} className="homepageLink" key={item.name}>
              {item.name}
            </Link>
          ))}
      </div>

      {/* Featured Products */}
      <div className="row">
        <h1 className="featured">{featured}</h1>
      </div>
      <div className="row">
        {products.map((product) => (
          <div key={product.product_id} className="homeProductsCell">
            <button onClick={() => orderProduct(product.product_id)} className="magnify">
              <DisplayProduct product={product} />
              <p>{product.product_name}</p>
              <p>{"$" + (GetProductPrice(product.price, product.default_style)).toFixed(2)}</p>
            </button>
          </div>
        ))}
      </div>

      {/* Featured Categories */}
      <div className="row">
        <Link to={"/products"} className="featuredBelow">{featuredBelow}</Link>
      </div>
      <div className="doubleRow">
          {categoryLinks.map((item) => (
            <Link to={"/products/" + item.category} className="categoryLink" key={item.category}>
              {item.category}
            </Link>
          ))}
      </div>
      {admin > 0 && 
        <div className="default-width">
          <div className="right">
            <Link to="editHomepage" className="editLink">
              <img src={editIcon} alt="Edit Icon" className="editIcon" />
            </Link>
          </div>
        </div>
      }
      <Outlet />
    </div>


  );
}

export default HomeContents;
