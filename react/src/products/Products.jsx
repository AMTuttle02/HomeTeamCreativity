import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DisplayProduct from "./DisplayProduct";
import "./products.css";
import { GetProductPrice } from "./GetProductPrice";

function Products() {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [display, setDisplay] = useState("");
  const [admin, setAdmin] = useState(0);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1199);
  const amountPerPage = 20;
  const [page, setPage] = useState(1);
  const { category, subcategory } = useParams();
  const [displayProducts, setDisplayProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Mobile Check
  useEffect(() => {
    // Function to update the isMobile state variable based on screen size
    function handleResize() {
      setIsMobile(window.innerWidth <= 500);
    }

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // API Calls
  useEffect(() => {
    fetch("/api/product/products.php")
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
    });

    fetch("/api/admin/session.php")
    .then((response) => response.json())
    .then((data) => {
      setAdmin(data.admin);
    })
    
    fetch("/api/category/getSubCats.php")
    .then((response) => response.json())
    .then((data) => {
      setSubcategories(data);
    })

    fetch("/api/category/getCategories.php")
    .then((response) => response.json())
    .then((data) => {
      setCategories(data);
    })
  }, []);

  // Page setup based on category and subcategory in link
  useEffect(() => {
    if (subcategory) {
      if (subcategories.length > 0) {
        let valid = 0;
        for (let i = 0; i < subcategories.length; i++) {
          if ((subcategories[i].name).toLowerCase() === subcategory.toLowerCase()) {
            setDisplay(subcategories[i].name);
            localStorage.setItem('lastProductCategory', '/products/' + category + '/' + subcategories[i].name);
            i = subcategories.length + 1;
            valid = 1;
          }
        }
        if (!valid) {
          navigate("/products");
          setDisplay("All");
        }
      }
    }
    else if (category) {
      if (categories.length > 0) {
        console.log(categories);
        let valid = 0;
        for (let i = 0; i < categories.length; i++) {
          if ((categories[i].category).toLowerCase() === category.toLowerCase()) {
            setDisplay(categories[i].category);
            localStorage.setItem('lastProductCategory', '/products/' + categories[i].category);
            i = categories.length + 1;
            valid = 1;
          }
        }
        if (!valid) {
          navigate("/products");
          setDisplay("All");
        }
      }
    }
    else {
      localStorage.setItem('lastProductCategory', '/products');
      navigate("/products");
      setDisplay("All");
    }
  }, [category, subcategory, subcategories, categories]);

  // Displays appropriate products based on category
  useEffect(() => {
    const filters = products.filter((product) =>
      product.categories.includes(display)
    );
    setFilteredProducts(filters);
    setPage(1);
  }, [products, display]);

  // Displays 20 products per page and determines which to display based on page number
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

  // Navigates to order page
  const orderProduct = (productId) => {
    if (productId != 0) {
      navigate("/order/" + productId);
    }
    else {
      navigate("/customOrder");
    }
  };

  // Navigates to edit page
  const editProduct = (productId) => {
    const data = { id: productId };
    fetch("/api/product/setCurrentProduct.php", {
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

  // Determine whether category needs a drop down. Values are cached for faster access
  const useMemoizedValidSubCategories = useMemo(() => {
    const memoizedValidSubCategories = (categoryName) => {
        return subcategories.find(subcategory => subcategory.category === categoryName) !== undefined;
    };
    return memoizedValidSubCategories;
  }, [categories, subcategories]); 

  return (
    <div className="Products">
      <div className="productFilterRow">
        {categories.map((category) => (
          <div className="button-wrapper" key={category.id}>
            <button onClick={() => navigate("/products/" + category.category)}>
              {category.category}{(!isMobile && useMemoizedValidSubCategories(category.category)) ? <>&#9660;</> : <></>}
            </button>
            <div className="subcategories">
            {subcategories.map((subcategory) => (
              <span key={subcategory.id}>
                {subcategory.category === category.category &&
                  <span><button onClick={() => navigate("/products/" + category.category + "/" + subcategory.name)}>{subcategory.name}</button></span>
                }
              </span>
            ))}
            </div>
          </div>
        ))}
      </div>
      <div className="ProductHeaderRow">
        {/* Page Navigation */}
        <div className="productsLeft">
          {page > 1 &&
            <span>
              <button onClick={() => setPage(page-1)}>{'<'}{/*&#129044;*/} Previous Page</button>
            </span>
          }
        </div>
        {/* Header text to say what cateogry is being displayed */}
        <div className="productsMain">
          {display === ("All") ? 
            <span>
              <h1>Products</h1>
            </span>
            :
            <span>
              <h1>{display}</h1>
              <button onClick={() => navigate("/products")}>See All Products</button>
            </span>
          }
        </div>
        {/* Page Navigation */}
        <div className="productsRight">
          {page < (filteredProducts.length / 20) && 
            <span>
              <button onClick={() => setPage(page+1)}>Next Page {'>'}{/*&#129046;*/}</button>
            </span>
          }
        </div>
      </div>
      {/* Products */}
      <div className="productsRow">
        {displayProducts.map((product) => (
          <div key={product.product_id} className="productsCell">
            <div className="productDetails">
              <button onClick={() => orderProduct(product.product_id)} className="magnify">
              <DisplayProduct product={product} />
              <p>{product.product_name}</p>
              <p>{"$" + (GetProductPrice(product.price, product.default_style)).toFixed(2)}</p>
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
      {/* Page Navigation */}
      <div className="ProductHeaderRow">
        <div className="productsLeft">
          {page > 1 &&
            <span>
              <button onClick={() => setPage(page-1)}>{'<'} Previous Page</button>
            </span>
          }
        </div>
        {/* Return to all products link if in a category */}
        <div className="productsMain">
          {display !== ("All") &&
            <span>
              <button onClick={() => navigate("/products")}>See All Products</button>
            </span>
          }
        </div>
        {/* Page Navigation */}
        <div className="productsRight">
          {page < (filteredProducts.length / 20) && 
            <span>
              <button onClick={() => setPage(page+1)}>Next Page {'>'}</button>
            </span>
          }
        </div>
      </div>
    </div>
  );
}
export default Products;
