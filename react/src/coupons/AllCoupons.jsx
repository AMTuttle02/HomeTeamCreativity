import React, { useEffect, useState } from "react";
import Coupons from "./Coupons";
import { useNavigate } from "react-router-dom";
import "./coupon.css";

function AllCoupons() {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/coupon/getCoupons.php")
      .then((response) => response.json())
      .then((data) => {
        setCoupons(data);
      });
  }, []);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    if (isNaN(date.getTime())) {
      return "No End Date";
    } else {
      return date.toLocaleString();
    }
  };

  return (
    <div className='Coupons'>
      <br />
      <div className="fullContainer">
        <Coupons />
        <br />
        <div style={{ overflowX: 'auto',  WebkitOverflowScrolling: 'touch' }}> {/* Scrollable container */}
          <table className="coupon-table">
            <thead>
              <tr>
                <th>Code</th>
                <th className="hide-on-mobile">Description</th>
                <th className="hide-on-mobile">Amount</th>
                <th className="hide-on-mobile">Type</th>
                <th className="hide-on-mobile">Minimum Required</th>
                <th className="hide-on-mobile">Maximum Allowed</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th className="hide-on-mobile">Categories</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.code}>
                  <td>{coupon.code}</td>
                  <td className="hide-on-mobile">{coupon.description}</td>
                  <td className="hide-on-mobile">{coupon.amount}</td>
                  <td className="hide-on-mobile">{coupon.type}</td>
                  <td className="hide-on-mobile">{coupon.minimum_required}</td>
                  <td className="hide-on-mobile">{coupon.maximum_allowed}</td>
                  <td>{formatTime(coupon.start_time)}</td>
                  <td>{formatTime(coupon.end_time)}</td>
                  <td className="hide-on-mobile">{coupon.categories}</td>
                  <td>
                    <button className="default-button" onClick={() => navigate('/coupons/edit/' + coupon.code)}>
                      &nbsp;Edit&nbsp;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllCoupons;