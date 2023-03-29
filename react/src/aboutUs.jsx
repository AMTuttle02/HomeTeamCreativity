import React, { useState,useEffect } from "react";
import "./index.css";
import maggie from "./assets/maggie.jpg";
import info from "./assets/aboutUsInfo.png"

function AboutUs() {

  return (
    <div className="about">
      <br />
      <h1>About Us</h1>
      <div className="row">
        <div className="side">
          <div className="AboutParagraph">
            <h3>
              I started this company in 2020 with all the free time I had, as I am sure we all did.
              I grew a passion for creating custom designs and high-quality apparel for everyone.
              In addition to creating custom apparel, I am a full-time college student majoring in
              Graphic Design and minoring in Entrepreneurship. In my rare free time, I enjoy spending
              time with my family and friends, listening to music, and crafting.
            </h3>
          </div>
          <img src={info} alt="About Us Contact Info" />
        </div>
        <div className="main">
          <br />
          <img src={maggie} alt="Maggie Tuttle: Business Owner" />
          <div className="Maggie">
            <h1> Maggie Tuttle </h1>
            <h3> Business Owner </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AboutUs;
