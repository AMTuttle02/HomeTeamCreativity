import React, { useEffect, useState } from "react";

function Checkout() {
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
      {firstName ? <div /> : <div />}
    </div>
  );
}
export default Checkout;