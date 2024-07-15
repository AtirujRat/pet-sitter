import axios from "axios";
import { useEffect, useState } from "react";
import PlaceSearch from "./PlaceSearch";
import { useSearch } from "@/pages/context/Search";
import { DebounceInput } from "react-debounce-input";

export default function AddressForm() {
  const [input, setInput] = useState("");
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subDistrict, setSubDistrict] = useState([]);

  const { address, setAddress } = useSearch();
  const getData = async () => {
    const data = await axios.get(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
    );
    setProvince(data.data);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    setAddress({ ...address, add: e.target.value });
  };

  const handleProvince = (event) => {
    const data = province.filter((item) => {
      return item.id == event.target.value;
    });
    setAddress({ province: data[0].name_en });
    setSubDistrict([]);
    setDistrict(data[0].amphure);
  };

  const handleDistrict = (event) => {
    const data = district.filter((item) => {
      return item.id == event.target.value;
    });
    setSubDistrict(data[0].tambon);
    setAddress({ ...address, district: data[0].name_en, zip_code: "" });
  };

  const handleSubDistrict = (event) => {
    const data = subDistrict.filter((item) => {
      return item.id == event.target.value;
    });
    setAddress({
      ...address,
      subDistrict: data[0].name_en,
      zip_code: data[0].zip_code,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <DebounceInput
        value={input}
        debounceTimeout={1000}
        onChange={handleInput}
        placeholder="Address"
      />
      <select className="select w-full max-w-xs" onChange={handleProvince}>
        <option selected>Province</option>
        {province.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name_en}
            </option>
          );
        })}
      </select>
      <select className="select w-full max-w-xs" onChange={handleDistrict}>
        <option selected>Distrinct</option>
        {district.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name_en}
            </option>
          );
        })}
      </select>
      <select className="select w-full max-w-xs" onChange={handleSubDistrict}>
        <option selected>Sub-Distrinct</option>
        {subDistrict.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name_en}
            </option>
          );
        })}
      </select>
      <input type="text" value={address.zip_code || ""} />
      <PlaceSearch />
    </div>
  );
}
