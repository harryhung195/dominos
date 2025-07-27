import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers, createOffer, deleteOffer } from "../actions/offerAction";

const AdminOffersScreen = () => {
  const dispatch = useDispatch();
  const { offers, loading, error } = useSelector((state) => state.offer);
  const { user } = useSelector((state) => state.user); // Get user data

  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    discount: "",
    validUntil: "",
    image: "", // Accepts image URL
    offerCode: "",
  });

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const handleCreate = () => {
    dispatch(createOffer(newOffer));
    setNewOffer({ title: "", description: "", discount: "", validUntil: "", image: "", offerCode: "" });
  };

  const handleDelete = (offerId) => {
    dispatch(deleteOffer(offerId));
  };

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Admin: Manage Offers</h2>

      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Create Offer Form */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-semibold mb-2">Create New Offer</h3>
        <input
          type="text"
          placeholder="Title"
          value={newOffer.title}
          onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
          className="p-2 border rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newOffer.description}
          onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
          className="p-2 border rounded w-full mb-2"
        />
        <input
          type="number"
          placeholder="Discount %"
          value={newOffer.discount}
          onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })}
          className="p-2 border rounded w-full mb-2"
        />
        <input
          type="date"
          value={newOffer.validUntil}
          onChange={(e) => setNewOffer({ ...newOffer, validUntil: e.target.value })}
          className="p-2 border rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newOffer.image}
          onChange={(e) => setNewOffer({ ...newOffer, image: e.target.value })}
          className="p-2 border rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Offer Code"
          value={newOffer.offerCode}
          onChange={(e) => setNewOffer({ ...newOffer, offerCode: e.target.value })}
          className="p-2 border rounded w-full mb-2"
        />
        <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded">
          Create Offer
        </button>
      </div>

      {/* Offer List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div key={offer._id} className="p-4 bg-white shadow-md rounded">
           
            {offer.image && (
              <img src={offer.image} alt={offer.title} className="w-full h-40 object-cover rounded-t-lg" />
            )}
             <h3 className="text-lg font-semibold">{offer.title}</h3>
             <p className="text-sm">{offer.description}</p>
            <p className="text-green-600 font-bold">{offer.discount}% Off</p>
            <p className="text-sm">Valid until: {new Date(offer.validUntil).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500 mt-2">offerCode: {offer.offerCode}
            </p>
            <button
              onClick={() => handleDelete(offer._id)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOffersScreen;
