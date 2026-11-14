import React, { useState, useEffect } from "react";
import axios from "axios";
import { reportError } from "../errorPages/errorHandling";
import { getAdmin } from "../admin/getAdmin";
import { useNavigate } from "react-router-dom";

function EditPickupLocations() {
  const file = "checkout/EditPickupLocations.jsx";
  const [items, setItems] = useState([]);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showSaveError, setShowSaveError] = useState(false);
  const [saveErrorMessage, setSaveErrorMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/admin/getPickupLocations.php');
        setItems(Array.isArray(response.data) ? response.data : []);
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
    setItems([...items, { location: "", charge_sales_tax: 0 }]);
  };

  const handleChange = (idx, key, value) => {
    setItems(items.map((item, index) => index === idx ? { ...item, [key]: value } : item));
  };

  const handleDelete = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/savePickupLocations.php', { locations: items });
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
                <th>Charge 9.75% Tax</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(items) && items.length > 0 ? (
                items.map((it, idx) => (
                  <tr key={idx}>
                    <td>
                      <input
                        type="text"
                        value={it.location}
                        onChange={(e) => handleChange(idx, 'location', e.target.value)}
                        className="formInput"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={Boolean(Number(it.charge_sales_tax))}
                        onChange={(e) => handleChange(idx, 'charge_sales_tax', e.target.checked ? 1 : 0)}
                        aria-label={`Charge sales tax at ${it.location || 'new pickup location'}`}
                      />
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
