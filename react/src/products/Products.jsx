import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const subcategoryParam = searchParams.get('subcategory');
  const pageParam = searchParams.get('page');
  const sortParam = searchParams.get('sort');
  const [displayProducts, setDisplayProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortMethod, setSortMethod] = useState('recent');
  const [popularity, setPopularity] = useState({});
  const [dropdownCategory, setDropdownCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

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

    // Fetch popularity counts for products
    fetch("/api/product/getProductPopularity.php")
      .then((response) => response.json())
      .then((data) => {
        setPopularity(data || {});
      })
      .catch(() => setPopularity({}));

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

  // Page setup based on category and subcategory in query params
  useEffect(() => {
    const category = categoryParam;
    const subcategory = subcategoryParam;

    if (subcategory) {
      if (subcategories.length > 0) {
        let valid = 0;
        for (let i = 0; i < subcategories.length; i++) {
          if ((subcategories[i].name).toLowerCase() === subcategory.toLowerCase()) {
            setDisplay(subcategories[i].name);
            localStorage.setItem('lastProductCategory', '/products?category=' + (category || '') + '&subcategory=' + subcategories[i].name);
            i = subcategories.length + 1;
            valid = 1;
          }
        }
        if (!valid) {
          navigate('/products');
          setDisplay('All');
        }
      }
    }
    else if (category) {
      if (categories.length > 0) {
        let valid = 0;
        for (let i = 0; i < categories.length; i++) {
          if ((categories[i].category).toLowerCase() === category.toLowerCase()) {
            setDisplay(categories[i].category);
            localStorage.setItem('lastProductCategory', '/products?category=' + categories[i].category);
            i = categories.length + 1;
            valid = 1;
          }
        }
        if (!valid) {
          navigate('/products');
          setDisplay('All');
        }
      }
    }
    else {
      localStorage.setItem('lastProductCategory', '/products');
      setSearchParams(buildParams(null, null, null, sortMethod));
      setDisplay('All');
    }
  }, [categoryParam, subcategoryParam, subcategories, categories]);

  // Sync sortMethod with URL param
  useEffect(() => {
    if (sortParam) {
      setSortMethod(sortParam);
    } else {
      setSortMethod('recent');
    }
  }, [sortParam]);

  // If the URL contains a page param, use it (validate positive integer)
  useEffect(() => {
    if (pageParam) {
      const p = parseInt(pageParam, 10);
      if (!isNaN(p) && p > 0) {
        setPage(p);
      } else {
        setSearchParams(buildParams(null, null, null, sortMethod));
      }
    } else {
      setPage(1);
    }
  }, [pageParam]);

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
    // Apply sorting then paginate
    const sorted = (() => {
      const arr = [...filteredProducts];
      if (sortMethod === 'alpha') {
        arr.sort((a, b) => (a.product_name || '').localeCompare(b.product_name || ''));
      } else if (sortMethod === 'recent') {
        arr.sort((a, b) => (Number(b.product_id) || 0) - (Number(a.product_id) || 0));
      } else if (sortMethod === 'price_low') {
        arr.sort((a, b) => (GetProductPrice(a.price, a.default_style) || 0) - (GetProductPrice(b.price, b.default_style) || 0));
      } else if (sortMethod === 'price_high') {
        arr.sort((a, b) => (GetProductPrice(b.price, b.default_style) || 0) - (GetProductPrice(a.price, a.default_style) || 0));
      } else if (sortMethod === 'popular') {
        arr.sort((a, b) => {
          const pa = Number(popularity[String(a.product_id)] || 0);
          const pb = Number(popularity[String(b.product_id)] || 0);
          if (pa !== pb) return pb - pa; // higher popularity first
          // If popularity equal (including both 0), fall back to most recent
          return (Number(b.product_id) || 0) - (Number(a.product_id) || 0);
        });
      }
      // Ensure product_id === 0 is first on page 1
      if (page === 1) {
        const idx = arr.findIndex(p => Number(p.product_id) === 0);
        if (idx > 0) {
          const [p0] = arr.splice(idx, 1);
          arr.unshift(p0);
        }
      }
      return arr;
    })();

    const temp = [];
    const start = (page - 1) * amountPerPage;
    const end = page * amountPerPage;
    for (let i = start; i < end; ++i) {
      if (sorted[i]) temp.push(sorted[i]);
    }
    setDisplayProducts(temp);
    window.scrollTo(0, 0);
  }, [filteredProducts, page, sortMethod, popularity]);

  // Helper to construct product paths preserving category/subcategory and page
  const buildProductsPath = (cat, sub, pg) => {
    const params = {};
    if (cat) params.category = cat;
    if (sub) params.subcategory = sub;
    if (pg && pg > 1) params.page = String(pg);
    const qs = new URLSearchParams(params).toString();
    return '/products' + (qs ? ('?' + qs) : '');
  }

  // Helper to build search params object including sort
  const buildParams = (cat, sub, pg, sort) => {
    const params = {};
    if (cat) params.category = cat;
    if (sub) params.subcategory = sub;
    if (pg && pg > 1) params.page = String(pg);
    if (sort) params.sort = sort;
    return params;
  }

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

  const selectValue = subcategoryParam ? `sub:${categoryParam}|${subcategoryParam}` : (categoryParam ? `cat:${categoryParam}` : '');

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="Products">
      <div className="productFilterRow" ref={dropdownRef}>
        <div className="filterLabel">Filter:</div>

        <div className="filterDropdowns" style={{flex: '0 0 auto'}}>
          <div className="customDropdown">
            <button className="customDropdownButton" onClick={() => setDropdownOpen((s) => !s)}>
              {display === "All" ? 'All Categories' : display} <span style={{marginLeft:8}}>&#9662;</span>
            </button>
            {dropdownOpen && (
              <div className="customDropdownMenu">
                <div className="dropdownItem" onClick={() => { setSearchParams(buildParams(null, null, null, sortMethod)); setDropdownOpen(false); }}>
                  All Products
                </div>
                {categories.map((cat) => {
                  const catId = String(cat.id);
                  const matchedSubs = subcategories.filter((sub) => {
                    if (!sub) return false;
                    if (catId && String(sub.category) === catId) return true;
                    if (typeof sub.category === 'string' && sub.category.toLowerCase() === (cat.category || '').toLowerCase()) return true;
                    return false;
                  });
                  return (
                    <div key={cat.id}>
                      <div className="dropdownItem dropdownCategory" onClick={() => { setSearchParams(buildParams(cat.category, null, null, sortMethod)); setDropdownOpen(false); }}>
                        {cat.category}
                      </div>
                      {matchedSubs.map((sub) => (
                        <div key={sub.id} className="dropdownItem dropdownSubItem" onClick={() => { setSearchParams(buildParams(cat.category, sub.name, null, sortMethod)); setDropdownOpen(false); }}>
                          {sub.name}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
          
          <div className="productFilterTitle">
            <h1>Products</h1>
          </div>

        <div className="filterDropdowns right" ref={sortRef}>
          <div className="filterLabel">Sort:</div>
          <div className="customDropdown">
            <button className="customDropdownButton" onClick={() => setSortOpen(s => !s)}>
              {sortMethod === 'recent' ? 'Recently Added' : (sortMethod === 'alpha' ? 'Alphabetical' : (sortMethod === 'price_low' ? 'Price Low to High' : (sortMethod === 'price_high' ? 'Price High to Low' : 'Most Popular')))} <span style={{marginLeft:8}}>&#9662;</span>
            </button>
            {sortOpen && (
              <div className="customDropdownMenu">
                <div className="dropdownItem" onClick={() => { setSortMethod('recent'); setSortOpen(false); setPage(1); setSearchParams(buildParams(categoryParam, subcategoryParam, 1, 'recent')); }}>
                  Recently Added
                </div>
                <div className="dropdownItem" onClick={() => { setSortMethod('alpha'); setSortOpen(false); setPage(1); setSearchParams(buildParams(categoryParam, subcategoryParam, 1, 'alpha')); }}>
                  Alphabetical
                </div>
                <div className="dropdownItem" onClick={() => { setSortMethod('price_low'); setSortOpen(false); setPage(1); setSearchParams(buildParams(categoryParam, subcategoryParam, 1, 'price_low')); }}>
                  Price Low to High
                </div>
                <div className="dropdownItem" onClick={() => { setSortMethod('price_high'); setSortOpen(false); setPage(1); setSearchParams(buildParams(categoryParam, subcategoryParam, 1, 'price_high')); }}>
                  Price High to Low
                </div>
                <div className="dropdownItem" onClick={() => { setSortMethod('popular'); setSortOpen(false); setPage(1); setSearchParams(buildParams(categoryParam, subcategoryParam, 1, 'popular')); }}>
                  Most Popular
                </div>
              </div>
            )}
          </div>
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
                <button onClick={() => {
                  const newPage = page - 1;
                  setPage(newPage);
                  setSearchParams(buildParams(categoryParam, subcategoryParam, newPage, sortMethod));
                }}>{'<'} Previous Page</button>
              </span>
            }
        </div>
        <div className="productsMain" />
        {/* Page Navigation */}
        <div className="productsRight">
          {page < (filteredProducts.length / 20) && 
            <span>
              <button onClick={() => {
                const newPage = page + 1;
                setPage(newPage);
                setSearchParams(buildParams(categoryParam, subcategoryParam, newPage, sortMethod));
              }}>Next Page {'>'}</button>
            </span>
          }
        </div>
      </div>
    </div>
  );
}
export default Products;
