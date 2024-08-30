"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { getCoords } from "../_utils/getCoords";

function CarMap({ carLocated }) {
  const [coords, setCoords] = useState({ lat: 41.6938, lng: 44.8015 });
  delete L.Icon.Default.prototype._getIconUrl;

  useEffect(() => {
    async function getData() {
      try {
        const newCoords = await getCoords(carLocated);
        setCoords({
          lat: newCoords.latitude,
          lng: newCoords.longitude,
        });
      } catch (error) {
        console.error("Failed to fetch coordinates:", error);
      }
    }

    getData();
  }, [carLocated]);

  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });

  return (
    <MapContainer
      center={[coords.lat, coords.lng]}
      zoom={9}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[coords.lat, coords.lng]}>
        <Popup>
          {carLocated} <br />
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default CarMap;
