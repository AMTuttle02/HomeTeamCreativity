import React, { useState, useEffect } from "react";
import axios from "axios";
import { reportError } from "../errorPages/errorHandling";
import { getAdmin } from "../admin/getAdmin";
import { useNavigate } from "react-router-dom";

function EditAbout() {
  const file = "static/EditAbout.jsx";
  const [header, setHeader] = useState("");
  const [main, setMain] = useState("");
  const [bottomHeader, setBottomHeader] = useState("");
  const [bottom, setBottom] = useState("");
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showSaveError, setShowSaveError] = useState(false);
  const [saveErrorMessage, setSaveErrorMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatic = async (location, setter) => {
      try {
        const formData = new FormData();
        formData.append("page", "aboutUs");
        formData.append("location", location);
        const response = await axios.post("/api/admin/getStaticText.php", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setter(response.data ?? "");
      } catch (err) {
        reportError(err, file);
      }
    };

    fetchStatic("header", setHeader);
    fetchStatic("main", setMain);
    fetchStatic("bottomHeader", setBottomHeader);
    fetchStatic("bottom", setBottom);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const adminVal = await getAdmin();
        if (!mounted) return;
        setIsAdmin(Number(adminVal) === 1 ? 1 : 0);
      } catch (err) {
        console.error("Failed to get admin status", err);
        if (mounted) setIsAdmin(0);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (isAdmin === null) return null;
  if (isAdmin !== 1) navigate("/404");

  const handleFormSave = async (event) => {
    event.preventDefault();
    const updates = [
      { location: "header", text: header },
      { location: "main", text: main },
      { location: "bottomHeader", text: bottomHeader },
      { location: "bottom", text: bottom },
    ];

    try {
      for (const u of updates) {
        const formData = new FormData();
        formData.append("page", "aboutUs");
        formData.append("location", u.location);
        formData.append("text", u.text ?? "");
        const response = await axios.post("/api/admin/updateStaticText.php", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.data !== 1) {
          throw(new Error('Failed to save ' + u.location + ': ' + JSON.stringify(response.data)));
        }
      }
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 2000);
    } catch (error) {
      reportError(error, file);
      setSaveErrorMessage(error?.message ? error.message : JSON.stringify(error));
      setShowSaveError(true);
    }
  };

  return (
    <div className="editAbout">
      <br />
      <div className="container">
        <h1 className="center">Edit About Page</h1>
        <form onSubmit={handleFormSave}>
          <label>Top Section Header</label>
          <input
            type="text"
            className="formInput"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />

          <label>Main Content</label>
          <textarea
            className="formInput"
            value={main}
            onChange={(e) => setMain(e.target.value)}
            rows={8}
          />

          <label>Bottom Header</label>
          <input
            type="text"
            className="formInput"
            value={bottomHeader}
            onChange={(e) => setBottomHeader(e.target.value)}
          />

          <label>Bottom Content</label>
          <textarea
            className="formInput"
            value={bottom}
            onChange={(e) => setBottom(e.target.value)}
            rows={6}
          />

          <button className="default-button" type="submit">Save</button>
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

export default EditAbout;
