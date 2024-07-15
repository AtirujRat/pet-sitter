import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useSearch } from "@/pages/context/Search";
import { useEffect } from "react";
import Map from "@/components/Map";

export default function PlaceSearch() {
  const { location, address } = useSearch();
  let addresses = `${address.add} ${address.subDistrict} ${address.district} ${address.province} ${address.zip_code}`;

  const handleClick = () => {
    getGeocode({ address: addresses }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      location({ lat, lng });
    });
  };

  useEffect(() => {
    handleClick();
  }, [address]);

  return <Map />;
}
