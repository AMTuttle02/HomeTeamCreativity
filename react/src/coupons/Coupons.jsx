import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Coupons() {
  const navigate = useNavigate();

  const nav = (e) => {
    navigate(e);
  }

  const [admin, setAdmin] = useState(0);

  useEffect(() => {
    fetch("/api/admin/admin.php")
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
        <div className="noWrapRow">
          <div className="split20">
            <button type="button" className="default-button" onClick={() => navigate('/coupons/create')}>Create Coupon</button>
          </div>
          <div className="split10" />
          <div className="split40">
            <h1 className="center">Coupons</h1>
          </div>
          <div className="split10" />
          <div className="split20">
            <button type="button" className="default-button" onClick={() => navigate('/coupons')}>Manage Coupons</button>
          </div>
        </div>
        <br />
        <div className="blackLine" />
      </div>
    );
  }
}
export default Coupons;