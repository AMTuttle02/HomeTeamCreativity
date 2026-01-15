import React, { useState, useEffect } from "react";
import axios from "axios";
import { reportError } from "../errorPages/errorHandling";
import { getAdmin } from "../admin/getAdmin";
import { useNavigate } from "react-router-dom";

function EditHowItWorks() {
  const file = "static/EditHowItWorks.jsx";
  const [header, setHeader] = useState("");
  const [s1Header, setS1Header] = useState("");
  const [s1, setS1] = useState("");
  const [s2Header, setS2Header] = useState("");
  const [s2, setS2] = useState("");
  const [s3Header, setS3Header] = useState("");
  const [s3, setS3] = useState("");
  const [priceHeader, setPriceHeader] = useState("");
  const [starting, setStarting] = useState("");
  const [additional, setAdditional] = useState("");
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showSaveError, setShowSaveError] = useState(false);
  const [saveErrorMessage, setSaveErrorMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatic = async (location, setter) => {
      try {
        const formData = new FormData();
        formData.append("page", "howItWorks");
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
    fetchStatic("s1Header", setS1Header);
    fetchStatic("s1", setS1);
    fetchStatic("s2Header", setS2Header);
    fetchStatic("s2", setS2);
    fetchStatic("s3Header", setS3Header);
    fetchStatic("s3", setS3);
    fetchStatic("priceHeader", setPriceHeader);
    fetchStatic("starting", setStarting);
    fetchStatic("additional", setAdditional);
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
      { location: "s1Header", text: s1Header },
      { location: "s1", text: s1 },
      { location: "s2Header", text: s2Header },
      { location: "s2", text: s2 },
      { location: "s3Header", text: s3Header },
      { location: "s3", text: s3 },
      { location: "priceHeader", text: priceHeader },
      { location: "starting", text: starting },
      { location: "additional", text: additional },
    ];

    try {
      for (const u of updates) {
        const formData = new FormData();
        formData.append("page", "howItWorks");
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
    <div className="editHowItWorks">
      <br />
      <div className="container">
        <h1 className="center">Edit How It Works</h1>
        <form onSubmit={handleFormSave}>
          <label>Page Header</label>
          <input type="text" className="formInput" value={header} onChange={(e) => setHeader(e.target.value)} />

          <label>Section 1 Header</label>
          <input type="text" className="formInput" value={s1Header} onChange={(e) => setS1Header(e.target.value)} />
          <label>Section 1 Content (HTML allowed)</label>
          <textarea className="formInput" value={s1} onChange={(e) => setS1(e.target.value)} rows={8} />

          <label>Section 2 Header</label>
          <input type="text" className="formInput" value={s2Header} onChange={(e) => setS2Header(e.target.value)} />
          <label>Section 2 Content (HTML allowed)</label>
          <textarea className="formInput" value={s2} onChange={(e) => setS2(e.target.value)} rows={6} />

          <label>Section 3 Header</label>
          <input type="text" className="formInput" value={s3Header} onChange={(e) => setS3Header(e.target.value)} />
          <label>Section 3 Content (HTML allowed)</label>
          <textarea className="formInput" value={s3} onChange={(e) => setS3(e.target.value)} rows={8} />

          <label>Price Header</label>
          <input type="text" className="formInput" value={priceHeader} onChange={(e) => setPriceHeader(e.target.value)} />
          <label>Starting Prices (HTML allowed)</label>
          <textarea className="formInput" value={starting} onChange={(e) => setStarting(e.target.value)} rows={8} />

          <label>Additional Info (HTML allowed)</label>
          <textarea className="formInput" value={additional} onChange={(e) => setAdditional(e.target.value)} rows={6} />

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

export default EditHowItWorks;
