import React from "react";
import Select from "react-select";

const CustomOption = ({ innerRef, innerProps, data }) => (
  <div
    ref={innerRef}
    {...innerProps}
    style={{ display: "flex", alignItems: "center", padding: "8px 12px" }}
  >
    <img
      src={data.image}
      alt={data.label}
      style={{ width: "20px", height: "20px", marginRight: "8px" }}
    />
    <span>{data.label}</span>
  </div>
);

const CustomSingleValue = ({ data }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <img
      src={data.image}
      alt={data.label}
      style={{ width: "20px", height: "20px", marginRight: "8px" }}
    />
    <span>{data.label}</span>
  </div>
);

const CurrencySelect = ({ value, options, onChange, getAvailableOptions }) => {
  const filteredOptions = getAvailableOptions
    ? options.filter((option) => getAvailableOptions().includes(option.value))
    : options;

  return (
    <Select
      value={value}
      onChange={onChange}
      options={filteredOptions}
      components={{
        Option: CustomOption,
        SingleValue: CustomSingleValue,
      }}
      isSearchable={false}
      styles={{
        container: (base) => ({
          ...base,
          width: "50%",
          margin: "0 auto",
        }),
        control: (base) => ({ ...base, minHeight: "45px" }),
      }}
    />
  );
};

export default CurrencySelect;
