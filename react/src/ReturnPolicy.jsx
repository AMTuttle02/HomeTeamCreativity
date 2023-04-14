import React, { useState,useEffect } from "react";
import "./index.css";

function ReturnPolicy() {

  return (
    <div className="ReturnPolicy">
      <br />
      <h1> Return Policy </h1>
      <br />
      <div className="policy">
        We currently do not offer returns due to the custom aspect of our
        apparel. Each item is made after an order is placed. Each order is
        also designed and created for each customer individually.
        Therefore, a return or exchange cannot be made. The only
        exception to this policy are those in which a customer is not happy
        with their order. However, each customer is guaranteed to see what
        product will look like either by ordering custom and receiving
        and confirming a mockup image, or by the online image displayed
        on our website. Any questions regarding the design should be
        addressed before order is placed. If you are not happy with your
        order for some reason, or did not receive a mockup image of your
        product, we will be happy to help and discuss any situations with
        you through direct messaging. Thank you for supporting us!
      </div>
    </div>
  );
}
export default ReturnPolicy;
