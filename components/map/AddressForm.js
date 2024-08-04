import axios from "axios";
import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import PlaceSearch from "./PlaceSearch";
import { useSearch } from "@/context/Search";
import { DebounceInput } from "react-debounce-input";

export default function AddressForm({ existingAddress, error }) {
  const { setFieldValue } = useFormikContext();
  const [input, setInput] = useState("");
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subDistrict, setSubDistrict] = useState([]);

  const { address, setAddress } = useSearch();
  async function getData() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
      );
      const data = await response.json();
      setProvince(data);
    } catch (e) {
      // console.log(e);
    }
  }

  function handleInput(e) {
    setInput(e.target.value);
    setAddress({ ...address, address_detail: e.target.value });
    setFieldValue("address.address_detail", e.target.value);
  }

  function handleProvince(event) {
    const data = province.filter((item) => {
      return item.id == event.target.value;
    });
    setAddress({ ...address, province: data[0].name_en });
    setFieldValue("address.province", data[0].name_en);
    setSubDistrict([]);
    setDistrict(data[0].amphure);
  }

  function handleDistrict(event) {
    const data = district.filter((item) => {
      return item.id == event.target.value;
    });
    setSubDistrict(data[0].tambon);
    setAddress({ ...address, district: data[0].name_en, zip_code: "" });
    setFieldValue("address.district", data[0].name_en);
  }

  function handleSubDistrict(event) {
    const data = subDistrict.filter((item) => {
      return item.id == event.target.value;
    });
    setAddress({
      ...address,
      subDistrict: data[0].name_en,
      zip_code: data[0].zip_code,
    });
    setFieldValue("address.subDistrict", data[0].name_en);
    setFieldValue("address.zip_code", data[0].zip_code);
  }
  useEffect(() => {
    getData();
    if (existingAddress) {
      setAddress({
        address_detail: existingAddress.address_detail,
        province: existingAddress.province,
        district: existingAddress.district,
        subDistrict: existingAddress.sub_district,
        zip_code: existingAddress.post_code,
      });
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label htmlFor="address_detail" className="text-b2">
          Address detail*
        </label>
        <DebounceInput
          value={address.address_detail}
          debounceTimeout={1000}
          onChange={handleInput}
          placeholder="Address"
          className="select w-full border rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400 h-[54px] focus:outline-none focus:ring-0"
        />
        {error
          ? error.address_detail && (
              <span className="text-ps-red">{error.address_detail}</span>
            )
          : null}
      </div>
      <div className="w-full sm:flex sm:gap-10">
        <div className="w-full">
          <label htmlFor="province" className="text-b2">
            Province*
          </label>
          <select
            className="select w-full border rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400 h-[54px] focus:outline-none focus:ring-0"
            onChange={handleProvince}
            value={address.province}
          >
            <option selected disabled>
              {address.province ? address.province : "Province"}
            </option>
            {province.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name_en}
                </option>
              );
            })}
          </select>
          {error
            ? error.province && (
                <span className="text-ps-red">{error.province}</span>
              )
            : null}
        </div>
        <div className="w-full">
          <label htmlFor="distrinct" className="text-b2">
            District*
          </label>
          <select
            className="select w-full border rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400 h-[54px] focus:outline-none focus:ring-0"
            onChange={handleDistrict}
            value={address.district}
          >
            <option selected disabled>
              {address.district ? address.district : "Distrinct"}
            </option>
            {district.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name_en}
                </option>
              );
            })}
          </select>
          {error
            ? error.district && (
                <span className="text-ps-red">{error.district}</span>
              )
            : null}
        </div>
      </div>
      <div className="w-full sm:flex sm:gap-10">
        <div className="w-full">
          <label htmlFor="sub-distrinct" className="text-b2">
            Sub-district*
          </label>
          <select
            className="select w-full border rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400 h-[54px] focus:outline-none focus:ring-0"
            onChange={handleSubDistrict}
            value={address.subDistrict}
          >
            <option selected disabled>
              {address.subDistrict ? address.subDistrict : "Sub-Distrinct"}
            </option>
            {subDistrict.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name_en}
                </option>
              );
            })}
          </select>
          {error
            ? error.subDistrict && (
                <span className="text-ps-red">{error.subDistrict}</span>
              )
            : null}
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="post-code" className="text-b2">
            Post code*
          </label>
          <input
            type="text"
            value={address.zip_code || ""}
            className="w-full border rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400 h-[54px] focus:outline-none focus:ring-0"
          />
          {error
            ? error.zip_code && (
                <span className="text-ps-red">{error.zip_code}</span>
              )
            : null}
        </div>
      </div>
      <div className="w-full h-[400px]">
        <PlaceSearch draggable={true} />
      </div>
    </div>
  );
}
