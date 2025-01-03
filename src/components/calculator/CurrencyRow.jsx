// components/calculator/CurrencyRow.jsx

import React from "react";
import Select from "react-select";

// Genera las opciones en formato para react-select
const createSelectOptions = (allCurrencies) => {
  return allCurrencies.map((currency) => ({
    value: currency.code,
    label: currency.code,
    image: currency.image,
  }));
};

// Opción custom para cada ítem del menú
const CustomOption = ({ innerProps, innerRef, data }) => {
  return (
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
};

// Renderizado custom para la opción seleccionada
const CustomSingleValue = ({ innerProps, data }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }} {...innerProps}>
      <img
        src={data.image}
        alt={data.label}
        style={{ width: "20px", height: "20px", marginRight: "8px" }}
      />
      <span>{data.label}</span>
    </div>
  );
};

const CurrencyRow = ({
  label,
  amount,
  onAmountChange,
  selectedCurrency,
  onCurrencyChange,
  allCurrencies,
  allowedCurrencyKeys,
}) => {
  const currencyOptionsSelect = createSelectOptions(allCurrencies);

  return (
    <div className="currency-row pb-2" style={{ marginBottom: "1.5rem" }}>
      <Select
        value={currencyOptionsSelect.find(
          (option) => option.value === selectedCurrency
        )}
        onChange={onCurrencyChange}
        options={currencyOptionsSelect.filter((option) =>
          allowedCurrencyKeys.includes(option.value)
        )}
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
            marginBottom: "-0.4rem",
          }),
          control: (base) => ({ ...base, minHeight: "45px" }),
          valueContainer: (base) => ({
            ...base,
            display: "flex",
            alignItems: "center",
          }),
        }}
      />

      <input
        type="number"
        className="currency-input"
        placeholder={label}
        value={amount}
        onChange={onAmountChange}
        min="100"
        style={{
          backgroundColor: "transparent",
          width: "100%",
          marginTop: "5px",
        }}
      />
    </div>
  );
};

export default CurrencyRow;
