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
          {/*
          <br />
          <h2>Remember: Design must be 500px by 500px</h2>
          <br/>
          <form onSubmit={handleSubmit}>
            <label>Product Display Name</label>
              <input
                type="text"
                id="product_name"
                name="product_name"
                placeholder="Product Name"
                onChange={(event) => setName(event.target.value)}
              />
            <label>Price (Do Not Include $) (Pricing Default is for an Adult Medium)</label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Price"
              onChange={(event) => setPrice(event.target.value)}
            />
            <label>Tags (Separate By A Space)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Tags"
              onChange={(event) => setTags(event.target.value)}
            />
            <br/>
            <center>
              <h3>Color Options</h3>
            </center>
            <br/>
            <div className="row">
              <div className="uploadSplit">
                <label>T-Shirt: {tColorsPrimary}</label>
                <br />
                <input type="checkbox" id="tBlack" name="tBlack" value="Black" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Black</label>
                  <br />
                <input type="checkbox" id="tYellow" name="tYellow" value="Yellow" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Yellow</label>
                  <br />
                <input type="checkbox" id="tPink" name="tPink" value="Pink" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Pink</label>
                  <br />
                <input type="checkbox" id="tGray" name="tGray" value="Gray" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Gray</label>
                  <br />
                <input type="checkbox" id="tMaroon" name="tMaroon" value="Maroon" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Maroon</label>
                  <br />
                <input type="checkbox" id="tOrange" name="tOrange" value="Orange" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Orange</label>
                  <br />
                <input type="checkbox" id="tPurple" name="tPurple" value="Purple" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Purple</label>
                  <br />
                <input type="checkbox" id="tRed" name="tRed" value="Red" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Red</label>
                  <br />
                <input type="checkbox" id="tRoyal" name="tRoyal" value="Royal" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Royal</label>
                  <br />
                <input type="checkbox" id="tGreen" name="tGreen" value="Green" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Green</label>
                  <br />
                <input type="checkbox" id="tWhite" name="tWhite" value="White" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;White</label>
                  <br />
                <input type="checkbox" id="tNavy" name="tNavy" value="Navy" onChange={(event) => handleTshirtColor(event.target.value)}/>
                  <label>&nbsp;Navy</label>
                  <br />
              </div>
              <div className="uploadSplit">
                <label>Long Sleeve: {lColorsPrimary}</label>
                <br />
                <input type="checkbox" id="lBlack" name="lBlack" value="Black" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                  <label>&nbsp;Black</label>
                  <br />
                <input type="checkbox" id="lNavy" name="lNavy" value="Navy" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                  <label>&nbsp;Navy</label>
                  <br />
                <input type="checkbox" id="lRed" name="lRed" value="Red" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                  <label>&nbsp;Red</label>
                  <br />
                <input type="checkbox" id="lRoyal" name="lRoyal" value="Royal" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                  <label>&nbsp;Royal</label>
                  <br />
                <input type="checkbox" id="lGray" name="lGray" value="Gray" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                  <label>&nbsp;Gray</label>
                  <br />
                <input type="checkbox" id="lWhite" name="lWhite" value="White" onChange={(event) => handleLongSleeveColor(event.target.value)}/>
                  <label>&nbsp;White</label>
                  <br />
              </div>
              <div className="uploadSplit">
                <label>Crewneck: {cColorsPrimary}</label>
                <br />
                <input type="checkbox" id="cBlack" name="cBlack" value="Black" onChange={(event) => handleCrewneckColor(event.target.value)}/>
                  <label>&nbsp;Black</label>
                  <br />
                <input type="checkbox" id="cGray" name="cGray" value="Gray" onChange={(event) => handleCrewneckColor(event.target.value)}/>
                  <label>&nbsp;Gray</label>
                  <br />
                <input type="checkbox" id="cWhite" name="cWhite" value="White" onChange={(event) => handleCrewneckColor(event.target.value)}/>
                  <label>&nbsp;White</label>
                  <br />
              </div>
              <div className="uploadSplit">
                <label>Hoodie: {hColorsPrimary}</label>
                <br />
                <input type="checkbox" id="hBlack" name="hBlack" value="Black" onChange={(event) => handleHoodieColor(event.target.value)}/>
                  <label>&nbsp;Black</label>
                  <br />
                <input type="checkbox" id="hGray" name="hGray" value="Gray" onChange={(event) => handleHoodieColor(event.target.value)}/>
                  <label>&nbsp;Gray</label>
                  <br />
                <input type="checkbox" id="hRed" name="hRed" value="Red" onChange={(event) => handleHoodieColor(event.target.value)}/>
                  <label>&nbsp;Red</label>
                  <br />
                <input type="checkbox" id="hNavy" name="hNavy" value="Navy" onChange={(event) => handleHoodieColor(event.target.value)}/>
                  <label>&nbsp;Navy</label>
                  <br />
                <input type="checkbox" id="hWhite" name="hWhite" value="White" onChange={(event) => handleHoodieColor(event.target.value)}/>
                  <label>&nbsp;White</label>
                  <br />
              </div>
            </div>
            <br/><br/>
            <input type="file" onChange={handleFileInputChange} />
            <br/>
            <br/>
            <button type="submit">Upload</button>
            </form> */}
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
