import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../actions/cartAction";
import { saveOrder } from "../actions/orderAction";

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [fullName, setFullName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      alert("Stripe is not loaded yet.");
      return;
    }

    try {
      if (orderPlaced) return; // 🛑 Prevent multiple orders
      setOrderPlaced(true); // ✅ Ensure function runs only once

      let userid = currentUser?._id || localStorage.getItem("guestId");
      if (!userid) {
        userid = crypto.randomUUID();
        localStorage.setItem("guestId", userid);
      }

      const sanitizedCart = cartItems.map(({ _id, name, price, quantity }) => ({
        id: _id,
        name,
        price,
        quantity,
      }));

      // ✅ Step 1: Create Checkout Session
      const response = await fetch("https://dominos-bnqh.onrender.com/api/checkout/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subtotal: totalAmount,
          user: { _id: userid, name: fullName, email },
          customer: { fullName, email, address, postcode },
          cartItems: sanitizedCart,
        }),
      });

      if (!response.ok) throw new Error("Failed to create checkout session");

      const data = await response.json();
      if (!data.clientSecret) throw new Error("Missing client_secret from backend.");

      // ✅ Step 2: Confirm Payment with Stripe
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: fullName, email, address: { line1: address, postal_code: postcode } },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setOrderPlaced(false); // Allow retry if payment fails
      } else {
        alert("✅ Payment successful!");

        // ✅ Step 3: Confirm Payment on Backend
        const confirmResponse = await fetch("https://dominos-bnqh.onrender.com/api/checkout/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId: result.paymentIntent.id,
            user: { _id: userid, name: fullName, email },
            cartItems: sanitizedCart,
            customer: { fullName, email, address, postcode },
            subtotal: totalAmount,
          }),
        });

        const confirmData = await confirmResponse.json();
        if (!confirmResponse.ok) throw new Error("Failed to confirm payment on backend");

        // ✅ Step 4: Save Order in Redux
        const orderDetails = {
          _id: result.paymentIntent.id,
          orderAmount: totalAmount,
          status: "Cooking Pending",
          userid,
          
          email,
          createdAt: new Date().toISOString(),
          customer: { fullName, email, address, postcode },
          cartItems: sanitizedCart,
          transactionId: result.paymentIntent.id,
        };

        dispatch(saveOrder(orderDetails));

        // ✅ Step 5: Clear Cart & Redirect
        setTimeout(() => {
          dispatch(clearCart());
          navigate("/confirmation");
        }, 500);
      }
    } catch (error) {
      setError(error.message);
      setOrderPlaced(false); // Reset flag for retry
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Enter Payment Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Street Address"
          className="w-full p-3 border rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Postcode"
          className="w-full p-3 border rounded"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          required
        />
        <div className="p-3 border rounded">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;

