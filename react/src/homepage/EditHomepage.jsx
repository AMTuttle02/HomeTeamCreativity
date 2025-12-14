import React, { useState, useEffect } from "react";
import axios from 'axios';
import { reportError } from "../errorPages/errorHandling";
import { getAdmin } from "../admin/getAdmin";
import { useNavigate } from "react-router-dom";

function EditHomepage() {
  const file = "homepage/EditNavbar.jsx";
  const [welcome, setWelcome] = useState("");
  const [noWelcome, setNoWelcome] = useState("");
  const [headerLinks, setHeaderLinks] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featured, setFeatured] = useState("");
  const [featuredBelow, setFeaturedBelow] = useState("");
  const [categoryLinks, setCategoryLinks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingRow, setEditingRow] = useState({ name: '', link: '', position: null });
  const [productsEditingIndex, setProductsEditingIndex] = useState(-1);
  const [productsEditingRow, setProductsEditingRow] = useState({ product_id: '', position: null });
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showSaveError, setShowSaveError] = useState(false);
  const [saveErrorMessage, setSaveErrorMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(null); // null = loading, true/false = known
  const rowRefs = React.useRef([]);
  const commitTimeoutRef = React.useRef(null);
  const navigate = useNavigate();

  const clearCommit = () => {
    if (commitTimeoutRef.current) {
      clearTimeout(commitTimeoutRef.current);
      commitTimeoutRef.current = null;
    }
  }

  const scheduleCommit = (idx) => {
    clearCommit();
    commitTimeoutRef.current = setTimeout(() => {
      const updated = [...headerLinks];
      updated[idx] = { ...updated[idx], ...editingRow };
      setHeaderLinks(updated);
      setEditingIndex(-1);
      setEditingRow({ name: '', link: '', position: null });
      commitTimeoutRef.current = null;
    }, 150);
  }

  const scheduleCommitProducts = (idx) => {
    clearCommit();
    commitTimeoutRef.current = setTimeout(() => {
      const updated = [...featuredProducts];
      updated[idx] = { ...updated[idx], ...productsEditingRow };
      setFeaturedProducts(updated);
      setProductsEditingIndex(-1);
      setProductsEditingRow({ product_id: '', position: null });
      commitTimeoutRef.current = null;
    }, 150);
  }

  // Fetch initial data
  useEffect(() => {
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

    const fetchFeaturedProducts = async () => {
      const response = await axios.get('/api/product/featuredProducts.php');
      const formatted = response.data.map(product => ({
        product_id: product.product_id,
        position: product.featured
      }));
      setFeaturedProducts(formatted);
    };
    fetchFeaturedProducts();

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

    const fetchWelcome = async () => {
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
      try {
        const formData = new FormData();
        formData.append('page', 'homepage');
        formData.append('location', 'welcomeNoLogin');
        const response = await axios.post('/api/admin/getStaticText.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setNoWelcome(response.data);
      } catch (error) {
        reportError(error, "HomeContents.jsx");
      }
    }
    fetchWelcome();
  }, []);

  // serialize headerLinks into the backend format: name=...,link=...;name=...,link=...
  const serializeHeaderLinks = (links) => {
    if (!Array.isArray(links)) return '';
    // sort by numeric position (fallback to index+1)
    const sorted = [...links].sort((a, b) => {
      const pa = Number(a.position ?? 0) || 0;
      const pb = Number(b.position ?? 0) || 0;
      return pa - pb;
    });
    return sorted.map(l => {
      const name = (l.name || '').toString().replace(/[;,]/g, '');
      const link = (l.link || '').toString().replace(/[;,]/g, '');
      return `name=${name},link=${link}`;
    }).join(';');
  }

  // (removed) header link saving is now handled by the main form save

  // Save the form fields and headerLinks together. Inline edits commit locally on blur.
  const handleFormSave = async (event) => {
    event.preventDefault();
    // If a row is currently being edited, commit it locally before saving
    if (editingIndex !== -1) {
      const idx = editingIndex;
      const updated = [...headerLinks];
      updated[idx] = { ...updated[idx], ...editingRow };
      setHeaderLinks(updated);
      setEditingIndex(-1);
      setEditingRow({ name: '', link: '', position: null });
      if (commitTimeoutRef.current) {
        clearTimeout(commitTimeoutRef.current);
        commitTimeoutRef.current = null;
      }
    }

    // If a products row is currently being edited, commit it locally before saving
    if (productsEditingIndex !== -1) {
      const idx = productsEditingIndex;
      const updated = [...featuredProducts];
      updated[idx] = { ...updated[idx], ...productsEditingRow };
      setFeaturedProducts(updated);
      setProductsEditingIndex(-1);
      setProductsEditingRow({ product_id: '', position: null });
      if (commitTimeoutRef.current) {
        clearTimeout(commitTimeoutRef.current);
        commitTimeoutRef.current = null;
      }
    }

    // ensure headerLinks are ordered by position before saving
    const orderedHeaderLinks = Array.isArray(headerLinks)
      ? [...headerLinks].sort((a, b) => (Number(a.position ?? 0) || 0) - (Number(b.position ?? 0) || 0))
      : [];
    setHeaderLinks(orderedHeaderLinks);

    // ensure featuredProducts are ordered by position before saving
    const orderedFeaturedProducts = Array.isArray(featuredProducts)
      ? [...featuredProducts].sort((a, b) => (Number(a.position ?? 0) || 0) - (Number(b.position ?? 0) || 0))
      : [];
    setFeaturedProducts(orderedFeaturedProducts);

    const updates = [
      { location: 'welcomeLogin', text: welcome },
      { location: 'welcomeNoLogin', text: noWelcome },
      { location: 'featured', text: featured },
      { location: 'featuredBelow', text: featuredBelow },
      { location: 'headerLinks', text: serializeHeaderLinks(orderedHeaderLinks) },
    ];

    try {
      for (const u of updates) {
        const formData = new FormData();
        formData.append('page', 'homepage');
        formData.append('location', u.location);
        formData.append('text', u.text ?? '');
        const response = await axios.post('/api/admin/updateStaticText.php', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response.data !== 1) {
          throw(new Error('Failed to save ' + u.location + ': ' + JSON.stringify(response.data)));
        }
      }
      // update featured products
      const featuredData = orderedFeaturedProducts.map(p => ({ id: p.product_id, position: p.position }));
      const featuredResponse = await axios.post('/api/product/updateFeaturedProducts.php', featuredData, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (featuredResponse.data !== 1) {
        throw(new Error('Failed to save featured products: ' + JSON.stringify(featuredResponse.data)));
      }
      // all succeeded
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 2000);
    } catch (error) {
      reportError(error, file);
      setSaveErrorMessage(error?.message ? error.message : JSON.stringify(error));
      setShowSaveError(true);
    }
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const adminVal = await getAdmin();
        if (!mounted) return;
        // normalize adminVal to numeric 1 or 0
        setIsAdmin(Number(adminVal) === 1 ? 1 : 0);
      } catch (err) {
        console.error('Failed to get admin status', err);
        if (mounted) setIsAdmin(0);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // while loading admin status, render nothing
  if (isAdmin === null) return null;

  // only render edit UI for admin === 1
  if (isAdmin !== 1) navigate("/404");

  return (
      <div className='editHomepage'>
        <br />
        <div className="container">
          <h1 className="center">Edit Homepage Details</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Header Links</h2>
          </div>
          <table className="editNavbarTable">
            <thead>
              <tr>
                <th>Tag Display Name</th>
                <th>Link</th>
                <th>Position</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(headerLinks) && headerLinks.length > 0 ? (
                headerLinks.map((hl, idx) => (
                  <tr key={(hl.name || '') + idx}>
                    <td ref={el => rowRefs.current[idx] = el}>
                      {editingIndex === idx ? (
                          <input
                            type="text"
                            value={editingRow.name}
                            onChange={(e) => setEditingRow({ ...editingRow, name: e.target.value })}
                            onFocus={clearCommit}
                            onBlur={() => scheduleCommit(idx)}
                            className="formInput"
                          />
                      ) : (
                        hl.name
                      )}
                    </td>
                    <td>
                      {editingIndex === idx ? (
                          <input
                            type="text"
                            value={editingRow.link}
                            onChange={(e) => setEditingRow({ ...editingRow, link: e.target.value })}
                            onFocus={clearCommit}
                            onBlur={() => scheduleCommit(idx)}
                            className="formInput"
                          />
                      ) : (
                        hl.link
                      )}
                    </td>
                    <td>
                      {editingIndex === idx ? (
                          <input
                            type="number"
                            value={editingRow.position ?? ''}
                            onChange={(e) => setEditingRow({ ...editingRow, position: Number(e.target.value) })}
                            onFocus={clearCommit}
                            onBlur={() => scheduleCommit(idx)}
                            className="formInput"
                            min={1}
                          />
                      ) : (
                        hl.position ?? idx + 1
                      )}
                    </td>
                    <td>
                      {editingIndex === idx ? (
                        <>
                          <button
                            onClick={() => {
                              // cancel editing
                              setEditingIndex(-1);
                              setEditingRow({ name: '', link: '', position: null });
                              if (commitTimeoutRef.current) {
                                clearTimeout(commitTimeoutRef.current);
                                commitTimeoutRef.current = null;
                              }
                            }}
                            className="default-button"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingIndex(idx);
                            setEditingRow({ name: hl.name || '', link: hl.link || '', position: hl.position ?? idx + 1 });
                            // focus the first input after rendering
                            setTimeout(() => {
                              const ref = rowRefs.current[idx];
                              if (ref && ref.querySelector) {
                                const input = ref.querySelector('input');
                                if (input) input.focus();
                              }
                            }, 0);
                          }}
                          className="default-button"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          // client-side delete only; persist on main form save
                          const updated = headerLinks.filter((_, i) => i !== idx);
                          setHeaderLinks(updated);
                          // if we were editing this row, cancel editing
                          if (editingIndex === idx) {
                            setEditingIndex(-1);
                            setEditingRow({ name: '', link: '', position: null });
                          }
                        }}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="muted">No header links configured</td>
                </tr>
              )}
            </tbody>
          </table>
          <button
              className="default-button"
              onClick={() => {
                // append a new blank header link and open it for editing
                const updated = Array.isArray(headerLinks) ? [...headerLinks] : [];
                const newIndex = updated.length;
                updated.push({ name: '', link: '', position: newIndex + 1 });
                setHeaderLinks(updated);
                setEditingIndex(newIndex);
                setEditingRow({ name: '', link: '', position: newIndex + 1 });
              }}
            >
              Add Header Link
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Featured Products</h2>
          </div>
          <table className="editNavbarTable">
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Position</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(featuredProducts) && featuredProducts.length > 0 ? (
                featuredProducts.map((hl, idx) => (
                  <tr key={(hl.product_id || '') + idx}>
                    <td ref={el => rowRefs.current[idx] = el}>
                      {productsEditingIndex === idx ? (
                          <input
                            type="number"
                            value={productsEditingRow.product_id}
                            onChange={(e) => setProductsEditingRow({ ...productsEditingRow, product_id: e.target.value })}
                            onFocus={clearCommit}
                            onBlur={() => scheduleCommitProducts(idx)}
                            className="formInput"
                          />
                      ) : (
                        hl.product_id
                      )}
                    </td>
                    <td>
                      {productsEditingIndex === idx ? (
                          <input
                            type="number"
                            value={productsEditingRow.position ?? ''}
                            onChange={(e) => setProductsEditingRow({ ...productsEditingRow, position: Number(e.target.value) })}
                            onFocus={clearCommit}
                            onBlur={() => scheduleCommitProducts(idx)}
                            className="formInput"
                            min={1}
                          />
                      ) : (
                        hl.position ?? idx + 1
                      )}
                    </td>
                    <td>
                      {editingIndex === idx ? (
                        <>
                          <button
                            onClick={() => {
                              // cancel editing
                              setProductsEditingIndex(-1);
                              setProductsEditingRow({ product_id: '', position: null });
                              if (commitTimeoutRef.current) {
                                clearTimeout(commitTimeoutRef.current);
                                commitTimeoutRef.current = null;
                              }
                            }}
                            className="default-button"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setProductsEditingIndex(idx);
                            setProductsEditingRow({ product_id: hl.product_id || '', position: hl.position ?? idx + 1 });
                            // focus the first input after rendering
                            setTimeout(() => {
                              const ref = rowRefs.current[idx];
                              if (ref && ref.querySelector) {
                                const input = ref.querySelector('input');
                                if (input) input.focus();
                              }
                            }, 0);
                          }}
                          className="default-button"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          // client-side delete only; persist on main form save
                          const updated = featuredProducts.filter((_, i) => i !== idx);
                          setFeaturedProducts(updated);
                          // if we were editing this row, cancel editing
                          if (productsEditingIndex === idx) {
                            setProductsEditingIndex(-1);
                            setProductsEditingRow({ product_id: '', position: null });
                          }
                        }}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="muted">No featured products configured</td>
                </tr>
              )}
            </tbody>
          </table>
          <button
              className="default-button"
              onClick={() => {
                // append a new blank header link and open it for editing
                const updated = Array.isArray(featuredProducts) ? [...featuredProducts] : [];
                const newIndex = updated.length;
                updated.push({ product_id: '', position: newIndex + 1 });
                setFeaturedProducts(updated);
                setProductsEditingIndex(newIndex);
                setProductsEditingRow({ product_id: '', position: newIndex + 1 });
              }}
            >
              Add Featured Product
          </button>
          <form onSubmit={handleFormSave}>
            <br />
             <label>Default Welcome Message</label>
              <input
                type="text"
                id="noWelcome"
                name="noWelcome"
                className="formInput"
                value={noWelcome}
                onChange={(event) => setNoWelcome(event.target.value)}
              />
              <label>Logged In Welcome Message</label>
              <input
                type="text"
                id="welcome"
                name="welcome"
                className="formInput"
                value={welcome}
                onChange={(event) => setWelcome(event.target.value)}
              />
              <label>Featured Content Label</label>
              <input
                type="text"
                id="featured"
                name="featured"
                className="formInput"
                value={featured}
                onChange={(event) => setFeatured(event.target.value)}
              />
              <label>Lower Content Label</label>
              <input
                type="text"
                id="featuredBelow"
                name="featuredBelow"
                className="formInput"
                value={featuredBelow}
                onChange={(event) => setFeaturedBelow(event.target.value)}
              />
            <button className="default-button" type="submit">Save</button>
          </form>
          {showSaveSuccess &&
            <div className="confirmation-modal">
              <div className="confirmation-dialog">
                <h3>Saved</h3>
                <p>Your changes were saved successfully.</p>
                <div className="confirmation-buttons">
                  <button onClick={() => setShowSaveSuccess(false)} className="default-button">OK</button>
                </div>
              </div>
            </div>
          }
          {showSaveError &&
            <div className="confirmation-modal">
              <div className="confirmation-dialog">
                <h3>Save Failed. Please try again.</h3>
                <p>{saveErrorMessage}</p>
                <div className="confirmation-buttons">
                  <button onClick={() => setShowSaveError(false)} className="default-button">OK</button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
}
export default EditHomepage;