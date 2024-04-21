import React, { useEffect, useState } from "react";
import Coupons from "./Coupons";

function AllCoupons() {
  return (
    <div className='Dashboard'>
      <br />
      <div className="dashboardContainer">
        <Coupons />
        <p>All Coupon Code</p>
      </div>
    </div>
  );
}
export default AllCoupons;