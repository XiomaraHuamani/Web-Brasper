// components/calculator/TermsAndConditions.jsx

import React from "react";

const TermsAndConditions = ({ acceptedTerms, setAcceptedTerms, t }) => {
  return (
    <div className="terms-container" style={{ margin: "20px 0" }}>
      <input
        type="checkbox"
        id="acceptTerms"
        checked={acceptedTerms}
        onChange={(e) => setAcceptedTerms(e.target.checked)}
        style={{ marginRight: "8px" }}
      />
      <label htmlFor="acceptTerms">
        {t.calculadora.Acepto}{" "}
        <a href="/terminos-y-condiciones" target="_blank">
          {t.calculadora.Términos}
        </a>
      </label>
    </div>
  );
};

export default TermsAndConditions;
