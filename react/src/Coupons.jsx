import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllCoupons from "./AllCoupons";

function Coupons() {
  const navigate = useNavigate();

  const nav = (e) => {
    navigate(e);
  }

  const [admin, setAdmin] = useState(0);

  useEffect(() => {
    fetch("/api/admin.php")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setAdmin(data.admin);
        }
        else {
          nav('/404');
        }
      });
  }, []);

  if (admin) {
    return (
      <div className='Dashboard'>
        <div className="row">
          <div className="dashHeader">
            <button type="signUpButton" onClick={() => navigate('create')}>Create Coupon</button>
          </div>
          <div className="dashHeader">
            <h1>Coupons</h1>
          </div>
          <div className="dashHeader">
            <button type="signUpButton" onClick={() => navigate('/coupons')}>Manage Coupons</button>
          </div>
        </div>
        <br />
        <div className="BlackLine" />
      </div>
    );
  }
}
export default Coupons;