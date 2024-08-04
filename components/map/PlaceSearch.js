import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useSearch } from "@/context/Search";
import { useEffect } from "react";
import Map from "@/components/map/Map";

export default function PlaceSearch({ draggable }) {
  const { location, address } = useSearch();
  let addresses = `${address.address_detail} ${address.subDistrict} ${address.district} ${address.province} ${address.zip_code}`;

  const handleClick = async () => {
    try {
      await getGeocode({ address: addresses }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        location({ lat, lng });
      });
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleClick();
    }, 5000);
  }, [address]);

  return <Map draggable={draggable} />;
}
