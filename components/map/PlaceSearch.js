import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useSearch } from "@/context/Search";
import { useEffect } from "react";
import Map from "@/components/map/Map";
import { useUser } from "@/context/User";

export default function PlaceSearch({ draggable }) {
  const { location, address } = useSearch();
  const { setConnection, connection } = useUser();
  let addresses = `${address.address_detail} ${address.subDistrict} ${address.district} ${address.province} ${address.zip_code}`;

  const handleClick = async () => {
    try {
      await getGeocode({ address: addresses }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        location({ lat, lng });
      });
    } catch (e) {
      setConnection(!connection);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleClick();
    }, 1000);
  }, [address]);

  return <Map draggable={draggable} />;
}
