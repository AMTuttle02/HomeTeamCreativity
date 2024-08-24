import React, { useState, useEffect } from "react";

function CostCalculator() {
  const [admin, setAdmin] = useState("");
  useEffect(() => {
    fetch("/api/admin.php")
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data.admin);
      });
  }, []);

  const [subtotal, setSubtotal] = useState(16.00.toFixed(2));

  const onlineTotalCost = (subtotal) => {
    let taxableTotal = (subtotal * 1 + (subtotal * 0.029 + 0.31) * 1)
    let total = taxCost(taxableTotal);
    return ((total *1).toFixed(2));
  }

  const taxCost = (subtotal) => {
    let tax = (subtotal * 0.0725);
    let total = ((subtotal * 1) + tax).toFixed(2);
    return (total);
  }

  if (admin) {
    return (
      <div className="UpdatedLogin">
        <br />
        <div className="LoginPage">
          <div className="container">
            <h1>
              Cost Calculator
            </h1>
            <h3>Subtotal: $<input type="number" value={subtotal} onChange={(event) => setSubtotal(event.target.value)} /></h3>
            <h3>Taxed Total: ${taxCost(subtotal)}</h3>
            <h3>Online Total: ${onlineTotalCost(subtotal)}</h3>
          </div>
        </div>
      </div>
    );
  }
};
export default CostCalculator;
