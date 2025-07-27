import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStores } from "../actions/storeAction";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const Store = () => {
  const dispatch = useDispatch();
  const { stores } = useSelector((state) => state.store);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState({ lat: -37.8136, lng: 144.9631 }); // Default: Melbourne, VIC

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Geolocation error:", error.message);
        setLocation({ lat: -37.8136, lng: 144.9631 }); // Default to Melbourne, VIC
      }
    );
  }, []);

  const handleSearch = async () => {
    console.log("Searching for:", search);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(search)},VIC,Australia&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    console.log("Geocode API Response:", data);
  
    if (data.results.length > 0) {
      setLocation(data.results[0].geometry.location);
    } else {
     } 
      
  };

  console.log("Fetched Stores:", stores); // Debugging log

  const filteredStores = stores
    ? stores.filter((store) => store.name?.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Find Your Nearest Store in Victoria</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter postcode or suburb"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </div>
      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={10}>
          {filteredStores.map((store) =>
            store.lat && store.lng ? (
              <Marker key={store.id} position={{ lat: store.lat, lng: store.lng }} />
            ) : null
          )}
        </GoogleMap>
      )}
      <ul className="mt-4">
        {filteredStores.length > 0 ? (
          filteredStores.map((store) => (
            <li key={store.id} className="p-2 border-b">
              <h2 className="font-bold">{store.name}</h2>
              <p>{store.address}</p>
              <a
  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.lat)},${encodeURIComponent(store.lng)}`}
  target="_blank"
  rel="noreferrer"
  className="text-blue-500"
>
  Get Directions
</a>
            </li>
          ))
        ) : (
          <p>No stores found.</p>
        )}
      </ul>
    </div>
  );
};

export default Store;
