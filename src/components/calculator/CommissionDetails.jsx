// components/calculator/CommissionDetails.jsx

import React from "react";

const CommissionDetails = ({
  commissionRateDisplay,
  commission,
  tax,
  totalToSend,
  exchangeRate,
  t,
}) => {
  return (
    <div className="row gy-4 mb-3 text-dark">
      <div className="col-6">
        <strong>
          {t.calculadora.Comisión} {commissionRateDisplay}:
        </strong>
      </div>
      <div className="col-6" style={{ color: "#c91c10" }}>
        <strong>{commission}</strong>
      </div>

      <div className="col-6">
        <strong>{t.calculadora.Impuestos}:</strong>
      </div>
      <div className="col-6" style={{ color: "#c91c10" }}>
        <strong>{tax}</strong>
      </div>

      <div className="col-6">
        <strong>{t.calculadora.Total}:</strong>
      </div>
      <div className="col-6" style={{ color: "#c91c10" }}>
        <strong>{totalToSend}</strong>
      </div>

      <div className="col-6">
        <strong>{t.calculadora.Tipo}:</strong>
      </div>
      <div className="col-6" style={{ color: "#c91c10" }}>
        <strong>{exchangeRate}</strong>
      </div>
    </div>
  );
};

export default CommissionDetails;
