import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function HowItWorks() {

  return (
    <div className="HowItWorks">
      <br />
      <h1>How It Works</h1>
      <br />
      <div className="row">
        <div className="howItWorksMiddle" />
        <div className="howItWorksSide">
          <h2>For Custom Designs: </h2>
          <ol> 
            <li>Send a message explaining what you would like on your design with as much detail as possible.</li>
            <li>Follow product ordering steps.</li>
            <li>The designer will send you mockup images for you to choose and adjust to your liking.</li>
            <li>Once the design is approved by you, you can choose your delivery option.</li>
            <li>Process your payment.</li>
            <li>Receive confirmation email and receipt including tracking number, if applicable.</li>
          </ol>
        </div>
        <div className="howItWorksMiddle" />
        <div className="howItWorksRight">
          <div className="howItWorksSide">
            <h2>Product Ordering Steps: </h2>
            <ol>
              <li>Select shirt style</li>
              <li>Select qty, color, and size</li>
              <li>See price info below</li>
            </ol>
          </div>
          <br />
          <div className="howItWorksSide">
            <h2>Already Have A Design? </h2>
            <ol> 
              <li>Select shirt style</li>
              <li>Select qty, color, and size</li>
              <li>See price info below</li>
            </ol>
          </div>
        </div>
      </div>
      <br /> <br />
      <h1>Price Info</h1>
      <br />
      <div className="row">
        <div className="howItWorksMiddle" />
        <div className="howItWorksSide">
          <h2>Starting Prices: </h2>
          <ul> 
            <li>Onesies: $8 (NB, 0-3 mo, 3-6 mo, 6-12 mo, 12-18 mo)</li>
            <li>Infant T-Shirt: $10 (6-12 mo, 12-18 mo, 18-24 mo)</li>
            <li>Toddler T-Shirt: $12 (2T-4T)</li>
            <li>Youth T-Shirt: $12 (S-XL)</li>
            <li>Youth Long Sleeve: $18 (S-XL)</li>
            <li>Youth Crewneck Sweatshirt: $22 (S-XL)</li>
            <li>Youth Hoodie: $26 (S-XL)</li>
            <li>Adult Tank Top: $15 (women's cut, S-XL)</li>
            <li>Adult T-Shirt: $16 (S-XL) $18 (XXL-XXXL)</li>
            <li>Adult Long Sleeve $20 (S-XL) $22 (XXL-XXXL)</li>
            <li>Adult Crewneck Sweatshirt: $24 (S-XL) $26 (XXL-XXXL)</li>
            <li>Adult Hoodie: $28 (S-XL) $30 (XXL-XXXL)</li>
          </ul>
        </div>
        <div className="howItWorksMiddle" />
          <div className="howItWorksSide">
            <h2>Additional Info: </h2>
            <ul>
              <li>Starting price is for 2 colors, front/back design</li>
              <li>Additional Colors add $1-2 per color based on amount of color</li>
              <li>Addition of Glitter adds $1-2 per amount used</li>
              <li>Colors vary upon inventory and availability per style</li>
              <li>You can order apparel yourself and ship it/deliver it to Maggie for decorating, please message us for information</li>
              <li>See our <Link to='/returnpolicy'>Return Policy</Link>.</li>
            </ul>
          </div>
      </div>
    </div>
  );
}
export default HowItWorks;
