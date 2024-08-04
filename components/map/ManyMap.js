import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { useSitters } from "@/context/SittersProvider";
import CalculateRatingStars from "@/hook/useCalculateRatingStars";

export default function ManyMap() {
  const {
    sitters,
    clickPetSitter,
    setClickPetSitter,
    center,
    setCenter,
    filteredRating,
    reset,
  } = useSitters();

  const containerStyle = {
    width: "100%",
    height: "750px",
    borderRadius: "8px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const filteredSitters = sitters.filter((sitter) => {
    const { ratingStars } = CalculateRatingStars(sitter.bookings);
    return filteredRating === null || ratingStars === filteredRating;
  });

  useEffect(() => {
    if (filteredSitters && filteredSitters.length > 0) {
      setTimeout(() => {
        setCenter({
          lat: Number(sitters[0].sitters_addresses.lat),
          lng: Number(sitters[0].sitters_addresses.lng),
        });
      }, 2000);
    }
  }, [reset]);

  const pinIconInActive = {
    url: "/assets/map/inactive-pin.png",
    scaledSize: { width: 75, height: 75 },
  };

  const pinIconActive = {
    url: "/assets/map/pin@2x.png",
    scaledSize: { width: 75, height: 75 },
  };

  return isLoaded ? (
    <GoogleMap
      // ref={mapRef}
      mapContainerStyle={containerStyle}
      options={options}
      center={center}
      zoom={11}
    >
      {filteredSitters.map((item, index) => {
        return (
          <MarkerF
            key={index}
            icon={clickPetSitter[item.id] ? pinIconActive : pinIconInActive}
            position={{
              lat: Number(item.sitters_addresses.lat),
              lng: Number(item.sitters_addresses.lng),
            }}
            draggable={false}
            onClick={() => {
              const newClick = {};
              newClick[item.id] = 1;
              newClick["index"] = index;
              setClickPetSitter(newClick);
              setCenter({
                lat: Number(item.sitters_addresses.lat),
                lng: Number(item.sitters_addresses.lng),
              });
            }}
          />
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
}
