import React, { useEffect, useState } from "react";
import blackTshirt from "./assets/blackTShirt.png";
import blackLongSleeve from "./assets/blackLongSleeve.png";
import blackCrewneck from "./assets/blackCrewneck.png";
import blackHoodie from "./assets/blackHoodie.png";
import grayTshirt from "./assets/GreyTShirt.png";
import grayLongSleeve from "./assets/GreyLongSleeve.png";
import grayCrewneck from "./assets/GreyCrewneckSS.png";
import grayHoodie from "./assets/GreyHoodie.png";
import RedTshirt from "./assets/RedTShirt.png";
import RedLongSleeve from "./assets/RedLongSleeve.png";
import RedHoodie from "./assets/RedHoodie.png";
import YellowTshirt from "./assets/YellowTShirt.png";
import PinkTshirt from "./assets/PinkTShirt.png";
import GreenTshirt from "./assets/GreenTShirt.png";
import MaroonTshirt from "./assets/MaroonTShirt.png";
import OrangeTshirt from "./assets/OrangeTShirt.png";
import PurpleTshirt from "./assets/PurpleTShirt.png";
import RoyalTshirt from "./assets/RoyalTShirt.png";
import RoyalLongSleeve from "./assets/RoyalLongSleeve.png";
import NavyTshirt from "./assets/NavyTShirt.png";
import NavyLongSleeve from "./assets/NavyLongSleece.png";
import NavyHoodie from "./assets/NavyHoodie.png";
import WhiteTshirt from "./assets/WhiteTShirt.png";
import WhiteLongSleeve from "./assets/WhiteLongSleeve.png";
import WhiteCrewneck from "./assets/WhiteCrewneckSS.png";
import WhiteHoodie from "./assets/WhiteHoodie.png";
import { Link } from "react-router-dom";

function setType(type, color) {
  if (type == "Crewneck Sweatshirt") {
    if (color == "Black") {
      return blackCrewneck;
    }
    else if (color == "Gray") {
      return grayCrewneck;
    }
    else if (color == "White") {
      return WhiteCrewneck;
    }
  }
  else if (type == "Hooded Sweatshirt") {
    if (color == "Black") {
      return blackHoodie;
    }
    else if (color == "Gray") {
      return grayHoodie;
    }
    else if (color == "White") {
      return WhiteHoodie;
    }
    else if (color == "Red") {
      return RedHoodie;
    }
    else if (color == "Navy") {
      return NavyHoodie;
    }
  }
  else if (type == "Long Sleeve T-Shirt") {
    if (color == "Black") {
      return blackLongSleeve;
    }
    else if (color == "Gray") {
      return grayLongSleeve;
    }
    else if (color == "White") {
      return WhiteLongSleeve;
    }
    else if (color == "Navy") {
      return NavyLongSleeve;
    }
    else if (color == "Red") {
      return RedLongSleeve;
    }
    else if (color == "Royal") {
      return RoyalLongSleeve;
    }
  }
  else {
    if (color == "Black") {
      return blackTshirt;
    }
    else if (color == "Gray") {
      return grayTshirt;
    }
    else if (color == "White") {
      return WhiteTshirt;
    }
    else if (color == "Yellow") {
      return YellowTshirt;
    }
    else if (color == "Pink") {
      return PinkTshirt;
    }
    else if (color == "Green") {
      return GreenTshirt;
    }
    else if (color == "Maroon") {
      return MaroonTshirt;
    }
    else if (color == "Orange") {
      return OrangeTshirt;
    }
    else if (color == "Purple") {
      return PurpleTshirt;
    }
    else if (color == "Red") {
      return RedTshirt;
    }
    else if (color == "Royal") {
      return RoyalTshirt;
    }
    else if (color == "Navy") {
      return NavyTshirt;
    }
  }
}

function Checkout() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/previousOrder.php")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.userId);
        setName(data.first_name);
      });
  }, []);

  const setPrice = (price, type, size) => {
    price = price * 1;
    if (type == "Crewneck Sweatshirt") {
      price += 8;
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large") {
        price += 2;
      }
    }
    else if (type == "Hooded Sweatshirt") {
      price += 12;
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large") {
        price += 2;
      }
    }
    else if (type == "Long Sleeve T-Shirt") {
      price += 4;
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large") {
        price += 2;
      }
    }
    else {
      if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
        price -= 2;
      }
      else if (size == "Adult XX-Large") {
        price += 2;
      }
    }
    return price;
  }

  return (
    <div className="Checkout">
      {userId ? 
        <div className="success">
          <h1>Thank you for placing an order!</h1>
          <br />
          <h1>We will reach out soon with an order confirmation and next steps.</h1>
          <br />
          <h1>Have a question? Feel Free To Reach Out <a href="https://linktr.ee/hometeamcreativity" target="_blank" className="white">Here</a></h1>
          <br/>
          <div className="CartPage" />
          <br />
          <div className="cartMain">
            <br />
            <h1>{name}'s Order Details</h1>
          </div>
          <br />
          <div className="CartPage" />
            {products.map((product) => (
            <div key={product.product_id}>
              <div className="cartProductRow">
                <div className="productsCell">
                  <div className="fullDesign">
                  <img
                    src={setType(product.product_type, product.color)}
                    alt="Home Team Creativity Logo"
                    className="tshirt"
                  />
                  <img
                    src={"api/images/" + product.filename}
                    alt={product.filename}
                    className="design"
                  />
                  </div>
                </div>
                <div className="productsCell">
                  <br />
                  <h2> <b> {product.product_name} </b></h2> 
                  <h2> Style: {product.product_type} </h2>
                  <h2> Size: {product.size} </h2>
                  <h2> Color: {product.color} </h2>
                </div>
                <br />
                {product.product_id ?
                  <div className="productsCell">
                    <br /><br />
                    <h2>$ {setPrice(product.price, product.product_type, product.size) * product.product_quantity}</h2>
                    <br /><br />
                    <h2> 
                      Qty: 
                      {product.product_quantity} 
                    </h2>
                  </div>
                :
                  <div className="productsCell">
                    <br /><br />
                    <h2>$ {setPrice(product.price, product.product_type, product.size) * product.product_quantity}+</h2>
                    <br /><br />
                    <h2> 
                      Qty: 
                      {product.product_quantity} 
                    </h2>
                  </div>
                }
                {product.product_id ?
                  <div className="productsCell">
                    <br /><br /><br /><br /><br /><br />
                    <h2>$ {setPrice(product.price, product.product_type, product.size) * product.product_quantity}</h2>
                  </div>
                :
                  <div className="productsCell">
                    <br /><br /><br /><br /><br /><br />
                    <h2>$ {setPrice(product.price, product.product_type, product.size) * product.product_quantity}+</h2>
                  </div>
                }
              </div>
              <div className="CartPage" />
            </div>
            ))}
          <br/>
        </div>
      :
        <div>
            <center>
            <br/>
            <h1>Sorry, you must be logged in to view your order.</h1>
            <br />
            <Link to="/login" className="addToCart">
                Login Here
            </Link>
            </center>

        </div>
      }
    </div>
  );
}
export default Checkout;