import React from "react";

const InputField = ({ value, placeholder, onChange }) => (
  <input
    type="number"
    className="currency-input"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    min="100"
    style={{ backgroundColor: "transparent" }}
  />
);

export default InputField;
