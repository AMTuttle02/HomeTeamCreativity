import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllCoupons from "./AllCoupons";
import CreateCoupon from "./CreateCoupon";

function Coupons() {
  const navigate = useNavigate();

  const nav = (e) => {
    navigate(e);
  }

  const [admin, setAdmin] = useState(0);
  const [couponComponent, setCouponComponent] = useState(<AllCoupons />)

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
        <br />
        <div className="dashboardContainer">
          <div className="row">
            <div className="dashHeader">
              <button type="signUpButton" onClick={() => setCouponComponent(<CreateCoupon />)}>Create Coupon</button>
            </div>
            <div className="dashHeader">
              <h1>Coupons</h1>
            </div>
            <div className="dashHeader">
              <button type="signUpButton" onClick={() => setCouponComponent(<AllCoupons />)}>Manage Coupons</button>
            </div>
          </div>
          <br />
          <div className="BlackLine" />
          {couponComponent}
        </div>
      </div>
    );
  }
}
export default Coupons;