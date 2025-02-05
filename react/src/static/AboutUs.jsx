import React from "react";
import maggie from "../assets/maggie.jpg";
import info from "../assets/aboutUsInfo.png"
import "./aboutUs.css";

function AboutUs() {

  return (
    <div className="AboutUs">
      <br />
      <h1>About Us</h1>
      <div className="row">
        <div className="aboutUsMobileSplit70">
          <div className="AboutParagraph">
            <h3>
              I started this company in 2020 with all the free time I had, as I am sure we all did.
              I grew a passion for creating custom designs and high-quality apparel for everyone.
              In addition to creating custom apparel, I am a full-time college student majoring in
              Graphic Design and minoring in Entrepreneurship and Marketing. In my rare free time, I enjoy spending
              time with my family and friends, listening to music, and crafting.
            </h3>
          </div>
        </div>
        <div className="aboutUsMobileSplit30">
          <img src={maggie} alt="Maggie Tuttle: CEO" className="aboutImg"/>
        </div>
      </div>
      <div className="row">
        <div className="aboutUsMobileSplit70">
          <div className="AboutParagraph">
            <h1>Our Mission</h1>
            <h3>
              At HomeTeam Creativity, our mission is to provide affordable, creative, and quality custom apparel
               that makes young and middle-aged adults happy and comfortable with their outfits.
            </h3>
          </div>
        </div>
        <div className="aboutUsMobileSplit30">
          <img src={info} alt="About Us Contact Info" className="aboutImg"/>
        </div>
      </div>
      <a href="https://maggietuttle.myportfolio.com" target="_blank" className="portfolioLink">Link To My Portfolio</a>
    </div>
  );
}
export default AboutUs;
