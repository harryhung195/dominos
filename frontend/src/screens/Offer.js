
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers, claimOffer } from "../actions/offerAction"; // Create Redux action for fetching offers

const OfferScreen = () => {
  const dispatch = useDispatch();
  const { offers, error, loading, claimedOffers } = useSelector((state) => state.offer);
  const { currentUserClaimedOffer } = useSelector((state) => state.offer);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const handleClaimOffer = (offer) => {
   dispatch(claimOffer(offer));
    // Apply offer to cart or checkout, can also store in Redux
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Special Offers</h2>
      {loading && <p className="text-center text-blue-600">Loading offers...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div key={offer._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={offer.image || "https://via.placeholder.com/150"}
              alt={offer.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold mt-4">{offer.title}</h3>
            <p className="text-sm text-gray-700 mt-2">{offer.description}</p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xl font-bold text-green-600">
                {offer.discount}% Off
              </span>
              <button
                className={`px-4 py-2 rounded-md ${
                  claimedOffers.some((o) => o._id === offer._id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                onClick={() => handleClaimOffer(offer)}
                disabled={currentUserClaimedOffer} // Disable button if the user has claimed an offer
              >
                {currentUserClaimedOffer ? "Claimed" : "Claim Offer"}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Valid until: {new Date(offer.validUntil).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">offerCode: {offer.offerCode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferScreen;

