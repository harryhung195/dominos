import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart, clearCart } from "../actions/cartAction";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { claimedOffers } = useSelector((state) => state.offer);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calculate total discount from claimed offers
  const discount = claimedOffers.reduce((acc, offer) => acc + (subtotal * offer.discount) / 100, 0);

  // Calculate final total after applying the discount
  const finalTotal = subtotal - discount;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-center text-2xl font-bold mb-4">Shopping Cart</h2>

      {/* Display Claimed Offers */}
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

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-4 shadow-lg rounded-lg">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between border-b pb-3 mb-3">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                  <p className="text-red-600 font-bold">${item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-2">
                    <button
                      className="text-lg font-bold px-2 py-1 bg-gray-300 rounded"
                      onClick={() => dispatch(addToCart({ ...item, quantity: item.quantity - 1 }))}
                      disabled={item.quantity <= 1}
                    >
                      ➖
                    </button>
                    <p className="mx-3">{item.quantity}</p>
                    <button
                      className="text-lg font-bold px-2 py-1 bg-gray-300 rounded"
                      onClick={() =>
                        dispatch(addToCart({ ...item, quantity: item.quantity + 1 }))
                      }
                      disabled={item.quantity >= 10}
                    >
                      ➕
                    </button>
                  </div>
                </div>
              </div>

              {/* Remove Item Button */}
              <button
                className="bg-red-600 text-white px-2 py-1 rounded-lg"
                onClick={() => dispatch(removeFromCart(item._id))}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Subtotal Section */}
          <div className="mt-4 p-4 border-t">
            <h3 className="text-lg font-semibold">Subtotal:</h3>
            <p className="text-xl font-bold text-red-600">${subtotal.toFixed(2)}</p>

            {claimedOffers.length > 0 && (
              <>
                <h3 className="text-lg font-semibold text-green-600">Discount Applied:</h3>
                <p className="text-xl font-bold text-green-600">- ${discount.toFixed(2)}</p>
              </>
            )}

            <h3 className="text-lg font-semibold mt-2">Final Total:</h3>
            <p className="text-xl font-bold text-blue-600">${finalTotal.toFixed(2)}</p>
          </div>

          {/* Buttons: Clear Cart & Checkout */}
          <div className="flex flex-col gap-4 mt-4">
            <button
              className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>

            {/* Conditional Checkout Button */}
            {cartItems.length > 0 ? (
              <Link to="/checkout">
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg">
                  Proceed to Checkout
                </button>
              </Link>
            ) : (
              <button
                className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                disabled
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
