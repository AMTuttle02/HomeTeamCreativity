import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

function SearchResults() {
  const { state } = useLocation();
  const { result } = state;
  const navigate = useNavigate();
  const amountPerPage = 20;
  const [page, setPage] = useState(1);

  const orderProduct = (productId) => {
    if (productId != 0) {
      navigate("/order/" + productId);
    }
    else {
      navigate("/customOrder");
    }
  };

  const [displayProducts, setDisplayProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filters = result.filter((product) =>
      product.categories.includes("All")
    );
    setFilteredProducts(filters);
    setPage(1);
  }, [result]);

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

  if (result) {
    return (
      <div className="Products">
      <div className="ProductHeaderRow">
        <div className="productsLeft">
          {page > 1 &&
            <span>
              <button onClick={() => setPage(page-1)}>{'<'}{/*&#129044;*/} Previous Page</button>
            </span>
          }
        </div>
        <div className="productsMain">
          <h1>Results</h1>
          <button onClick={() => navigate("/products")}>See All Products</button>
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
        <div className="productsMain" />
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
}

export default SearchResults;
