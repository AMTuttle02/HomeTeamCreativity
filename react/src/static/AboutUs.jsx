import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import maggie from "../assets/maggie.jpeg";
import info from "../assets/aboutUsInfo.jpeg";
import editIcon from "../assets/editIcon.svg";
import "./aboutUs.css";

function AboutUs() {
  const [header, setHeader] = useState("About Us");
  const [main, setMain] = useState(
    `I started this company in 2020 during a time when many of us found ourselves with extra free time. What began as a creative outlet quickly grew into a passion for creating custom designs and producing high-quality apparel. I am a college graduate with a degree in Graphic Design and experience in entrepreneurship and marketing. In my rare free time, I enjoy spending time with family and friends and listening to country music. <br /><a href=\"https://maggietuttle.myportfolio.com\" target=\"_blank\" class=\"portfolioLink\">Link To My Portfolio</a>`
  );
  const [bottomHeader, setBottomHeader] = useState("Our Mission");
  const [bottom, setBottom] = useState(
    "At HomeTeam Creativity, our mission is to provide affordable, creative, and quality custom apparel that makes young and middle-aged adults happy and comfortable with their outfits."
  );
  const [admin, setAdmin] = useState(0);

  useEffect(() => {
    // fetch admin status for showing edit button
    fetch("/api/admin/admin.php")
      .then((response) => response.json())
      .then((data) => setAdmin(data.admin))
      .catch((err) => console.error("Failed to fetch admin status", err));

    const fetchText = async (location, setter) => {
      try {
        const formData = new FormData();
        formData.append("page", "aboutUs");
        formData.append("location", location);
        const response = await axios.post("/api/admin/getStaticText.php", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response?.data) setter(response.data);
      } catch (error) {
        if (typeof reportError === "function") reportError(error, "AboutUs.jsx");
        // fallback to defaults already set in state
        console.error("Failed to fetch static text for", location, error);
      }
    };

    fetchText("header", setHeader);
    fetchText("main", setMain);
    fetchText("bottomHeader", setBottomHeader);
    fetchText("bottom", setBottom);
  }, []);

  return (
    <div className="AboutUs">
      <br />
      <h1>{header}</h1>
      <div className="topAlignRow">
        <div className="mobileSplit70">
          <div className="fullContainer">
            <div className="AboutParagraph">
              <h3 dangerouslySetInnerHTML={{ __html: main }} />
            </div>
          </div>
        </div>
        <div className="mobileSplit30">
          <img src={maggie} alt="Maggie Tuttle: CEO" className="aboutImg" />
        </div>
      </div>
      <h1>{bottomHeader}</h1>
      <div className="row">
        <div className="mobileSplit70">
          <div className="fullContainer">
            <div className="AboutParagraph">
              <h3 dangerouslySetInnerHTML={{ __html: bottom }} />
            </div>
          </div>
        </div>
        <div className="mobileSplit30">
          <img src={info} alt="About Us Contact Info" className="aboutImg" />
        </div>
      </div>
      {admin > 0 && (
        <div className="default-width">
          <div className="right">
            <Link to="/editAbout" className="editLink">
              <img src={editIcon} alt="Edit Icon" className="editIcon" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutUs;
