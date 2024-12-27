// components/calculator/Calculator.jsx

import React, { useState, useEffect } from "react";
import { useLocale } from "@/context/LocaleContext";
import Image from "next/image";

// IMPORTAMOS LOS COMPONENTES SEPARADOS
import CurrencyRow from "./CurrencyRow";
import CommissionDetails from "./CommissionDetails";
import TermsAndConditions from "./TermsAndConditions";
import SendButton from "./SendButton";

// (Opcional) Logo o cualquier otra imagen
import Logo from "../../../public/assets/images/logos/logo_principal.png";

const currencies = [
  {
    code: "PEN",
    name: "Soles Peruanos",
    flag: "🇵🇪",
    image: "/assets/images/flags/pe.png",
  },
  {
    code: "USD",
    name: "Dólares Estadounidenses",
    flag: "🇺🇸",
    image: "/assets/images/flags/pe.png",
  },
  {
    code: "BRL",
    name: "Reales Brasileños",
    flag: "🇧🇷",
    image: "/assets/images/flags/bra.png",
  },
];

// Opciones de moneda permitidas
const currencyOptions = {
  PEN: ["BRL"],
  USD: ["BRL"],
  BRL: ["PEN", "USD"],
};

const Calculator = () => {
  const { t } = useLocale();

  // ESTADOS PRINCIPALES
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

  // PARA GUARDAR Y USAR LAS TASAS OBTENIDAS
  const [exchangeRates, setExchangeRates] = useState({});
  const [cachedRates, setCachedRates] = useState({});
  const [commissionRates, setCommissionRates] = useState({});

  // ---------------------------------------------------------------------------
  //  FUNCIONES PARA OBTENER DATOS DE LA API
  // ---------------------------------------------------------------------------
  const fetchExchangeRates = async () => {
    try {
      const response = await fetch(
        "https://api.brasper.site/api/v1/coin/exchange-rates/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
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
      setCachedRates(formattedRates);
    } catch (error) {
      console.error("Error al obtener las tasas de cambio:", error);
      setErrorMessage("Error al cargar las tasas de cambio.");
    }
  };

  const fetchCommissionRates = async () => {
    try {
      const response = await fetch(
        "https://api.brasper.site/api/v1/coin/commissions/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );
      const data = await response.json();
      const formattedCommissionRates = {};

      data.forEach((commissionItem) => {
        const baseCurrency =
          commissionItem.base_currency === 1
            ? "PEN"
            : commissionItem.base_currency === 2
            ? "BRL"
            : "USD";
        const targetCurrency =
          commissionItem.target_currency === 1
            ? "PEN"
            : commissionItem.target_currency === 2
            ? "BRL"
            : "USD";
        const key = `${baseCurrency}-${targetCurrency}`;

        if (!formattedCommissionRates[key]) {
          formattedCommissionRates[key] = [];
        }
        formattedCommissionRates[key].push({
          min: parseFloat(commissionItem.range_details.min_amount),
          max: parseFloat(commissionItem.range_details.max_amount),
          rate: commissionItem.commission_percentage / 100,
        });
      });

      // Ordenar los rangos por monto mínimo
      for (const key in formattedCommissionRates) {
        formattedCommissionRates[key].sort((a, b) => a.min - b.min);
      }

      setCommissionRates(formattedCommissionRates);
    } catch (error) {
      console.error("Error al obtener las tasas de comisión:", error);
    }
  };

  // ---------------------------------------------------------------------------
  //  EFECTOS
  // ---------------------------------------------------------------------------
  useEffect(() => {
    fetchExchangeRates();
    fetchCommissionRates();
  }, []);

  // Usar la caché para actualizar la vista cada segundo sin volver a llamar a la API
  useEffect(() => {
    const interval = setInterval(() => {
      setExchangeRates((prevRates) => ({
        ...prevRates,
        ...cachedRates,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [cachedRates]);

  // ---------------------------------------------------------------------------
  //  LÓGICA DE CÁLCULO
  // ---------------------------------------------------------------------------
  const calculateCommissionRate = (amount, currencyPair) => {
    const rates = commissionRates[currencyPair];
    if (!rates) {
      return 0.03; // Por defecto, 3% si no hay nada definido
    }
    for (let i = 0; i < rates.length; i++) {
      const { min, max, rate } = rates[i];
      if (amount >= min && amount <= max) {
        return rate;
      }
    }
    // Si supera el último rango, usamos la última tasa
    return rates[rates.length - 1].rate;
  };

  const calculate = (amount, isReceiveAmount = false) => {
    const key = `${fromCurrency}-${toCurrency}`;
    const rate = exchangeRates[key];

    if (!rate) {
      setCommission(0);
      setCommissionRateDisplay(0);
      setTax(0);
      setTotalToSend(0);
      setExchangeRate("N/A");
      setErrorMessage("Tipo de cambio no disponible");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) return;

    const taxRate = 0.18;
    let commissionRate;
    let amountSendCalc;

    if (isReceiveAmount) {
      // Cálculo basado en Monto a Recibir
      amountSendCalc = parsedAmount / rate;
      commissionRate = calculateCommissionRate(amountSendCalc, key);

      const commissionAndTaxRate = commissionRate * (1 + taxRate);
      amountSendCalc = parsedAmount / (rate * (1 - commissionAndTaxRate));

      if (amountSendCalc < 100) {
        setCommission(0);
        setCommissionRateDisplay(0);
        setTax(0);
        setTotalToSend(0);
        setExchangeRate(rate.toFixed(2));
        setErrorMessage("El monto mínimo es 100");
        return;
      } else {
        setErrorMessage("");
      }

      commissionRate = calculateCommissionRate(amountSendCalc, key);
      setCommissionRateDisplay((commissionRate * 100).toFixed(2) + "%");

      const commissionAmount = amountSendCalc * commissionRate;
      const taxAmount = commissionAmount * taxRate;
      const totalToSendCalc = amountSendCalc - commissionAmount - taxAmount;

      setCommission(commissionAmount.toFixed(2));
      setTax(taxAmount.toFixed(2));
      setTotalToSend(totalToSendCalc.toFixed(2));
      setExchangeRate(rate.toFixed(3));
      setAmountSend(amountSendCalc.toFixed(2));
    } else {
      // Cálculo basado en Monto a Enviar
      if (parsedAmount < 100) {
        setCommission(0);
        setCommissionRateDisplay(0);
        setTax(0);
        setTotalToSend(0);
        setExchangeRate(rate.toFixed(2));
        setErrorMessage("El monto mínimo es 100");
        return;
      } else {
        setErrorMessage("");
      }

      commissionRate = calculateCommissionRate(parsedAmount, key);
      setCommissionRateDisplay((commissionRate * 100).toFixed(2) + "%");

      const commissionAmount = parsedAmount * commissionRate;
      const taxAmount = commissionAmount * taxRate;
      const total = parsedAmount - commissionAmount - taxAmount;
      const received = total * rate;

      setCommission(commissionAmount.toFixed(2));
      setTax(taxAmount.toFixed(2));
      setTotalToSend(total.toFixed(2));
      setExchangeRate(rate.toFixed(3));
      setAmountReceive(received.toFixed(2));
    }
  };

  const resetCalculations = () => {
    setCommission(0);
    setCommissionRateDisplay(0);
    setTax(0);
    setTotalToSend(0);
    setExchangeRate(0);
    setErrorMessage("");
  };

  // ---------------------------------------------------------------------------
  //  REACCIONES A CAMBIOS DE ESTADO
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (editingReceiveAmount) {
      if (amountReceive !== "" && !isNaN(parseFloat(amountReceive))) {
        calculate(amountReceive, true);
      } else {
        resetCalculations();
        setAmountSend("");
      }
    } else {
      if (amountSend !== "" && !isNaN(parseFloat(amountSend))) {
        calculate(amountSend);
      } else {
        resetCalculations();
        setAmountReceive("");
      }
    }
    // Se agrega commissionRates a las dependencias para recalcular
  }, [
    amountSend,
    amountReceive,
    fromCurrency,
    toCurrency,
    editingReceiveAmount,
    exchangeRates,
    commissionRates,
  ]);

  // ---------------------------------------------------------------------------
  //  HANDLERS
  // ---------------------------------------------------------------------------
  const handleAmountChange = (e) => {
    setAmountSend(e.target.value);
    setEditingReceiveAmount(false);
  };

  const handleAmountReceiveChange = (e) => {
    setAmountReceive(e.target.value);
    setEditingReceiveAmount(true);
  };

  const handleFromCurrencyChange = (newValue) => {
    const newFromCurrency = newValue.value;
    setFromCurrency(newFromCurrency);

    const newToCurrencies = currencyOptions[newFromCurrency];
    if (!newToCurrencies.includes(toCurrency)) {
      setToCurrency(newToCurrencies[0]);
    }
  };

  const handleToCurrencyChange = (newValue) => {
    setToCurrency(newValue.value);
  };

  const getAvailableToCurrencies = () => {
    return currencyOptions[fromCurrency] || [];
  };

  // ---------------------------------------------------------------------------
  //  RENDER
  // ---------------------------------------------------------------------------
  return (
    <div className="calculator-container m-3 text-center">
      <h5>{t.calculadora.Titulo}</h5>

      {/* EJEMPLO: Podrías mostrar tu Logo si lo deseas */}
      {/* <Image
        src={Logo}
        style={{ paddingBottom: "20px", width: "70px" }}
        alt="Logo principal"
      /> */}

      {/* Selección y monto - DESDE */}
      <CurrencyRow
        label={t.calculadora.EnviarP}
        amount={amountSend}
        onAmountChange={handleAmountChange}
        selectedCurrency={fromCurrency}
        onCurrencyChange={handleFromCurrencyChange}
        allCurrencies={currencies}
        allowedCurrencyKeys={Object.keys(currencyOptions)} // ["PEN", "USD", "BRL"]
      />

      {errorMessage && (
        <div className="error-message text-danger">{errorMessage}</div>
      )}

      {/* Detalle de comisiones, impuestos, total, tipo de cambio */}
      <CommissionDetails
        commissionRateDisplay={commissionRateDisplay}
        commission={commission}
        tax={tax}
        totalToSend={totalToSend}
        exchangeRate={exchangeRate}
        t={t}
      />

      {/* Selección y monto - RECIBE */}
      <div style={{ color: "#066ac9", fontSize: "20px", paddingBottom: "10px" }}>
        {t.calculadora.Recibe}
      </div>
      <CurrencyRow
        label={t.calculadora.RecibirP}
        amount={amountReceive}
        onAmountChange={handleAmountReceiveChange}
        selectedCurrency={toCurrency}
        onCurrencyChange={handleToCurrencyChange}
        allCurrencies={currencies}
        allowedCurrencyKeys={getAvailableToCurrencies()}
      />

      {/* Checkbox de Términos y Condiciones */}
      <TermsAndConditions
        acceptedTerms={acceptedTerms}
        setAcceptedTerms={setAcceptedTerms}
        t={t}
      />

      {/* Botón de Enviar (WhatsApp) */}
      <SendButton
        t={t}
        errorMessage={errorMessage}
        acceptedTerms={acceptedTerms}
        amountSend={amountSend}
        amountReceive={amountReceive}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        currencies={currencies}
        exchangeRate={exchangeRate}
        commission={commission}
        tax={tax}
        totalToSend={totalToSend}
      />
    </div>
  );
};

export default Calculator;
