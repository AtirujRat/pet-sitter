import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

function SearchProvider(props) {
  const [searchLat, setSearchLat] = useState(13.7563309);
  const [searchLng, setSearchLng] = useState(100.5017651);
  const [address, setAddress] = useState({});
  const [stepBooking, setStepBooking] = useState(1);
  const [payment, setPayment] = useState("Credit Card");

  const location = ({ lat, lng }) => {
    setSearchLat(lat);
    setSearchLng(lng);
    console.log(searchLat, searchLng);
  };

  return (
    <SearchContext.Provider
      value={{
        searchLat,
        searchLng,
        location,
        setAddress,
        address,
        stepBooking,
        setStepBooking,
        payment,
        setPayment,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}

const useSearch = () => useContext(SearchContext);

export { SearchProvider, useSearch };