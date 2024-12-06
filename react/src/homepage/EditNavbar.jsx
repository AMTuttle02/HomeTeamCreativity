import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './homepage.css';
import axios from 'axios';
import { reportError } from "../errorPages/errorHandling";

function EditNavbar() {
  const [admin, setAdmin] = useState(0);
  const [id, setId] = useState(0);
  const [tagName, setTagName] = useState("Tag Name");
  const [position, setPosition] = useState(1);
  const [link, setLink] = useState("Link");
  const [navbar, setNavbar] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteLink, setDeleteLink] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/admin/session.php")
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data.admin);
      });
    fetch("/api/admin/getNavbar.php")
      .then((response) => response.json())
      .then((data) => {
        setNavbar(data);
      })
  }, []);

  const verifyData = () => {
    if (tagName != '' && link.includes("/") && position > 0) {
      return true;
    } else {
      return false;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!verifyData()) {
      setShowConfirmation(true);
      return;
    }

    const formData = new FormData();
    formData.append('tagName', tagName);
    formData.append('link', link);
    formData.append('position', position);
    if (id === 0) {
      try {
        const response = await axios.post('/api/admin/addNavbarLink.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data === 1) {
          location.reload();
        } else {
          throw("ERR: Navbar Link insertion failed with tagName: " + tagName + ", link: " + link + ", position: " + position + ". " + response.data);
        }
      } catch (error) {
        reportError(error);
      }
    } else {
      formData.append('id', id);
      try {
        const response = await axios.post('/api/admin/updateNavbarLink.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data === 1) {
          location.reload();
        } else {
          throw("ERR: Navbar Link insertion failed with tagName: " + tagName + ", link: " + link + ", position: " + position + ". " + response.data);
        }
      } catch (error) {
        reportError(error);
      }
    }
  }

  const editNavbarButton = (navbarEvent) => {
    setId(navbarEvent.id);
    setTagName(navbarEvent.name);
    setLink(navbarEvent.link);
    setPosition(navbarEvent.position);
  }

  const deleteNavbarButton = async (id) => {
    const formData = new FormData();
    formData.append('id', id);
    try {
      const response = await axios.post('/api/admin/deleteNavbarLink.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data === 1) {
        location.reload();
      } else {
        throw("ERR: Navbar Link deletion failed with tagName: " + tagName + ", link: " + link + ", position: " + position + ". " + response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const reset = () => {
    setId(0);
    setTagName("Tag Name");
    setLink("Link");
    setPosition(1);
  }

  if (admin) {
    return (
      <div className='editNavbar'>
        <br />
        <div className="container">
          <h1>Edit Navbar Details</h1>
          <table className="coupon-table">
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
              {navbar.map((navbar) => (
                <tr key={navbar.id}>
                  <td>{navbar.name}</td>
                  <td>{navbar.link}</td>
                  <td>{navbar.position}</td>
                  <td>
                    <button onClick={() => editNavbarButton(navbar)} className="default-button">Edit</button>
                  </td>
                  <td>
                    <button onClick={() => setDeleteLink(navbar)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <button className="default-button" onClick={reset}>New Navbar Link</button>
          <form onSubmit={handleSubmit}>
            <br />
             <label>Tag Display Name<span className="red">*</span></label>
              <input
                type="text"
                id="tagName"
                name="tagName"
                className="formInput"
                value={tagName}
                onChange={(event) => setTagName(event.target.value)}
              />
              <label>Link<span className="red">*</span></label>
              <input
                type="text"
                id="link"
                name="link"
                className="formInput"
                value={link}
                onChange={(event) => setLink(event.target.value)}
              />
              <label>Position<span className="red">*</span></label>
              <input
                type="number"
                min='1'
                id="position"
                name="position"
                className="formInput"
                value={position}
                onChange={(event) => setPosition(event.target.value)}
              />
            <button className="default-button" type="submit">Save</button>
          </form>
          {showConfirmation &&
            <div className="confirmation-modal">
              <div className="confirmation-dialog">
                <h3>Sorry, you've missed a required field.</h3>
                <p>Please review the form and try agin.</p>
                <div className="confirmation-buttons">
                  <button onClick={() => setShowConfirmation(false)}>Review</button>
                </div>
              </div>
            </div>
          }
          {deleteLink &&
                <div className="confirmation-modal">
                  <div className="confirmation-dialog">
                    <h3>Confirm Delete</h3>
                    <p>Are you sure you want to delete "{deleteLink.name}" permanetly?</p>
                    <div className="confirmation-buttons">
                      <button onClick={() => setDeleteLink(false)}>Cancel</button>
                      <button onClick={() => deleteNavbarButton(deleteLink.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              }
        </div>
      </div>
    );
  }
  else {
    navigate("/404");
  }
}
export default EditNavbar;