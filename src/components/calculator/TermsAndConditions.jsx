import React from "react";

const TermsAndConditions = ({ acceptedTerms, onChange }) => (
  <div className="terms-container" style={{ margin: "20px 0" }}>
    <input
      type="checkbox"
      id="acceptTerms"
      checked={acceptedTerms}
      onChange={(e) => onChange(e.target.checked)}
      style={{ marginRight: "8px" }}
    />
    <label htmlFor="acceptTerms">
      Acepto los{" "}
      <a href="/terminos-y-condiciones" target="_blank">
        términos y condiciones
      </a>
    </label>
  </div>
);

export default TermsAndConditions;
