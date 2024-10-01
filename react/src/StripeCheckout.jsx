import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StripeCheckout = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [stripeSessionId, setStripeSessionId] = useState(null);
  const {orderId} = useParams();
  const {total} = useParams();

  useEffect(() => {
    const createStripeSession = async () => {
      try {
          const response = await axios.post('/api/your-endpoint-to-create-stripe-session', {
              total_cost: total
          });
          setStripeSessionId(response.data.id);
      } catch (error) {
          console.error('Error creating Stripe session:', error);
      }
    };

      if (orderId > 0 && total > 0) {
          setOrderDetails("Order ID: " + orderId);
          createStripeSession();
      }
  });

  return (
    <div>
        {/* Render order details, payment form, or other components based on state */}
        {stripeSessionId && (
            <StripeCheckout
                stripeKey="your-stripe-public-key"
                token={handleToken}
                amount={total * 100}
                currency="usd"
                name={orderDetails}
                description="Click the back arrow above to review order details."
            />
        )}
    </div>
);
};

