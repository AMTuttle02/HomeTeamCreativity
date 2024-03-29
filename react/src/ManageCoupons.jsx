import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageCoupons() {
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
        <br />
        <div className="dashboardContainer">
          <div className="row">
            <div className="dashHeader">
              <button type="signUpButton" onClick={() => nav('/createcoupon')}>Create Coupon</button>
            </div>
            <div className="dashHeader">
              <h1>Manage Coupons</h1>
            </div>
            <div className="dashHeader">
              <button type="signUpButton" onClick={() => nav('/disablecoupon')}>Disable Coupon</button>
            </div>
          </div>
          <br />
          <div className="BlackLine" />
        </div>
      </div>
    );
  }
}
export default ManageCoupons;