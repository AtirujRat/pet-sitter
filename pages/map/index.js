import PlaceSearch from "@/components/map/PlaceSearch";
import { useSearch } from "@/context/Search";
import axios from "axios";
import { useEffect } from "react";

export default function Testmap() {
  const { searchLat, searchLng } = useSearch();
  async function getData() {
    const data =
      await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${searchLat},${searchLng}
&location_type=ROOFTOP&result_type=street_address&language=en&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
    console.log(data);
  }
  useEffect(() => {
    getData();
  }, [searchLat, searchLng]);
  return (
    <>
      <div className="w-[800px] h-[700px]">
        <PlaceSearch />;
      </div>
    </>
  );
}
