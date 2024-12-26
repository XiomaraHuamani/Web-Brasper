import React from "react";

const Summary = ({
  commission,
  commissionRate,
  tax,
  total,
  exchangeRate,
  errorMessage,
}) => (
  <div>
    {errorMessage && (
      <div className="error-message text-danger">{errorMessage}</div>
    )}
    <div className="row gy-4 mb-3 text-dark">
      <div className="col-6">
        <strong>Comisión {commissionRate}:</strong>
      </div>
      <div className="col-6" style={{ color: "#c91c10" }}>
        <strong>{commission}</strong>
      </div>
      <div className="col-6">
        <strong>Impuestos:</strong>
      </div>
      <div className="col-6" style={{ color: "#c91c10" }}>
        <strong>{tax}</strong>
      </div>
      <div className="col-6">
        <strong>Total:</strong>
      </div>
      <div className="col-6" style={{ color: "#c91c10" }}>
        <strong>{total}</strong>
      </div>
      <div className="col-6">
        <strong>Tipo de Cambio:</strong>
      </div>
      <div className="col-6" style={{ color: "#c91c10" }}>
        <strong>{exchangeRate}</strong>
      </div>
    </div>
  </div>
);

export default Summary;
