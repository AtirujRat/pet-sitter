import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { useSearch } from "@/context/Search";

export default function Map() {
  const { searchLat, searchLng } = useSearch();
  const containerStyle = {
    width: "1000px",
    height: "800px",
  };

  const center = {
    lat: searchLat,
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
    scaledSize: { width: 50, height: 50 },
  };

  const markerClicked = (event) => {
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
  };

  const markerFinishDrag = (event) => {
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
  };

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
        draggable
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
