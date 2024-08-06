import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { useSearch } from "@/context/Search";

export default function Map({ draggable }) {
  const { searchLat, searchLng, location } = useSearch();
  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
  };
  const center = {
    lat: searchLat + 0.0007,
    lng: searchLng,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const pinIcon = {
    url: "/assets/map/pin@2x.png",
    scaledSize: { width: 75, height: 75 },
  };

  function markerFinishDrag(event) {
    location({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  }

  useEffect(() => {
    setTimeout(() => {}, 1000);
  });
  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      <MarkerF
        icon={pinIcon}
        position={{ lat: searchLat, lng: searchLng }}
        draggable={draggable}
        onDragEnd={markerFinishDrag}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}
