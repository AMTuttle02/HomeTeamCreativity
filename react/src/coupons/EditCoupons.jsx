import React, { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import moment from "moment-timezone";
import Coupons from "./Coupons.jsx";

function CreateCoupon() {
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
  const {code} = useParams();

  function formatDate(isoString) {
    const date = new Date(isoString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // Api Calls
  useEffect(() => {
    fetch("/api/category/getSubCats.php")
      .then((response) => response.json())
      .then((data) => {
        setAllSubcategories(data);
      }
    );

    fetch("/api/coupon/getCoupon.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({code: code}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setDescription(data.description);
          setAmount(data.amount);
          setType(data.type);
          setMinRequired(data.minimum_required);
          setMaxAllowed(data.maximum_allowed);
          setStartTime(formatDate(data.start_time));
          setEndTime(formatDate(data.end_time));
          setCategory(data.categories);
        }
      })
      .catch((error) => {
        console.log("Sorry, That Path is Invalid. Think this is a mistake? Email us!")
        console.log(error);
        navigate('/404');
      });
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
    if (description === '' ||
        amount < 0.01 ||
        type === '' ||
        startTime === '' ||
        category === ''||
        minRequired < 1) {
      setShowConfirmation('required');
      return;
    }

    const startUTC = moment.tz(startTime, moment.tz.guess()).utc().format();
    const endUTC = moment.tz(endTime, moment.tz.guess()).utc().format();
  
    fetch("/api/coupon/updateCoupon.php", {
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
    <div className='EditCoupon'>
      <br />
      <div className="fullContainer">
        <Coupons />
        <br/>
        <form className="default-width" onSubmit={handleSubmit}>
          <div className="row">
            <div className="mobileSplit40">
              <label className="bold">Coupon Code (Read Only)</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={code}
                  readOnly
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
              <label className="bold">Subcategories Of Products To Include</label>
            </div>
            <div className="mobileSplit20"/>
            <div className="mobileSplit40"/>
          </div>
          <br />
          <div className="row">
            <div className="default-checkbox">
              <input type="checkbox" value={"All"} name="subcats" checked={category.includes('All')} onChange={() => handleCategory('All')}/>
              <label>&nbsp;All Products</label>
            </div>
          </div>
          <div className="row">
            {allSubcategories.map((subcategory) => (
              <div className="default-checkbox" key={subcategory}>
                <input type="checkbox" value={subcategory.name} name="subcats" checked={category.includes(subcategory.name)} onChange={(event) => handleCategory(event.target.value)}/>
                <label className="couponCategoryLabel">&nbsp;{subcategory.name + " (" + subcategory.category + ") "}</label>
              </div>
            ))}
          </div>
          <br />
          <div className="row">
            <div className="mobileSplit40">
              <button type="button" className="default-button" onClick={() => navigate('/coupons')}>Cancel</button>
            </div>
            <div className="mobileSplit20"/>
            <div className="mobileSplit40">
              <button className="default-button" type="submit">Update Coupon</button>
            </div>
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