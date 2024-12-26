import React, { useState, useEffect } from "react";
import CurrencySelect from "./CurrencySelect";
import InputField from "./InputField";
import Summary from "./Summary";
import TermsAndConditions from "./TermsAndConditions";

const CalculatorContainer = () => {
  const [amountSend, setAmountSend] = useState("");
  const [amountReceive, setAmountReceive] = useState("");
  const [fromCurrency, setFromCurrency] = useState("PEN");
  const [toCurrency, setToCurrency] = useState("BRL");
  const [commission, setCommission] = useState(0);
  const [commissionRateDisplay, setCommissionRateDisplay] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalToSend, setTotalToSend] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [editingReceiveAmount, setEditingReceiveAmount] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [exchangeRates, setExchangeRates] = useState({});
  const [commissionRates, setCommissionRates] = useState({});

  // Función para obtener tasas de cambio
  const fetchExchangeRates = async () => {
    try {
      const response = await fetch(
        "https://api.brasper.site/api/v1/coin/exchange-rates/"
      );
      const data = await response.json();
      const formattedRates = {};

      data.forEach((rate) => {
        const baseCurrency =
          rate.base_currency === 1
            ? "PEN"
            : rate.base_currency === 2
            ? "BRL"
            : "USD";
        const targetCurrency =
          rate.target_currency === 1
            ? "PEN"
            : rate.target_currency === 2
            ? "BRL"
            : "USD";
        formattedRates[`${baseCurrency}-${targetCurrency}`] = rate.rate;
      });

      setExchangeRates(formattedRates);
    } catch (error) {
      console.error("Error al obtener tasas de cambio:", error);
      setErrorMessage("Error al cargar tasas de cambio.");
    }
  };

  // Función para obtener tasas de comisión
  const fetchCommissionRates = async () => {
    try {
      const response = await fetch(
        "https://api.brasper.site/api/v1/coin/commissions/"
      );
      const data = await response.json();
      const formattedCommissionRates = {};

      data.forEach((commission) => {
        const baseCurrency =
          commission.base_currency === 1
            ? "PEN"
            : commission.base_currency === 2
            ? "BRL"
            : "USD";
        const targetCurrency =
          commission.target_currency === 1
            ? "PEN"
            : commission.target_currency === 2
            ? "BRL"
            : "USD";
        const key = `${baseCurrency}-${targetCurrency}`;
        if (!formattedCommissionRates[key]) {
          formattedCommissionRates[key] = [];
        }
        formattedCommissionRates[key].push({
          min: parseFloat(commission.range_details.min_amount),
          max: parseFloat(commission.range_details.max_amount),
          rate: commission.commission_percentage / 100,
        });
      });

      for (const key in formattedCommissionRates) {
        formattedCommissionRates[key].sort((a, b) => a.min - b.min);
      }

      setCommissionRates(formattedCommissionRates);
    } catch (error) {
      console.error("Error al obtener tasas de comisión:", error);
    }
  };

  // Efecto para cargar tasas al inicio
  useEffect(() => {
    fetchExchangeRates();
    fetchCommissionRates();
  }, []);

  const calculateCommissionRate = (amount, currencyPair) => {
    const rates = commissionRates[currencyPair];
    if (!rates) return 0.03; // Tasa de comisión por defecto
    for (let rate of rates) {
      if (amount >= rate.min && amount <= rate.max) return rate.rate;
    }
    return rates[rates.length - 1].rate;
  };

  const calculate = (amount, isReceiveAmount = false) => {
    const key = `${fromCurrency}-${toCurrency}`;
    const rate = exchangeRates[key];
    if (!rate) {
      setErrorMessage("Tipo de cambio no disponible.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) return;

    const taxRate = 0.18;
    let amountSendCalc, commissionRate;

    if (isReceiveAmount) {
      amountSendCalc = parsedAmount / rate;
      commissionRate = calculateCommissionRate(amountSendCalc, key);
      const totalRate = commissionRate * (1 + taxRate);
      amountSendCalc = parsedAmount / (rate * (1 - totalRate));

      if (amountSendCalc < 100) {
        setErrorMessage("El monto mínimo es 100.");
        return;
      }
    } else {
      if (parsedAmount < 100) {
        setErrorMessage("El monto mínimo es 100.");
        return;
      }
      commissionRate = calculateCommissionRate(parsedAmount, key);
    }

    const commissionAmount = parsedAmount * commissionRate;
    const taxAmount = commissionAmount * taxRate;
    const total = parsedAmount - commissionAmount - taxAmount;
    const received = total * rate;

    setCommission(commissionAmount.toFixed(2));
    setTax(taxAmount.toFixed(2));
    setTotalToSend(total.toFixed(2));
    setExchangeRate(rate.toFixed(3));
    if (isReceiveAmount) {
      setAmountSend(amountSendCalc.toFixed(2));
    } else {
      setAmountReceive(received.toFixed(2));
    }
    setErrorMessage("");
  };

  useEffect(() => {
    if (editingReceiveAmount && amountReceive) {
      calculate(amountReceive, true);
    } else if (amountSend) {
      calculate(amountSend);
    }
  }, [amountSend, amountReceive, fromCurrency, toCurrency]);

  const currencies = [
    { code: "PEN", label: "Soles Peruanos" },
    { code: "BRL", label: "Reales Brasileños" },
    { code: "USD", label: "Dólares Estadounidenses" },
  ];

  const currencyOptions = currencies.map((currency) => ({
    value: currency.code,
    label: currency.label,
  }));

  return (
    <div className="calculator-container">
      <h5>Calculadora</h5>

      <div className="currency-inputs">
        {/* Moneda de envío */}
        <CurrencySelect
          value={currencyOptions.find((opt) => opt.value === fromCurrency)}
          options={currencyOptions}
          onChange={(selectedOption) => setFromCurrency(selectedOption.value)}
        />
        <InputField
          value={amountSend}
          placeholder="Monto a Enviar"
          onChange={(e) => {
            setAmountSend(e.target.value);
            setEditingReceiveAmount(false);
          }}
        />

        {/* Resumen */}
        <Summary
          commission={commission}
          commissionRate={commissionRateDisplay}
          tax={tax}
          total={totalToSend}
          exchangeRate={exchangeRate}
          errorMessage={errorMessage}
        />

        {/* Moneda de recepción */}
        <CurrencySelect
          value={currencyOptions.find((opt) => opt.value === toCurrency)}
          options={currencyOptions}
          onChange={(selectedOption) => setToCurrency(selectedOption.value)}
        />
        <InputField
          value={amountReceive}
          placeholder="Monto a Recibir"
          onChange={(e) => {
            setAmountReceive(e.target.value);
            setEditingReceiveAmount(true);
          }}
        />
      </div>

      {/* Términos y condiciones */}
      <TermsAndConditions
        acceptedTerms={acceptedTerms}
        onChange={setAcceptedTerms}
      />

      {/* Botón */}
      <button
        className="theme-btn"
        onClick={() => {
          if (!acceptedTerms) {
            alert("Debe aceptar los términos.");
            return;
          }
          alert("¡Calculado!");
        }}
      >
        Enviar
      </button>
    </div>
  );
};

export default CalculatorContainer;
