import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { clearCart } from "../actions/cartAction";

// Load Stripe with your public key
const stripePromise = loadStripe("pk_test_51PBaZeRqHHluFjf85nR6FqFyNhSvFPkkbyLX5NsESBPduPQUPOMx99jY8S8YazjniwZqI2SQfXd0Zo49FhOnr3MY00hUmzXKfv");

const CheckoutScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get data from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);
  const claimedOffers = useSelector((state) => state.offer.claimedOffers);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Apply discount from offers
  const discount = claimedOffers.reduce((total, offer) => total + (subtotal * offer.discount) / 100, 0);
  const totalPrice = subtotal - discount;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-center text-2xl font-bold mb-4">Checkout</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">
          Your cart is empty. <Link to="/menu" className="text-red-600">Go to Menu</Link>
        </p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between border-b pb-2 mb-2">
              <span>{item.quantity}x {item.name}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          {/* Applied Offers */}
          {claimedOffers.length > 0 && (
            <div className="mt-4 p-4 bg-green-100 rounded-md">
              <h3 className="text-lg font-semibold">Applied Offers</h3>
              {claimedOffers.map((offer) => (
                <p key={offer._id} className="text-green-700">
                  ✅ {offer.title} - {offer.discount}% Off
                </p>
              ))}
            </div>
          )}
          
          {/* Price Breakdown */}
          <div className="mt-4 p-4 border-t">
            <p className="text-lg">Subtotal: ${subtotal.toFixed(2)}</p>
            {claimedOffers.length > 0 && <p className="text-lg text-green-600">Discount: -${discount.toFixed(2)}</p>}
            <p className="text-xl font-bold text-red-600">Total: ${totalPrice.toFixed(2)}</p>
          </div>

          {/* Stripe Payment */}
          <div className="mt-6">
            <Elements stripe={stripePromise}>
              <CheckoutForm totalAmount={totalPrice} /> {/* Pass totalPrice here */}
            </Elements>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-6">
            <button
              className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg"
              onClick={() => navigate("/menu")}
            >
              Back To Menu
            </button>

            <button
              className="w-full bg-red-600 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                dispatch(clearCart());
                navigate("/menu");
              }}
            >
              Cancel Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutScreen;
