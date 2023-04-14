import React, { useEffect, useState } from "react";

function CheckoutFailed() {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    fetch("/api/session.php")
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.first_name);
      });
  }, []);

  return (
    <div className="Checkout">
      {firstName ? 
        <div className="success">
            <h1>Sorry, {firstName}. Something went wrong.</h1>
            <h1>Please try again.</h1>
        </div> 
      : 
        <div />
      }
    </div>
  );
}
export default CheckoutFailed;