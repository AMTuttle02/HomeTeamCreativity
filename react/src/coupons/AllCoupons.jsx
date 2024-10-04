import React, { useEffect, useState } from "react";
import Coupons from "./Coupons";
import { useNavigate } from "react-router-dom";

function AllCoupons() {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/coupon/getCoupons.php")
      .then((response) => response.json())
      .then((data) => {
        setCoupons(data);
        console.log(data);
      })
  }, []);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    if (isNaN(date.getTime())) {
      // Check if date is invalid
      return "No End Date";
    } else {
      return date.toLocaleString();
    }
  };

  return (
    <div className='Dashboard'>
      <br />
      <div className="dashboardContainer">
        <Coupons />
        <br />
        <table className="coupon-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Minimum Required</th>
              <th>Maximum Allowed</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Categories</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.code}>
                <td>{coupon.code}</td>
                <td>{coupon.description}</td>
                <td>{coupon.amount}</td>
                <td>{coupon.type}</td>
                <td>{coupon.minimum_required}</td>
                <td>{coupon.maximum_allowed}</td>
                <td>{formatTime(coupon.start_time)}</td>
                <td>{formatTime(coupon.end_time)}</td>
                <td>{coupon.categories}</td>
                <td>
                  <button className="edit-button" onClick={() => navigate('/coupons/edit/' + coupon.code)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AllCoupons;