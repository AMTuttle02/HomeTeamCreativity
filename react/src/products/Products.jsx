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
    // If showing all, include every product
    if (display === "All") {
      setFilteredProducts(products);
      setPage(1);
      return;
    }

    // Helper to safely split ID lists stored as semicolon-separated strings
    const parseIdList = (val) => {
      if (!val || typeof val !== 'string') return [];
      if (val.indexOf(';') !== -1) return val.split(';').map(s => s.trim()).filter(Boolean);
      return [val.trim()];
    };

    // Try to match a category by name first
    const matchedCategory = categories.find(cat => (cat.category || '').toLowerCase() === (display || '').toLowerCase());
    if (matchedCategory) {
      const catIdStr = String(matchedCategory.id);
      const filters = products.filter((product) => {
        // New format: product.categories contains semicolon-separated category ids
        const catField = product.categories || '';
        const ids = parseIdList(catField);
        if (ids.length > 0 && ids.includes(catIdStr)) return true;
        // Fallback to legacy name-based categories field
        if (typeof catField === 'string' && catField.toLowerCase().includes((display || '').toLowerCase())) return true;
        return false;
      });
      setFilteredProducts(filters);
      setPage(1);
      return;
    }

    // Try to match a subcategory by name
    const matchedSub = subcategories.find(sub => (sub.name || '').toLowerCase() === (display || '').toLowerCase());
    if (matchedSub) {
      const subIdStr = String(matchedSub.id);
      const filters = products.filter((product) => {
        // New format: product.subcategories contains semicolon-separated subcategory ids
        const subField = product.subcategories || '';
        const ids = parseIdList(subField);
        if (ids.length > 0 && ids.includes(subIdStr)) return true;
        // Fallback: maybe category names were stored in product.categories
        const catField = product.categories || '';
        if (typeof catField === 'string' && catField.toLowerCase().includes((display || '').toLowerCase())) return true;
        return false;
      });
      setFilteredProducts(filters);
      setPage(1);
      return;
    }

    // No match found: empty result
    setFilteredProducts([]);
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
    navigate("/order/" + productId);
  };

  // Navigates to edit page
  const editProduct = (productId) => {
    fetch("/api/product/setCurrentProduct.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "id": productId }),
    })
    .then((response) => response.json())
    .then(() => {
      navigate("/editProduct/" + productId);
    });
  }

  // Determine whether category needs a drop down. Values are cached for faster access
  const useMemoizedValidSubCategories = useMemo(() => {
    return (categoryName) => {
      // Find category object for the given name (if present)
      const cat = categories.find(c => (c.category || '').toLowerCase() === (categoryName || '').toLowerCase());
      const catId = cat ? String(cat.id) : null;
      return subcategories.some(sub => {
        if (!sub) return false;
        // sub.category may be a category name (legacy) or category id (new)
        if (catId && String(sub.category) === catId) return true;
        if (typeof sub.category === 'string' && sub.category.toLowerCase() === (categoryName || '').toLowerCase()) return true;
        return false;
      });
    };
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
                <div className="editWidth">
                  <button onClick={() => editProduct(product.product_id)} className="default-button">Edit</button>
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
