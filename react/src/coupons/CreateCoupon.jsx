import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import Coupons from "./Coupons";

function CreateCoupon() {
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('');
  const [minRequired, setMinRequired] = useState(1);
  const [maxAllowed, setMaxAllowed] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState('false');
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const cats = ["Faith", "Family", "Health", "Holiday", "Ohio", "Other", "Patriotic", "School", "Seasons", "Sports"];

  useEffect(() => {
    fetch("/api/category/getSubCats.php")
      .then((response) => response.json())
      .then((data) => {
        setAllSubcategories(data);
      }
    );
  }, []);
  
  const handleCategory = (event) => {
    if (category.includes(event)) {
      const removeCat = category.replace(event, "");
      setCategory(removeCat);
    }
    else {
      setCategory(category + ' ' + event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // verify required fields
    if (code === '' || 
        description === '' ||
        amount === 0 ||
        type === '' ||
        startTime === '' ||
        category === '' ||
        minRequired < 1) {
      setShowConfirmation('required');
      return;
    }

    const startUTC = moment.tz(startTime, moment.tz.guess()).utc().format();
    const endUTC = moment.tz(endTime, moment.tz.guess()).utc().format();
  
    fetch("/api/coupon/createCoupon.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        'code': code, 
        'description': description,
        'amount': amount,
        'type': type,
        'minimum_required': minRequired,
        'maximum_allowed': maxAllowed,
        'start_time': startUTC,
        'end_time': endUTC,
        'categories': category
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === 1) {
          navigate('/coupons');
        }
        else {
          setShowConfirmation('failed');
        }
      });
  }

  return (
    <div className='CreateCoupon'>
      <br />
      <div className="fullContainer">
        <Coupons />
        <br/>
        <form className="default-width" onSubmit={handleSubmit}>
          <div className="row">
            <div className="mobileSplit40">
              <label className="bold">Coupon Code</label>
              <input
                type="text"
                id="code"
                name="code"
                onChange={(event) => setCode(event.target.value)}
                className="default-input"
              />
            </div>
            <div className="mobileSplit20"/>
            <div className="mobileSplit40">
              <label className="bold">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="default-input"
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="mobileSplit40">
              <label className="bold">Type</label>
              <br />
              <div className="default-checkbox">
                <input type="radio" id="type" name="type" value="percent" checked={type === "percent"} onChange={(event) => setType(event.target.value)}/>
                <label className="bold">&nbsp;% Off</label>
              </div>
              <div className="default-checkbox">
                <input type="radio" id="type" name="type" value="amount" checked={type === "amount"} onChange={(event) => setType(event.target.value)}/>
                <label className="bold">&nbsp;$ Amount Off</label>
              </div>
            </div>
            <div className="mobileSplit20"/>
            <div className="mobileSplit40"/>
            
          </div>
          <br />
          <div className="row">
            <div className="mobileSplit40">
              <label className="bold">Amount ($ or %)</label>
              <br />
              <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="default-input"
              />
            </div>
            <div className="mobileSplit20"/>
            <div className="mobileSplit40">
              <label className="bold">Start Date & Time</label>
              <br />
              <input
                type="datetime-local"
                id="start_time"
                name="start_time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="default-input"
              />
            </div>
            
          </div>
          <br />
          <div className="row">
            <div className="mobileSplit40">
              <label className="bold">Minimum Amount Required ($)</label>
              <br />
              <input
                type="number"
                id="min_amt"
                name="min_amt"
                value={minRequired}
                onChange={(event) => setMinRequired(event.target.value)}
                className="default-input"
              />
            </div>
            <div className="mobileSplit20"/>
            <div className="mobileSplit40">
              <label className="bold">End Date & Time</label>
              <br />
              <input
                type="datetime-local"
                id="end_time"
                name="end_time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                className="default-input"
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="mobileSplit40">
              <label className="bold">Maximum Discount Total ($)</label>
              <br />
              <input
                type="number"
                id="max_amt"
                name="max_amt"
                value={maxAllowed}
                onChange={(event) => setMaxAllowed(event.target.value)}
                className="default-input"
              />
            </div>
            <div className="mobileSplit20"/>
            <div className="mobileSplit40"/>
          </div>
          <br />
          <div className="row">
            <div className="mobileSplit40">
              <label className="bold">Categories Of Products To Include</label>
            </div>
            <div className="mobileSplit20"/>
            <div className="mobileSplit40"/>
          </div>
          <div className="row">
            <div className="default-checkbox">
              <input type="checkbox" value={"All"} name="subcats" onChange={() => handleCategory('All')}/>
              <label>&nbsp;{"All Products"}</label>
            </div>
          </div>
          <div className="row">
            {cats.map((category) => (
              <div className="default-checkbox" key={category}>
                <input type="checkbox" value={category} name="cats" onChange={(event) => handleCategory(event.target.value)}/>
                <label>&nbsp;{category}</label>
              </div>
            ))}
          </div>
          <br />
          <div className="row">
            <div className="mobileSplit40">
              <label className="bold">Subcategories Of Products To Include</label>
            </div>
            <div className="mobileSplit20"/>
            <div className="mobileSplit40"/>
          </div>
          <br />
          <div className="row">
            {allSubcategories.map((subcategory) => (
              <div className="default-checkbox" key={subcategory}>
                <input type="checkbox" value={subcategory.name} name="subcats" checked={category.includes(subcategory.name)} onChange={(event) => handleCategory(event.target.value)}/>
                <label >&nbsp;{subcategory.name + " (" + subcategory.category + ") "}</label>
              </div>
            ))}
          </div>
          <br />
          <div className="row">
            <button className="default-button" type="submit">Create Coupon</button>
          </div>
        </form>
        {showConfirmation === 'required' &&
          <div className="confirmation-modal">
            <div className="confirmation-dialog">
              <h3>Sorry, you've missed a required field.</h3>
              <p>Please review the form and try agin.</p>
              <div className="confirmation-buttons">
                <button className="delete-button" onClick={() => setShowConfirmation('false')}>Review</button>
              </div>
            </div>
          </div>
        }
        {showConfirmation === 'failed' &&
          <div className="confirmation-modal">
            <div className="confirmation-dialog">
              <h3>Sorry, something went wrong.</h3>
              <p>Please review the form and try agin.</p>
              <div className="confirmation-buttons">
                <button className="delete-button" onClick={() => setShowConfirmation('false')}>Review</button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
export default CreateCoupon;