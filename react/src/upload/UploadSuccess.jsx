import React, { useState, useEffect } from "react";
import DisplayProduct from "../products/DisplayProduct";

function UploadSuccess() {
  const [admin, setAdmin] = useState("");
  const [product, setProduct] = useState(null);
  const [enlarge, setEnlarge] = useState(false);

  // Api Calls
  useEffect(() => {
    fetch("/api/admin/admin.php")
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data.admin);
      });

    fetch("/api/product/recentUpload.php")
      .then((response) => response.json())
      .then((data) => {
        if (data != "Recent design not set") {
          setProduct(data[0]);
        }
    });
  }, []);

  // enlarge product view
  const confirmEnlarge = () => {
    setEnlarge(true);
  }

  // close enlarged product view
  const handleOutsideClick = (event) => {
    if (!event.target.closest('.fullDesign')) {
      setEnlarge(false);
    }
  };

  if (admin && product !== null) {
    return (
      <div className='Upload'>
        <br />
        <div className="row">
          <div className="mobileSplit20"/>
          <div className="mobileSplit10"/>
          <div className="mobileSplit40">
            <div className="fullContainer">
              <h1 className="center">Upload Complete!</h1>
              <h2 className="center">Design Preview:</h2>
              <button 
                className="magnify"
                onClick={() => confirmEnlarge(product)}>
                <DisplayProduct product={product} />
              </button>
              <h3 className="center">{product.product_name}</h3>
              <h3 className="center">{"$" + product.price}</h3>
            </div>
          </div>
          <div className="mobileSplit20"/>
          <div className="mobileSplit10"/>
        </div>
        {enlarge &&
          <div className="confirmation-modal" onClick={handleOutsideClick}>
            <div className="enlarge">
              <span className="close-button" onClick={() => setEnlarge(false)}>&times;</span>
              <DisplayProduct product={product} />
            </div>
          </div>
        }
      </div>
    );
  }
}
export default UploadSuccess;
