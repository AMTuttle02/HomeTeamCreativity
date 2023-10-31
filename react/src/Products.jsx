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
  const [subcategories, setSubcategories] = useState([]);
  const [display, setDisplay] = useState("All");
  const [admin, setAdmin] = useState(0);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1199);
  const amountPerPage = 20;
  const [page, setPage] = useState(1);

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

  const editProduct = (productId) => {
    const data = { id: productId };
    fetch("/api/setCurrentProduct.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          navigate("/editproducts");
        }
      })
      .catch((error) => console.error(error));
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
    
    fetch("/api/getSubCats.php")
      .then((response) => response.json())
      .then((data) => {
        setSubcategories(data);
      })
  }, []);

  const [displayProducts, setDisplayProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filters = products.filter((product) =>
      product.categories.includes(display)
    );
    setFilteredProducts(filters);
    setPage(1);
  }, [products, display]);

  useEffect(() => {
    let temp = [];
    let tempLocation = 0;
    for (let i = (page * amountPerPage - 20); i < (page * amountPerPage); ++i) {
      if (filteredProducts[i]) {
        temp[tempLocation] = filteredProducts[i];
        ++tempLocation;
      }
    }
    setDisplayProducts(temp);
    window.scrollTo(0, 0);
  }, [filteredProducts, page]);

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
            <button onClick={() => setDisplay("Faith")}>Faith</button>
          </div>
          <div className="button-wrapper">
            <button onClick={() => setDisplay("Family")}>Family</button>
          </div>
          <div className="button-wrapper">
            <button onClick={() => setDisplay("Health")}>Health {isMobile ? <></> : <>&#9660;</>}</button>
            <div className="subcategories">
            {subcategories.map((subcategory) => (
              <span key={subcategory.id}>
                {subcategory.category === "Health" &&
                  <><button onClick={() => setDisplay(subcategory.name)}>{subcategory.name}</button></>
                }
              </span>
            ))}
            </div>
          </div>
          <div className="button-wrapper">
            <button onClick={() => setDisplay("Holiday")}>Holiday {isMobile ? <></> : <>&#9660;</>}</button>
            <div className="subcategories">
            {subcategories.map((subcategory) => (
              <span key={subcategory.id}>
                {subcategory.category === "Holiday" &&
                  <><button onClick={() => setDisplay(subcategory.name)}>{subcategory.name}</button></>
                }
              </span>
            ))}
            </div>
          </div>
          <div className="button-wrapper">
            <button onClick={() => setDisplay("Ohio")}>Ohio</button>
          </div>
          <div className="button-wrapper">
            <button onClick={() => setDisplay("Other")}>Other {isMobile ? <></> : <>&#9660;</>}</button>
            <div className="subcategories">
              {subcategories.map((subcategory) => (
                <span key={subcategory.id}>
                  {subcategory.category === "Other" &&
                    <><button onClick={() => setDisplay(subcategory.name)}>{subcategory.name}</button></>
                  }
                </span>
              ))}
            </div>
          </div>
          <div className="button-wrapper">
            <button onClick={() => setDisplay("Patriotic")}>Patriotic</button>
          </div>
          <div className="button-wrapper">
            <button onClick={() => setDisplay("School")}>School {isMobile ? <></> : <>&#9660;</>}</button>
            <div className="subcategories">
              {subcategories.map((subcategory) => (
                <span key={subcategory.id}>
                  {subcategory.category === "School" &&
                    <><button onClick={() => setDisplay(subcategory.name)}>{subcategory.name}</button></>
                  }
                </span>
              ))}
            </div>
          </div>
          <div className="button-wrapper">
            <button onClick={() => setDisplay("Seasons")}>Seasons {isMobile ? <></> : <>&#9660;</>}</button>
            <div className="subcategories">
              {subcategories.map((subcategory) => (
                <span key={subcategory.id}>
                  {subcategory.category === "Seasons" &&
                    <><button onClick={() => setDisplay(subcategory.name)}>{subcategory.name}</button></>
                  }
                </span>
              ))}
            </div>
          </div>
          <div className="button-wrapper">
            <button onClick={() => setDisplay("Sports")}>Sports {isMobile ? <></> : <>&#9660;</>}</button>
            <div className="subcategories">
              {subcategories.map((subcategory) => (
                <span key={subcategory.id}>
                  {subcategory.category === "Sports" &&
                    <><button onClick={() => setDisplay(subcategory.name)}>{subcategory.name}</button></>
                  }
                </span>
              ))}
            </div>
          </div>
        </div>
      <div className="ProductHeaderRow">
        <div className="productsLeft">
          {page > 1 &&
            <span>
              <button onClick={() => setPage(page-1)}>{'<'}{/*&#129044;*/} Previous Page</button>
            </span>
          }
        </div>
        <div className="productsMain">
          {display === ("All") ? 
            <span>
              <h1>Products</h1>
            </span>
            :
            <span>
              <h1>{display}</h1>
            </span>
          }
          {display !== ("All") &&
            <span>
              <button onClick={() => setDisplay("All")}>See All Products</button>
            </span>
          }
        </div>
        <div className="productsRight">
          {page < (filteredProducts.length / 20) && 
            <span>
              <button onClick={() => setPage(page+1)}>Next Page {'>'}{/*&#129046;*/}</button>
            </span>
          }
        </div>
      </div>
      <div className="productsRow">
        {displayProducts.map((product) => (
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
                  <button onClick={() => editProduct(product.product_id)} className="RemoveProductButton">Edit</button>
                </div>
              : 
                <div />
              }
            </div>
          </div>
        ))}
      </div>
      <div className="ProductHeaderRow">
        <div className="productsLeft">
          {page > 1 &&
            <span>
              <button onClick={() => setPage(page-1)}>{'<'}{/*&#129046;*/} Previous Page</button>
            </span>
          }
        </div>
        <div className="productsMain">
          {display !== ("All") &&
            <span>
              <button onClick={() => setDisplay("All")}>See All Products</button>
            </span>
          }
        </div>
        <div className="productsRight">
          {page < (filteredProducts.length / 20) && 
            <span>
              <button onClick={() => setPage(page+1)}>Next Page {'>'}{/*&#129046;*/}</button>
            </span>
          }
        </div>
      </div>
    </div>
  );
}
export default Products;
