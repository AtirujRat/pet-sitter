import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { useSearch } from "@/context/Search";

export default function Map({ draggable }) {
  const { searchLat, searchLng } = useSearch();
  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
  };

  const center = {
    lat: searchLat + 0.0007,
    lng: searchLng,
  };

  const options = {
    mapId: "d5dd20a527464be2",
    mapTypeControl: false, // map or satellite
    zoomControl: false, // zoom button + -
    // fullscreenControl: false, fullscreen button
    clickableIcons: false,
    scrollwheel: true,
    streetViewControl: false,
  };

  const { isLoaded } = useJsApiLoader({
    id: options.mapId,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const pinIcon = {
    url: "/assets/map/pin@2x.png",
    scaledSize: { width: 75, height: 75 },
  };

  function markerClicked(event) {
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
  }

  function markerFinishDrag(event) {
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={options}
      center={center}
      zoom={15}
      //   onLoad={map}
      //   onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <MarkerF
        icon={pinIcon}
        position={{ lat: searchLat, lng: searchLng }}
        draggable={draggable}
        onClick={markerClicked}
        onDragEnd={markerFinishDrag}
        // visible={false}
      />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}
