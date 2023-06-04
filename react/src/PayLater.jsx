import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function HowItWorks() {

  return (
    <div className="HowItWorks">
      <br />
      <h1>Pay Later Option</h1>
      <br />
      <div className="row">
        <div className="howItWorksMiddle" />
        <div className="howItWorksSide">
          <h2>For Custom Designs: </h2>
          <ol> 
            <li>Complete the ordering process, including as much detail as possible in the custom design text box.</li>
            <li>An Order Confirmation will be sent to you and our team.</li>
            <li>The designer will send you mockup images for you to choose and adjust to your liking.</li>
            <li>Once you approve the design, you can choose your payment method.</li>
          </ol>
        </div>
        <div className="howItWorksMiddle" />
        <div className="howItWorksSide">
          <h2>For Shipping Products: </h2>
          <ol> 
            <li>Complete the ordering process, including your shipping address.</li>
            <li>An Order Confirmation will be sent to you and our team.</li>
            <li>Our team will reach out regarding the shipping cost.</li>
            <li>Once you approve the cost, you can choose your payment method.</li>
            <li>You cannot change your delivery method once you approve the shipping cost.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
export default HowItWorks;
