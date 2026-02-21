import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { reportError } from "../errorPages/errorHandling";
import "./categories.css";

function CreateCategories() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState("");
    const [target, setTarget] = useState("Subcategory");
  const [category, setCategory] = useState("");
    const [editableSubcategories, setEditableSubcategories] = useState([]);
    const [originalSubcategories, setOriginalSubcategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
    const [editableCategories, setEditableCategories] = useState([]);
    const [originalCategories, setOriginalCategories] = useState([]);

  // API Calls
  useEffect(() => {
    fetch("/api/admin/admin.php")
        .then((response) => response.json())
        .then((data) => {
        setAdmin(data.admin);
        }
    );

    fetch("/api/category/getSubCats.php")
        .then((response) => response.json())
        .then((data) => {
            setOriginalSubcategories(data);
            const editable = Array.isArray(data) ? data.map(s => ({ id: s.id, name: s.name, category: s.category })) : [];
            setEditableSubcategories(editable);
        }
    );

    fetch("/api/category/getCategories.php")
        .then((response) => response.json())
        .then((data) => {
            setAllCategories(data);
            setOriginalCategories(data);
            // initialize editable list from fetched categories
            const editable = Array.isArray(data) ? data.map(c => ({ id: c.id, category: c.category, position: c.position })) : [];
            setEditableCategories(editable);
            const posMap = {};
            let maxPos = 0;
            data.forEach((c) => {
                if (c.id !== undefined) posMap[c.id] = c.position ?? 0;
                const p = c.position ? Number(c.position) : 0;
                if (p > maxPos) maxPos = p;
            });
            setCategoryPositions(posMap);
        }
    );
  }, []);

    // Inline edit helpers for category table
    const updateEditable = (index, key, value) => {
        setEditableCategories((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [key]: value };
            return copy;
        });
    }

    const toggleDeleteEditable = (index) => {
        setEditableCategories((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], _deleted: !copy[index]._deleted };
            return copy;
        });
    }

    const addNewRowEditable = () => {
        const max = editableCategories.reduce((m, c) => Math.max(m, Number(c.position) || 0), 0);
        setEditableCategories((prev) => ([...prev, { id: 0, category: '', position: max + 1 }]));
    }

    const cancelEditableChanges = () => {
        setEditableCategories(originalCategories.map((c) => ({ id: c.id, category: c.category, position: c.position })));
    }

    const handleSaveAll = async () => {
        try {
            const requests = [];
            editableCategories.forEach((c) => {
                if (c.id === 0 && !c._deleted) {
                    const form = new FormData();
                    form.append('category', c.category);
                    form.append('position', c.position);
                    requests.push(axios.post('/api/category/createCategory.php', form, { headers: { 'Content-Type': 'multipart/form-data' } }));
                } else if (c.id > 0 && c._deleted) {
                    const form = new FormData();
                    form.append('id', c.id);
                    requests.push(axios.post('/api/category/removeCategory.php', form, { headers: { 'Content-Type': 'multipart/form-data' } }));
                } else if (c.id > 0 && !c._deleted) {
                    const form = new FormData();
                    form.append('id', c.id);
                    form.append('category', c.category);
                    form.append('position', c.position);
                    requests.push(axios.post('/api/category/updateCategory.php', form, { headers: { 'Content-Type': 'multipart/form-data' } }));
                }
            });

            const results = await Promise.all(requests);
            const ok = results.every(r => r && (r.data === 1 || r.status === 200));
            if (ok) location.reload();
            else throw('One or more saves failed');
        } catch (err) {
            reportError(err, 'categories/CreateCategories.jsx');
        }
    }

    // Subcategory inline edit helpers
    const updateEditableSub = (index, key, value) => {
        setEditableSubcategories((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [key]: value };
            return copy;
        });
    }

    const toggleDeleteEditableSub = (index) => {
        setEditableSubcategories((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], _deleted: !copy[index]._deleted };
            return copy;
        });
    }

    const addNewRowSub = () => {
        setEditableSubcategories((prev) => ([...prev, { id: 0, name: '', category: allCategories.length ? allCategories[0].category : '' }]));
    }

    const cancelSubChanges = () => {
        setEditableSubcategories(originalSubcategories.map((s) => ({ id: s.id, name: s.name, category: s.category })));
    }

    const handleSaveAllSubs = async () => {
        try {
            const requests = [];
            editableSubcategories.forEach((s) => {
                if (s.id === 0 && !s._deleted) {
                    const form = new FormData();
                    form.append('subcategory', s.name);
                    form.append('category', s.category);
                    requests.push(axios.post('/api/category/createSubcat.php', form, { headers: { 'Content-Type': 'multipart/form-data' } }));
                } else if (s.id > 0 && s._deleted) {
                    const form = new FormData();
                    form.append('id', s.id);
                    requests.push(axios.post('/api/category/removeSubcat.php', form, { headers: { 'Content-Type': 'multipart/form-data' } }));
                } else if (s.id > 0 && !s._deleted) {
                    const form = new FormData();
                    form.append('id', s.id);
                    form.append('name', s.name);
                    form.append('category', s.category);
                    requests.push(axios.post('/api/category/updateSubcat.php', form, { headers: { 'Content-Type': 'multipart/form-data' } }));
                }
            });

            const results = await Promise.all(requests);
            const ok = results.every(r => r && (r.data === 1 || r.status === 200));
            if (ok) location.reload();
            else throw('One or more subcategory saves failed');
        } catch (err) {
            reportError(err, 'categories/CreateCategories.jsx');
        }
    }

  if (admin) {
    return (
      <div className='Categories'>
        <br />
        <div className="container">
            <div className="noWrapRow">
                <div className="split45">
                    <button className="default-button" onClick={() => setTarget("Subcategory")}>Subcategory</button>
                </div>
                <div className="split10" />
                <div className="split45">
                    <button className="default-button" onClick={() => setTarget("Category")}>Category</button>
                </div>
            </div>
            <br />
            {target === "Subcategory" ? (
                <>
                    <h1 className="center">Edit Subcategories</h1>
                    <table className="editNavbarTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {editableSubcategories.map((s, idx) => (
                                <tr key={s.id ?? `new-${idx}`} className={s._deleted ? 'deleted-row' : ''}>
                                    <td>
                                        <input
                                            type="text"
                                            className="formInput"
                                            value={s.name}
                                            onChange={(e) => updateEditableSub(idx, 'name', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <select className="formInput" value={s.category} onChange={(e) => updateEditableSub(idx, 'category', e.target.value)}>
                                            {allCategories.map((cat) => (
                                                <option key={cat.id} value={cat.category}>{cat.category}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button className={s._deleted ? 'default-button' : 'delete-button'} onClick={() => toggleDeleteEditableSub(idx)}>
                                            {s._deleted ? 'Undo' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <div className="row">
                        <button className="default-button" onClick={addNewRowEditable}>Add Row</button>
                    </div>
                    <div className="row">
                            <button className="default-button" onClick={handleSaveAll}>Save Changes</button>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="center">Edit Categories</h1>
                    <table className="editNavbarTable">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Position</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {editableCategories.map((cat, idx) => (
                                <tr key={cat.id ?? `new-${idx}`} className={cat._deleted ? 'deleted-row' : ''}>
                                    <td>
                                        <input
                                            type="text"
                                            className="formInput"
                                            value={cat.category}
                                            onChange={(e) => updateEditable(idx, 'category', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            className="formInput"
                                            value={cat.position ?? ''}
                                            onChange={(e) => updateEditable(idx, 'position', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <button className={cat._deleted ? 'default-button' : 'delete-button'} onClick={() => toggleDeleteEditable(idx)}>
                                            {cat._deleted ? 'Undo' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <div className="row">
                        <button className="default-button" onClick={addNewRowEditable}>Add Row</button>
                    </div>
                    <div className="row">
                            <button className="default-button" onClick={handleSaveAll}>Save Changes</button>
                    </div>
                </>
            )}
        </div>
      </div>
    );
  }
  else {
    navigate("/404")
  }
}
export default CreateCategories;
