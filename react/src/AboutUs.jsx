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
              Graphic Design and minoring in Entrepreneurship and Marketing. In my rare free time, I enjoy spending
              time with my family and friends, listening to music, and crafting.
            </h3>
          </div>
          <br />
          <div className="AboutParagraph">
            <h1><b>Our Mission</b></h1>
            <h3>
              At HomeTeam Creativity, our mission is to provide affordable, creative, and quality custom apparel
               that makes young and middle-aged adults happy and comfortable with their outfits.
            </h3>
          </div>
        </div>
        <div className="main">
          <div className="mainSplit">
            <img src={maggie} alt="Maggie Tuttle: CEO" className="MaggieImg"/>
          </div>
          <div className="mainSplit">
            <img src={info} alt="About Us Contact Info" className="contactUsImg"/>
          </div>
          <br/>
          <div className="mainSplit">
            <a href="https://maggietuttle.myportfolio.com" target="_blank" style={{color: "#336699"}}>Link To My Portfolio</a>
          </div>
          <div className="mainSplit" />
        </div>
      </div>
    </div>
  );
}
export default AboutUs;
