import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./categories.css";

function CreateCategories() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState("");
  const [option, setOption] = useState("Create");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

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
            setAllSubcategories(data);
        }
    );

    fetch("/api/category/getCategories.php")
        .then((response) => response.json())
        .then((data) => {
            setAllCategories(data);
        }
    );
  }, []);

  const handleSubmit = () => {
    if (option === "Create") {
        const data = { subcategory: subcategory, category: category };
        fetch("/api/category/createSubcat.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then(() => {
            navigate("/dashboard");
        })
    }
    else {
        const data = { subcategory: subcategory};
        fetch("/api/category/removeSubcat.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then(() => {
            navigate("/dashboard");
        })
    }
  }

  if (admin) {
    return (
      <div className='Categories'>
        <br />
        <div className="container">
            <div className="row">
                <div className="split45">
                    <button className="default-button" onClick={() => setOption("Create")}>Create Category</button>
                </div>
                <div className="split10" />
                <div className="split45">
                    <button className="default-button" onClick={() => setOption("Remove")}>Remove Category</button>
                </div>
            </div>
            
            {option === "Create" ?
                <span>
                    <h3 className="center">Category</h3>
                    <div className="row">
                        {allCategories.map((category) => (
                        <div className="createCatCheckbox">
                            <input type="radio" value={category.category} name="cats" onChange={(event) => setCategory(event.target.value)}/>
                            <label>&nbsp;{category.category}</label>
                        </div>
                        ))}
                    </div>
                    <h3 className="center">Subcategory (Case-Sensitive)</h3>
                    <div className="split50">
                        <input
                            type="text"
                            id="cats"
                            name="cats"
                            placeholder="Subcategory"
                            className="default-input"
                            onChange={(event) => setSubcategory(event.target.value)}
                        />
                    </div>
                </span>
            :
                <span>
                    <h3 className="center">Subcategory</h3>
                    <div className="row">
                        {allSubcategories.map((subcategory) => (
                            <div className="createSubCatCheckbox" key={subcategory.name}>
                                <input type="radio" value={subcategory.name} name="subcats" onChange={(event) => setSubcategory(event.target.value)}/>
                                <label>&nbsp;{subcategory.name + " (" + subcategory.category + ") "}</label>
                            </div>
                        ))}
                    </div>
                    <br />
                </span>
            }
            <div className="split50">
                <button className="default-button" onClick={() => handleSubmit()}>{option} Category</button>
            </div>
        </div> 
      </div>
    );
  }
  else {
    navigate("/404")
  }
}
export default CreateCategories;
