import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useSearch } from "@/context/Search";
import { useEffect } from "react";
import Map from "@/components/map/Map";

export default function PlaceSearch({ draggable }) {
  const { location, address } = useSearch();
  let addresses = `${address.add} ${address.subDistrict} ${address.district} ${address.province} ${address.zip_code}`;

  function handleClick() {
    getGeocode({ address: addresses }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      location({ lat, lng });
    });
  }

  useEffect(() => {
    handleClick();
  }, [address]);

  return <Map draggable={draggable} />;
}
