import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { useSitters } from "@/context/SittersProvider";

export default function ManyMap() {
  const { sitters, clickPetSitter, setClickPetSitter, center, setCenter } =
    useSitters();

  console.log(sitters);
  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
  };

  const options = {
    mapId: "d5dd20a527464be2",
    mapTypeControl: false,
    zoomControl: false,
    clickableIcons: false,
    scrollwheel: true,
    streetViewControl: false,
  };

  const { isLoaded } = useJsApiLoader({
    id: options.mapId,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (sitters && sitters.length > 0) {
    useEffect(() => {
      setCenter({
        lat: Number(sitters[0].sitters_addresses.lat),
        lng: Number(sitters[0].sitters_addresses.lng),
      });
    }, []);

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
        {sitters.map((item, index) => {
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

  return null;
}
