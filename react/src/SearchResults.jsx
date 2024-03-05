import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DisplayProduct from "./DisplayProduct";

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
              <DisplayProduct product={product} />
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
