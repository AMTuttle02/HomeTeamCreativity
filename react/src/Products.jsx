import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import BlackTshirt from "./assets/blackTShirt.png";
import BlackLongSleeve from "./assets/blackLongSleeve.png";
import BlackCrewneck from "./assets/blackCrewneck.png";
import BlackHoodie from "./assets/blackHoodie.png";
import GrayTshirt from "./assets/GreyTShirt.png";
import GrayLongSleeve from "./assets/GreyLongSleeve.png";
import GrayCrewneck from "./assets/GreyCrewneckSS.png";
import GrayHoodie from "./assets/GreyHoodie.png";
import RedTshirt from "./assets/RedTShirt.png";
import RedLongSleeve from "./assets/RedLongSleeve.png";
import RedHoodie from "./assets/RedHoodie.png";
import YellowTshirt from "./assets/YellowTShirt.png";
import PinkTshirt from "./assets/PinkTShirt.png";
import GreenTshirt from "./assets/GreenTShirt.png";
import MaroonTshirt from "./assets/MaroonTShirt.png";
import OrangeTshirt from "./assets/OrangeTShirt.png";
import PurpleTshirt from "./assets/PurpleTShirt.png";
import RoyalTshirt from "./assets/RoyalTShirt.png";
import RoyalLongSleeve from "./assets/RoyalLongSleeve.png";
import NavyTshirt from "./assets/NavyTShirt.png";
import NavyLongSleeve from "./assets/NavyLongSleece.png";
import NavyHoodie from "./assets/NavyHoodie.png";
import WhiteTshirt from "./assets/WhiteTShirt.png";
import WhiteLongSleeve from "./assets/WhiteLongSleeve.png";
import WhiteCrewneck from "./assets/WhiteCrewneckSS.png";
import WhiteHoodie from "./assets/WhiteHoodie.png";

function Products() {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [display, setDisplay] = useState("");
  const [admin, setAdmin] = useState(0);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1199);
  const amountPerPage = 20;
  const [page, setPage] = useState(1);
  const { category, subcategory } = useParams();

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
      navigate("/order/" + productId);
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

  useEffect(() => {
    if (subcategories.length > 0) {
      if (subcategory) {
        let valid = 0;
        for (let i = 0; i < subcategories.length; i++) {
          if (subcategories[i].name === subcategory) {
            setDisplay(subcategory);
            i = subcategories.length + 1;
            valid = 1;
          }
        }
        if (!valid) {
          navigate("/products");
          setDisplay("All");
        }
      }
      else if ((category === "Faith")
      || (category === "Family")
      || (category === "Health") 
      || (category === "Holiday") 
      || (category === "Ohio") 
      || (category === "Other") 
      || (category === "Patriotic") 
      || (category === "School") 
      || (category === "Seasons") 
      || (category === "Sports")) {
        setDisplay(category);
      }
      else {
        navigate("/products");
        setDisplay("All");
      }
    }
  }, [category, subcategory, subcategories]);

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
    if (product.default_style === "tshirt") {
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
    if (product.default_style === "longsleeve") {
      const lShirtMap = {
        "Black": BlackLongSleeve,
        "Gray": GrayLongSleeve,
        "Red": RedLongSleeve,
        "Royal": RoyalLongSleeve,
        "White": WhiteLongSleeve,
        "Navy": NavyLongSleeve
      }
      const regex = /\S+/;
      let firstWord = product.lColors.match(regex)[0];
      return(lShirtMap[firstWord]);
    }
    if (product.default_style === "crewneck") {
      const crewMap = {
        "Black": BlackCrewneck,
        "Gray": GrayCrewneck,
        "White": WhiteCrewneck
      }
      const regex = /\S+/;
      let firstWord = product.cColors.match(regex)[0];
      return(crewMap[firstWord]);
    }
    if (product.default_style === "hoodie") {
      const hoodieMap = {
        "Black": BlackHoodie,
        "Gray": GrayHoodie,
        "Red": RedHoodie,
        "White": WhiteHoodie,
        "Navy": NavyHoodie
      }
      const regex = /\S+/;
      let firstWord = product.hColors.match(regex)[0];
      return(hoodieMap[firstWord]);
    }
  }

  const getPrice = (price, style) => {
    if (style === "tshirt") {
      return ((price * 1 + 0) + ".00");
    }
    else if (style === "longsleeve") {
      return ((price * 1 + 4) + ".00");
    }
    else if (style === "crewneck") {
      return ((price * 1 + 8) + ".00");
    }
    else if (style === "hoodie") {
      return ((price * 1 + 12) + ".00"); 
    }
  }

  return (
    <div className="Products">
        <div className="productFilterRow">
          <div className="button-wrapper">
            <button onClick={() => navigate("/products/Faith")}>Faith</button>
          </div>
          <div className="button-wrapper">
            <button onClick={() => navigate("/products/Family")}>Family</button>
          </div>
          <div className="button-wrapper">
            <button onClick={() => navigate("/products/Health")}>Health {isMobile ? <></> : <>&#9660;</>}</button>
            <div className="subcategories">
            {subcategories.map((subcategory) => (
              <span key={subcategory.id}>
                {subcategory.category === "Health" &&
                  <><button onClick={() => navigate("/products/Health/" + subcategory.name)}>{subcategory.name}</button></>
                }
              </span>
            ))}
            </div>
          </div>
          <div className="button-wrapper">
            <button onClick={() => navigate("/products/Holiday")}>Holiday {isMobile ? <></> : <>&#9660;</>}</button>
            <div className="subcategories">
            {subcategories.map((subcategory) => (
              <span key={subcategory.id}>
                {subcategory.category === "Holiday" &&
                  <><button onClick={() => navigate("/products/Holiday/" + subcategory.name)}>{subcategory.name}</button></>
                }
              </span>
            ))}
            </div>
          </div>
          <div className="button-wrapper">
            <button onClick={() => navigate("/products/Ohio")}>Ohio</button>
          </div>
          <div className="button-wrapper">
            <button onClick={() => navigate("/products/Other")}>Other {isMobile ? <></> : <>&#9660;</>}</button>
            <div className="subcategories">
              {subcategories.map((subcategory) => (
                <span key={subcategory.id}>
                  {subcategory.category === "Other" &&
                    <><button onClick={() => navigate("/products/Other/" + subcategory.name)}>{subcategory.name}</button></>
                  }
                </span>
              ))}
            </div>
          </div>
          <div className="button-wrapper">
            <button onClick={() => navigate("/products/Patriotic")}>Patriotic</button>
          </div>
          <div className="button-wrapper">
            <button onClick={() => navigate("/products/School")}>School {isMobile ? <></> : <>&#9660;</>}</button>
            <div className="subcategories">
              {subcategories.map((subcategory) => (
                <span key={subcategory.id}>
                  {subcategory.category === "School" &&
                    <><button onClick={() => navigate("/products/School/" + subcategory.name)}>{subcategory.name}</button></>
                  }
                </span>
              ))}
            </div>
          </div>
          <div className="button-wrapper">
            <button onClick={() => navigate("/products/Seasons")}>Seasons {isMobile ? <></> : <>&#9660;</>}</button>
            <div className="subcategories">
              {subcategories.map((subcategory) => (
                <span key={subcategory.id}>
                  {subcategory.category === "Seasons" &&
                    <><button onClick={() => navigate("/products/Seasons/" + subcategory.name)}>{subcategory.name}</button></>
                  }
                </span>
              ))}
            </div>
          </div>
          <div className="button-wrapper">
            <button onClick={() => navigate("/products/Sports")}>Sports {isMobile ? <></> : <>&#9660;</>}</button>
            <div className="subcategories">
              {subcategories.map((subcategory) => (
                <span key={subcategory.id}>
                  {subcategory.category === "Sports" &&
                    <><button onClick={() => navigate("/products/Sports/" + subcategory.name)}>{subcategory.name}</button></>
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
              <button onClick={() => navigate("/products")}>See All Products</button>
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
              <button onClick={() => orderProduct(product.product_id)} className="magnify">
              <div className="fullDesign">
                <img
                  src={currentColor(product)}
                  alt="Product Style"
                  className="tshirt"
                />
                <img
                  src={window.location.origin + "/api/images/" + product.filename}
                  alt={product.filename}
                  className="design"
                />
              </div>
              <p>{product.product_name}</p>
              <p>{"$" + getPrice(product.price, product.default_style)}</p>
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
              <button onClick={() => navigate("/products")}>See All Products</button>
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
