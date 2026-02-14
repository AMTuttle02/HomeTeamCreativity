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
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedSubcatIds, setSelectedSubcatIds] = useState([]);
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    fetch("/api/category/getSubCats.php")
      .then((response) => response.json())
      .then((data) => {
        setAllSubcategories(data);
      }
    );
    fetch("/api/category/getCategories.php")
      .then((response) => response.json())
      .then((data) => setAllCategories(data || []))
      .catch(() => setAllCategories([]));
  }, []);
  
  const handleCategory = (event) => {
    // event may be 'All' or a category id
    if (event === 'All') {
      setSelectedSubcatIds([]);
      setSelectedCategoryIds([]);
      setCategory('All');
      return;
    }

    // toggle category id in selectedCategoryIds
    const id = String(event);
    if (selectedCategoryIds.includes(id)) {
      setSelectedCategoryIds(selectedCategoryIds.filter((c) => c !== id));
    } else {
      // selecting a specific category should clear any 'All' top-level selection
      if (category.includes('All')) setCategory('');
      setSelectedCategoryIds([...selectedCategoryIds, id]);
    }
  };

  const toggleSubcat = (id) => {
    const sid = id + "";
    if (selectedSubcatIds.includes(sid)) {
      setSelectedSubcatIds(selectedSubcatIds.filter((c) => c !== sid));
    } else {
      // selecting a specific subcategory should clear any 'All' top-level selection
      if (category.includes('All')) {
        setCategory(category.replace('All', '').trim());
      }
      setSelectedSubcatIds([...selectedSubcatIds, sid]);
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
        (category === '' && selectedSubcatIds.length === 0) ||
        minRequired < 1) {
      setShowConfirmation('required');
      return;
    }

    const startUTC = moment.tz(startTime, moment.tz.guess()).utc().format();
    const endUTC = moment.tz(endTime, moment.tz.guess()).utc().format();
  
    // send both top-level categories (legacy names) and subcategory id list
    const subcatsToSend = selectedSubcatIds.length > 0 ? selectedSubcatIds.join(';') : '';
    const catsToSend = selectedCategoryIds.length > 0 ? selectedCategoryIds.join(';') : (category || '');

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
        'categories': catsToSend,
        'subcategories': subcatsToSend
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
            {allCategories.map((cat) => (
              <div className="default-checkbox" key={cat.id}>
                <input type="checkbox" value={cat.id} name="cats" checked={selectedCategoryIds.includes(String(cat.id))} onChange={(event) => handleCategory(event.target.value)}/>
                <label>&nbsp;{cat.category}</label>
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
              <div className="default-checkbox" key={subcategory.id}>
                <input type="checkbox" value={subcategory.id} name="subcats" checked={selectedSubcatIds.includes(String(subcategory.id))} onChange={() => toggleSubcat(subcategory.id)}/>
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