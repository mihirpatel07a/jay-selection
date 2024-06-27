import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const coordinates = { lat: 21.7415298, lon: 70.2831195 };
  
  return (
    <div className="w-full h-full">
      <MapContainer
        center={[coordinates.lat, coordinates.lon]}
        zoom={13}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[coordinates.lat, coordinates.lon]}>
          <Popup>Jay Selection Upleta</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
