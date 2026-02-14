import React, { useState, useEffect } from "react";
import axios from "axios";
import { reportError } from "../errorPages/errorHandling";
import { getAdmin } from "../admin/getAdmin";
import { useNavigate } from "react-router-dom";

function EditPickupLocations() {
  const file = "checkout/EditPickupLocations.jsx";
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingValue, setEditingValue] = useState("");
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showSaveError, setShowSaveError] = useState(false);
  const [saveErrorMessage, setSaveErrorMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const formData = new FormData();
        formData.append('page', 'checkout');
        formData.append('location', 'pickupLocations');
        const response = await axios.post('/api/admin/getStaticText.php', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        const text = response.data ?? '';
        const arr = String(text).split(';').map(s => s.trim()).filter(Boolean);
        setItems(arr);
      } catch (err) {
        reportError(err, file);
        setItems([]);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const adminVal = await getAdmin();
        if (!mounted) return;
        setIsAdmin(Number(adminVal) === 1 ? 1 : 0);
      } catch (err) {
        console.error('Failed to get admin status', err);
        if (mounted) setIsAdmin(0);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (isAdmin === null) return null;
  if (isAdmin !== 1) navigate("/404");

  const handleAdd = () => {
    setItems([...items, ""]);
    setEditingIndex(items.length);
    setEditingValue("");
  };

  const handleEdit = (idx) => {
    setEditingIndex(idx);
    setEditingValue(items[idx] || "");
  };

  const handleDelete = (idx) => {
    const updated = items.filter((_, i) => i !== idx);
    setItems(updated);
    if (editingIndex === idx) {
      setEditingIndex(-1);
      setEditingValue("");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const text = items.map(i => (i || '').toString().replace(/;/g, '')).join(';');
      const formData = new FormData();
      formData.append('page', 'checkout');
      formData.append('location', 'pickupLocations');
      formData.append('text', text);
      const response = await axios.post('/api/admin/updateStaticText.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data !== 1) throw new Error('Save failed: ' + JSON.stringify(response.data));
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 2000);
    } catch (err) {
      reportError(err, file);
      setSaveErrorMessage(err?.message ? err.message : JSON.stringify(err));
      setShowSaveError(true);
    }
  };

  return (
    <div className="editPickupLocations">
      <br />
      <div className="container">
        <h1 className="center">Edit Pickup Locations</h1>
        <form onSubmit={handleSave}>
          <table className="editNavbarTable">
            <thead>
              <tr>
                <th>Location</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(items) && items.length > 0 ? (
                items.map((it, idx) => (
                  <tr key={idx}>
                    <td>
                      {editingIndex === idx ? (
                        <input
                          type="text"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onBlur={() => {
                            const updated = [...items];
                            updated[idx] = editingValue;
                            setItems(updated);
                            setEditingIndex(-1);
                            setEditingValue("");
                          }}
                          className="formInput"
                        />
                      ) : (
                        it
                      )}
                    </td>
                    <td>
                      {editingIndex === idx ? (
                        <button
                          onClick={() => {
                            const updated = [...items];
                            updated[idx] = editingValue;
                            setItems(updated);
                            setEditingIndex(-1);
                            setEditingValue("");
                          }}
                          type="button"
                          className="default-button"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(idx)}
                          type="button"
                          className="default-button"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(idx)}
                        type="button"
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="muted">No pickup locations configured</td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={{ marginTop: 12 }}>
            <button type="button" onClick={handleAdd} className="default-button">Add Location</button>
            <button type="submit" className="default-button" style={{ marginLeft: 8 }}>Save</button>
          </div>
        </form>

        {showSaveSuccess && (
          <div className="confirmation-modal">
            <div className="confirmation-dialog">
              <h3>Saved</h3>
              <p>Your changes were saved successfully.</p>
              <div className="confirmation-buttons">
                <button onClick={() => setShowSaveSuccess(false)} className="default-button">OK</button>
              </div>
            </div>
          </div>
        )}

        {showSaveError && (
          <div className="confirmation-modal">
            <div className="confirmation-dialog">
              <h3>Save Failed. Please try again.</h3>
              <p>{saveErrorMessage}</p>
              <div className="confirmation-buttons">
                <button onClick={() => setShowSaveError(false)} className="default-button">OK</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditPickupLocations;
