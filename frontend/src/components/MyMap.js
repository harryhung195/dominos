import React from "react";
import PropTypes from "prop-types";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px"
};

const MyMap = ({ center = { lat: 21.028511, lng: 105.804817 }, markers = [] }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <div style={{ color: 'red' }}>Google Maps API key is missing.</div>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        <Marker position={center} />
        {markers.map((marker, idx) => (
          <Marker key={idx} position={marker} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

MyMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })
  ),
};

export default MyMap;
