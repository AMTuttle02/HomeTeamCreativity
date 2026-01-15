import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import editIcon from "../assets/editIcon.svg";

function HowItWorks() {
  const [header, setHeader] = useState("How It Works");
  const [s1Header, setS1Header] = useState("For Custom Designs:");
  const [s1, setS1] = useState(`
    <ol>
      <li>Please select the 'Custom Order' product found on our homepage and products page.</li>
      <li>Enter into the text box a very detailed description of your desired design.</li>
      <li>If you have any helpful reference imagery, please upload them on the product ordering page.</li>
      <li>Enter all information on styling and color options, and proceed through the checkout process.</li>
      <li>In the checkout, enter a good email, that will be used for official communication.</li>
      <li>Once your order is placed, our designer will email you digital mockup images of design options. You may ask for revisions and improvements, or approve the design.</li>
      <li>Once the design is approved, delivery or shipping will be discussed and you will be sent an official invoice.</li>
      <li>Complete payment process. Order has now officially been placed.</li>
    </ol>
  `);
  const [s2Header, setS2Header] = useState("All Other Products");
  const [s2, setS2] = useState(`
    <ol>
      <li>There is a collection of over 1,000 pre-designed items for you to browse.</li>
      <li>Choose your items.</li>
      <li>In the details box of the product page, you may ask for customizations or alterations to the item displayed.</li>
      <li>Select all items asked, style, quantity, color, and size. Continue with ordering process.</li>
      <li>Order has officially been placed.</li>
    </ol>
  `);
  const [s3Header, setS3Header] = useState("Local Pickup vs. Shipping");
  const [s3, setS3] = useState(`
    <ul>
      <li>This business is operated out of Morrow County, Ohio. All residents in AND near Morrow County are eligible for local pickup. Please choose local pickup if you do not want to pay shipping costs.</li>
      <li>Local pickup is free of charge.</li>
      <li>If you are not sure if you qualify for free local pickup, please contact us <a href=\"mailto:admin@hometeamcreativity.com\" target=\"_blank\">here</a>.</li>
      <li>Some popular local pickup locations include: Iberia Dollar General, St. Joseph Catholic School Galion, and Northmor School.</li>
      <li>If you are outside of the local pickup eligibility range, please select shipping.</li>
      <li>Please note, shipping costs are not free of charge, and usually range between $5 and $20 in cost, depending on quantity of items.</li>
      <li>Items will be shipped through USPS, flat rate shipping, which takes around 2-5 business days for delivery.</li>
      <li>If you choose shipping, an updated invoice with your shipping cost applied will be sent to your email listed under the order.</li>
      <li>Once the invoice is paid in full, the package will be shipped. And you will be sent a tracking number for reference. Please track your package through USPS tracking.</li>
      <li>If after 14 days, you have yet to receive your items, contact us and we will ensure you receive your items.</li>
    </ul>
  `);
  const [priceHeader, setPriceHeader] = useState("Price Info");
  const [starting, setStarting] = useState(`
    <ul>
      <li>Onesies: $8 (NB, 0-3 mo, 3-6 mo, 6-12 mo, 12-18 mo)</li>
      <li>Infant T-Shirt: $10 (6-12 mo, 12-18 mo, 18-24 mo)</li>
      <li>Toddler T-Shirt: $12 (2T-4T)</li>
      <li>Youth T-Shirt: $14 (S-XL)</li>
      <li>Youth Long Sleeve: $18 (S-XL)</li>
      <li>Youth Crewneck Sweatshirt: $22 (S-XL)</li>
      <li>Youth Hoodie: $26 (S-XL)</li>
      <li>Adult Tank Top: $15 (women's cut, S-XL)</li>
      <li>Adult T-Shirt: $16 (S-XL) $18 (XXL-XXXL)</li>
      <li>Adult Long Sleeve $20 (S-XL) $22 (XXL)</li>
      <li>Adult Crewneck Sweatshirt: $24 (S-XL) $26 (XXL)</li>
      <li>Adult Hoodie: $28 (S-XL) $30 (XXL)</li>
      <li>Can Koozies: $8</li>
      <li>License Plates: $8</li>
      <li>Ladies V-Neck T-Shirt: $24</li>
      <li>Frosted Cup, 16 ounce, with Bamboo Lid and Straw: $18</li>
      <li>Stainless Steel Tumbler, 40 ounce, with lid and straw: $20</li>
      <li>Stainless Steel Tumbler, 20 ounce, with lid and straw: $18</li>
      <li>Glass Mug, 15 ounce: $14</li>
      <li>Wine Tumblers, 12 ounce: $16</li>
      <li>Baseball and Trucker Hats: $14</li>
      <li>Beanie Hats: $14</li>
      <li>Tote Bag: $16</li>
      <li>Waterproof car decal: $4</li>
      <li>Stickers: $2</li>
    </ul>
  `);
  const [additional, setAdditional] = useState(`
    <ul>
      <li>Starting price is for 2 colors, front/back design</li>
      <li>Additional Colors add $1-2 per color based on amount of color</li>
      <li>Addition of Glitter adds $1-2 per amount used</li>
      <li>Colors vary upon inventory and availability per style</li>
      <li>You can order apparel yourself and ship it/deliver it to Maggie for decorating, please message us for information</li>
      <li>See our <a href=\"/returnpolicy\">Return Policy</a>.</li>
    </ul>
  `);
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
        formData.append("page", "howItWorks");
        formData.append("location", location);
        const response = await axios.post("/api/admin/getStaticText.php", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response?.data) setter(response.data);
      } catch (error) {
        console.error("Failed to fetch static text for", location, error);
      }
    };

    fetchText("header", setHeader);
    fetchText("s1Header", setS1Header);
    fetchText("s1", setS1);
    fetchText("s2Header", setS2Header);
    fetchText("s2", setS2);
    fetchText("s3Header", setS3Header);
    fetchText("s3", setS3);
    fetchText("priceHeader", setPriceHeader);
    fetchText("starting", setStarting);
    fetchText("additional", setAdditional);
  }, []);

  return (
    <div className="HowItWorks">
      <br />
      <h1 className="center">{header}</h1>
      <div className="topAlignRow">
        <div className="mobileSplit50">
          <div className="fullContainer">
            <h2>{s1Header}</h2>
            <div dangerouslySetInnerHTML={{ __html: s1 }} />
          </div>
        </div>
        <div className="mobileSplit50">
          <div className="fullContainer">
            <h2>{s2Header}</h2>
            <div dangerouslySetInnerHTML={{ __html: s2 }} />
          </div>
        </div>
      </div>
      <div className="topAlignRow">
        <div>
          <div className="fullContainer">
            <h2>{s3Header}</h2>
            <div dangerouslySetInnerHTML={{ __html: s3 }} />
          </div>
        </div>
      </div>
      <h1 className="center">{priceHeader}</h1>
      <br />
      <div className="topAlignRow">
        <div className="mobileSplit50">
          <div className="fullContainer">
            <h2>Starting Prices: </h2>
            <div dangerouslySetInnerHTML={{ __html: starting }} />
          </div>
        </div>
          <div className="mobileSplit50">
            <div className="fullContainer">
              <h2>Additional Info: </h2>
              <div dangerouslySetInnerHTML={{ __html: additional }} />
            </div>
          </div>
      </div>
      {admin > 0 && (
        <div className="default-width">
          <div className="right">
            <Link to="/editHowItWorks" className="editLink">
              <img src={editIcon} alt="Edit Icon" className="editIcon" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
export default HowItWorks;
