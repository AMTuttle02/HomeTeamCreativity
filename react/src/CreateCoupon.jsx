import React, { useEffect, useState } from "react";
import {Navigate, useNavigate } from "react-router-dom";

function CreateCoupon() {
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('No Description');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('');
  const [minRequired, setMinRequired] = useState('');
  const [maxAllowed, setMaxAllowed] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('code', code);
    formData.append('description', description);
    formData.append('amount', amount);
    formData.append('type', type);
    formData.append('min_required', minRequired);
    formData.append('max_allowed', maxAllowed);
    formData.append('start_time', startTime);
    formData.append('end_time', endTime);
  
    fetch("/api/createCoupon.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === 1) {
          navigate('/coupons');
        }
      });
  }

  return (
    <div className='CreateCoupon'>
      <br />
      <h1 className="center">Create A Coupon Below</h1>
      <h2 className="center">Code must be unique</h2>
      <h3 className="center">Required Fields are marked with a <span className="red">*</span></h3>
      <br/>
      <form onSubmit={handleSubmit}>
        <label>Coupon Code<span className="red">*</span></label>
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
        <label>Type<span className="red">*</span></label>
        <div className="row">
          <div className="uploadSplit">
            <span>
              <input type="radio" id="type" name="type" value="percent" onChange={(event) => setType(event.target.value)}/>
                <label>&nbsp;% Off</label>
                <br />
            </span>
          </div>
          <div className="uploadSplit">
            <span>
              <input type="radio" id="type" name="type" value="percent" onChange={(event) => setType(event.target.value)}/>
                <label>&nbsp;$ Amount Off</label>
                <br />
            </span>
          </div>
        </div>
        <label>Amount ($ or %)<span className="red">*</span></label>
        <br />
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="Amount"
          onChange={(event) => setAmount(event.target.value)}
        />
        <br />
        <label>Minimum Amount Required ($)<span className="red">*</span></label>
        <br />
        <input
          type="number"
          id="min_amt"
          name="min_amt"
          placeholder="Minimum Amount"
          onChange={(event) => setMinRequired(event.target.value)}
        />
        <br />
        <label>Maximum Discount Total ($)<span className="red">*</span></label>
        <br />
        <input
          type="number"
          id="max_amt"
          name="max_amt"
          placeholder="Maximum Amount"
          onChange={(event) => setMaxAllowed(event.target.value)}
        />
        <br />
        <label>Start Date & Time<span className="red">*</span></label>
        <br />
        <input
          type="datetime-local"
          id="start_time"
          name="start_time"
          placeholder="Start Time"
          onChange={(event) => setStartTime(event.target.value)}
        />
        <br />
        <label>End Date & Time<span className="red">*</span></label>
        <br />
        <input
          type="datetime-local"
          id="end_time"
          name="end_time"
          placeholder="End Time"
          onChange={(event) => setEndTime(event.target.value)}
        />
        <br />
        <br/><br/>
        <button type="submit">Upload</button>
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
    </div>
  );
}
export default CreateCoupon;