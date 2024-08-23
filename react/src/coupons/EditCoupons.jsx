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

  useEffect(() => {
    fetch("/api/getCats.php")
      .then((response) => response.json())
      .then((data) => {
        setAllSubcategories(data);
      }
    );

    fetch("/api/getCoupon.php", {
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
  
    fetch("/api/updateCoupon.php", {
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
      <div className="dashboardContainer">
        <Coupons />
        <br/>
        <form className="couponForm" onSubmit={handleSubmit}>
          <label>Coupon Code (Read Only)</label>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              readOnly
            />
          <label>Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label>Type</label>
          <br />
          {type === "percent" ?
            <span>
              <input type="radio" id="type" name="type" value="percent" checked={true} onChange={(event) => setType(event.target.value)}/>
              <label>&nbsp;% Off</label>
            </span>
          :
            <span>
              <input type="radio" id="type" name="type" value="percent" checked={false} onChange={(event) => setType(event.target.value)}/>
              <label>&nbsp;% Off</label>
            </span>
          }
          <br />
          {type === "amount" ?
            <span>
              <input type="radio" id="type" name="type" value="amount" checked={true} onChange={(event) => setType(event.target.value)}/>
              <label>&nbsp;$ Amount Off</label>
            </span>
          :
            <span>
              <input type="radio" id="type" name="type" value="amount" checked={false} onChange={(event) => setType(event.target.value)}/>
              <label>&nbsp;$ Amount Off</label>
            </span>
          }
          <br /><br />
          <label>Amount ($ or %)</label>
          <br />
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <br />
          <label>Minimum Amount Required ($)</label>
          <br />
          <input
            type="number"
            id="min_amt"
            name="min_amt"
            value={minRequired}
            onChange={(event) => setMinRequired(event.target.value)}
          />
          <br />
          <label>Maximum Discount Total ($)</label>
          <br />
          <input
            type="number"
            id="max_amt"
            name="max_amt"
            value={maxAllowed}
            onChange={(event) => setMaxAllowed(event.target.value)}
          />
          <br />
          <label>Start Date & Time</label>
          <br />
          <input
            type="datetime-local"
            id="start_time"
            name="start_time"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
          />
          <br />
          <label>End Date & Time</label>
          <br />
          <input
            type="datetime-local"
            id="end_time"
            name="end_time"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
          />
          <label>Subcategories Of Products To Include</label>
            <div className="row">
              {category.includes('All') ? 
                <div className="createSubCatCheckbox">
                  <input type="checkbox" value={"All"} name="subcats" checked={true} onChange={() => handleCategory('All')}/>
                  <label>&nbsp;{"All Products"}</label>
                </div>
              :
                <div className="createSubCatCheckbox">
                  <input type="checkbox" value={"All"} name="subcats" checked={false} onChange={() => handleCategory('All')}/>
                  <label>&nbsp;{"All Products"}</label>
                </div>
              }
            </div>
            <div className="row">
              {allSubcategories.map((subcategory) => (
                <div className="subCatCheckbox" key={subcategory}>
                  {category.includes(subcategory.name) ? 
                  <span>
                    <input type="checkbox" value={subcategory.name} name="subcats" checked={true} onChange={(event) => handleCategory(event.target.value)}/>
                    <label>&nbsp;{subcategory.name + " (" + subcategory.category + ") "}</label>
                  </span>
                  :
                  <span>
                    <input type="checkbox" value={subcategory.name} name="subcats" checked={false} onChange={(event) => handleCategory(event.target.value)}/>
                    <label>&nbsp;{subcategory.name + " (" + subcategory.category + ") "}</label>
                  </span>
                  }
                </div>
              ))}
            </div>
          <br />
          <br/><br/>
          <div className="row">
            <div className="dashHeader">
              <button type="signUpButton" onClick={() => navigate('/coupons')}>Cancel</button>
            </div>
            <div className="dashHeader">
              <button type="submit">Update Coupon</button>
            </div>
          </div>
        </form>
        {showConfirmation === 'required' &&
          <div className="confirmation-modal">
            <div className="confirmation-dialog">
              <h3>Sorry, you've missed a required field.</h3>
              <p>Please review the form and try agin.</p>
              <div className="confirmation-buttons">
                <button onClick={() => setShowConfirmation('false')}>Review</button>
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
                <button onClick={() => setShowConfirmation('false')}>Review</button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
export default CreateCoupon;