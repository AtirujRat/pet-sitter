import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider(props) {
  const [searchLat, setSearchLat] = useState(13.7563309);
  const [searchLng, setSearchLng] = useState(100.5017651);
  const [address, setAddress] = useState({});

  const location = ({ lat, lng }) => {
    setSearchLat(lat);
    setSearchLng(lng);
  };

  return (
    <SearchContext.Provider
      value={{
        searchLat,
        searchLng,
        location,
        setAddress,
        address,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}
