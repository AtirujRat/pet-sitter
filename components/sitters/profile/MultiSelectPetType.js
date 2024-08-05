import { useState } from "react";

export default function MultiSelect({ options, field, form }) {
  const [selectedOptions, setSelectedOptions] = useState(field.value || []);

  const handleSelect = (event) => {
    const value = event.target.value;
    if (value && !selectedOptions.includes(value)) {
      const newSelectedOptions = [...selectedOptions, value];
      setSelectedOptions(newSelectedOptions);
      form.setFieldValue(field.name, newSelectedOptions);
    }
  };

  const handleRemove = (value) => {
    const newSelectedOptions = selectedOptions.filter(
      (option) => option !== value
    );
    setSelectedOptions(newSelectedOptions);
    form.setFieldValue(field.name, newSelectedOptions);
  };

  return (
    <div className="relative">
      <select
        onChange={handleSelect}
        value=""
        className="w-full h-14 rounded-lg border-ps-gray-200 font-normal text-ps-gray-400"
      >
        <option value="" disabled>
          {!options.length > 0 && "Select pet type"}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="flex gap-2 text-[14px] absolute top-0 left-0 translate-y-1.5 px-3 py-1">
        {selectedOptions.map((option) => (
          <span
            key={option}
            className="bg-ps-orange-100 p-2 rounded-full text-ps-orange-600 font-bold"
          >
            {option}
            <button
              type="button"
              onClick={() => handleRemove(option)}
              className="pl-2 text-ps-orange-600 font-extrabold text-[12px] "
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
