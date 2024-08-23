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
    fetch("/api/getCats.php")
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
  
    fetch("/api/createCoupon.php", {
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
          <label>Coupon Code</label>
            <input
              type="text"
              id="code"
              name="code"
              placeholder="Coupon Code"
              onChange={(event) => setCode(event.target.value)}
            />
          <label>Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            onChange={(event) => setDescription(event.target.value)}
          />
          <label>Type</label>
          <br />
          <input type="radio" id="type" name="type" value="percent" onChange={(event) => setType(event.target.value)}/>
            <label>&nbsp;% Off</label>
          <br />
          <input type="radio" id="type" name="type" value="percent" onChange={(event) => setType(event.target.value)}/>
            <label>&nbsp;$ Amount Off</label>
          <br /><br />
          <label>Amount ($ or %)</label>
          <br />
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Amount"
            onChange={(event) => setAmount(event.target.value)}
          />
          <br />
          <label>Minimum Amount Required ($)</label>
          <br />
          <input
            type="number"
            id="min_amt"
            name="min_amt"
            placeholder="Minimum Amount"
            onChange={(event) => setMinRequired(event.target.value)}
          />
          <br />
          <label>Maximum Discount Total ($)</label>
          <br />
          <input
            type="number"
            id="max_amt"
            name="max_amt"
            placeholder="Maximum Amount"
            onChange={(event) => setMaxAllowed(event.target.value)}
          />
          <br />
          <label>Start Date & Time</label>
          <br />
          <input
            type="datetime-local"
            id="start_time"
            name="start_time"
            placeholder="Start Time"
            onChange={(event) => setStartTime(event.target.value)}
          />
          <br />
          <label>End Date & Time</label>
          <br />
          <input
            type="datetime-local"
            id="end_time"
            name="end_time"
            placeholder="End Time"
            onChange={(event) => setEndTime(event.target.value)}
          />
          <label>Categories Of Products To Include</label>
            <div className="row">
              <div className="createSubCatCheckbox">
                <input type="checkbox" value={"All"} name="subcats" onChange={() => handleCategory('All')}/>
                <label>&nbsp;{"All Products"}</label>
              </div>
            </div>
            <div className="row">
              {cats.map((category) => (
                <div className="createSubCatCheckbox" key={category}>
                  <input type="checkbox" value={category} name="cats" onChange={(event) => handleCategory(event.target.value)}/>
                  <label>&nbsp;{category}</label>
                </div>
              ))}
            </div>
          <label>Subcategories Of Products To Include</label>
            <div className="row">
              {allSubcategories.map((subcategory) => (
                <div className="createSubCatCheckbox" key={subcategory}>
                  <input type="checkbox" value={subcategory.name} name="subcats" onChange={(event) => handleCategory(event.target.value)}/>
                  <label>&nbsp;{subcategory.name + " (" + subcategory.category + ") "}</label>
                </div>
              ))}
            </div>
          <br />
          <br/><br/>
          <button type="submit">Create Coupon</button>
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