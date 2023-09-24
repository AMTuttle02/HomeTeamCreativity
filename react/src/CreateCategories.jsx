import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateCategories() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState("");
  const [option, setOption] = useState("Create");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [allSubcategories, setAllSubcategories] = useState([]);

  useEffect(() => {
    fetch("/api/admin.php")
        .then((response) => response.json())
        .then((data) => {
        setAdmin(data.admin);
        }
    );
    fetch("/api/getCats.php")
        .then((response) => response.json())
        .then((data) => {
            setAllSubcategories(data);
            console.log(data);
        }
    );
  }, []);

  const handleSubmit = () => {
    if (option === "Create") {
        const data = { subcategory: subcategory, category: category };
        fetch("/api/createSubcat.php", {
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
        fetch("/api/removeSubcat.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
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
                <div className="createCatButtonWidth">
                    <button className="catButton" onClick={() => setOption("Create")}>Create Category</button>
                </div>
                <div className="createCatButtonWidth">
                    <button className="catButton" onClick={() => setOption("Remove")}>Remove Category</button>
                </div>
            </div>
            <br/>
            <center><h3>Category</h3></center>
            {option === "Create" &&
                <div className="row">
                    <div className="createCatCheckbox">
                        <input type="radio" value="Faith" name="cats" onChange={(event) => setCategory(event.target.value)}/>
                        <label>&nbsp;Faith*</label>
                    </div>
                    <div className="createCatCheckbox">
                        <input type="radio" value="Family" name="cats" onChange={(event) => setCategory(event.target.value)}/>
                        <label>&nbsp;Family*</label>
                    </div>
                    <div className="createCatCheckbox">
                        <input type="radio" value="Health" name="cats" onChange={(event) => setCategory(event.target.value)}/>
                        <label>&nbsp;Health</label>
                    </div>
                    <div className="createCatCheckbox">
                        <input type="radio" value="Holiday" name="cats" onChange={(event) => setCategory(event.target.value)}/>
                        <label>&nbsp;Holiday</label>
                    </div>
                    <div className="createCatCheckbox">
                        <input type="radio" value="Ohio" name="cats" onChange={(event) => setCategory(event.target.value)}/>
                        <label>&nbsp;Ohio*</label>
                    </div>
                    <div className="createCatCheckbox">
                        <input type="radio" value="Other" name="cats" onChange={(event) => setCategory(event.target.value)}/>
                        <label>&nbsp;Other</label>
                    </div>
                    <div className="createCatCheckbox">
                        <input type="radio" value="Patriotic" name="cats" onChange={(event) => setCategory(event.target.value)}/>
                        <label>&nbsp;Patriotic*</label>
                    </div>
                    <div className="createCatCheckbox">
                        <input type="radio" value="School" name="cats" onChange={(event) => setCategory(event.target.value)}/>
                        <label>&nbsp;School</label>
                    </div>
                    <div className="createCatCheckbox">
                        <input type="radio" value="Seasons" name="cats" onChange={(event) => setCategory(event.target.value)}/>
                        <label>&nbsp;Seasons</label>
                    </div>
                    <div className="createCatCheckbox">
                        <input type="radio" value="Sports" name="cats" onChange={(event) => setCategory(event.target.value)}/>
                        <label>&nbsp;Sports</label>
                    </div>
                </div>
            }
            <br />
            {option === "Create" ?
            <span>
                <center><h3>Subcategory (Case-Sensitive)</h3></center>
                <input
                    type="text"
                    id="cats"
                    name="cats"
                    placeholder="Subcategory"
                    onChange={(event) => setSubcategory(event.target.value)}
                />
            </span>
            :
            <div className="row">
                {allSubcategories.map((subcategory) => (
                    <div className="createSubCatCheckbox">
                        <input type="radio" value={subcategory.name} name="subcats" onChange={(event) => setSubcategory(event.target.value)}/>
                        <label>&nbsp;{subcategory.name + " (" + subcategory.category + ") "}</label>
                    </div>
                ))}
            </div>
            }
            <button onClick={() => handleSubmit()}>{option} Category</button>
        </div> 
      </div>
    );
  }
  else {
    return ( 
        <div className='Upload'>
          <br />
          <div className="container">
          <h1>Sorry, you must be logged in to access this page.</h1>
          <br />
          <h2>Click <Link to="/login">Here</Link> to Login</h2>
          <br/>
          </div>
        </div>
    );
  }
}
export default CreateCategories;
