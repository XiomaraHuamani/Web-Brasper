import React, { useState, useEffect } from "react";
import Select from "react-select";
// Eliminamos la importación de commissionRates
import { useLocale } from "@/context/LocaleContext";
import Image from "next/image";
import Logo from '../../../public/assets/images/logos/logo_principal.png';

const Calculator = () => {
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
  const [cachedRates, setCachedRates] = useState({});
  const [commissionRates, setCommissionRates] = useState({}); // Agregamos este estado
  const { t } = useLocale();

  // Función para obtener las tasas de cambio
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

  // Función para obtener las tasas de comisión
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

      // Ordenar los rangos por monto mínimo
      for (const key in formattedCommissionRates) {
        formattedCommissionRates[key].sort((a, b) => a.min - b.min);
      }

      setCommissionRates(formattedCommissionRates);
    } catch (error) {
      console.error("Error al obtener las tasas de comisión:", error);
    }
  };

  // Cargar datos inicialmente
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

  const currencyOptions = {
    PEN: ["BRL"],
    USD: ["BRL"],
    BRL: ["PEN", "USD"],
  };

  const currencyOptionsSelect = currencies.map((currency) => ({
    value: currency.code,
    label: currency.code,
    image: currency.image,
  }));

  const CustomOption = (props) => {
    const { innerProps, innerRef, data } = props;
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

  const CustomSingleValue = (props) => {
    const { innerProps, data } = props;
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

  const calculateCommissionRate = (amount, currencyPair) => {
    const rates = commissionRates[currencyPair];
    if (!rates) {
      return 0.03; // Tasa de comisión por defecto si no se encuentra
    }
    for (let i = 0; i < rates.length; i++) {
      const { min, max, rate } = rates[i];
      if (amount >= min && amount <= max) {
        return rate;
      }
    }
    // Si el monto supera todos los rangos, usamos la última tasa
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
    if (isNaN(parsedAmount)) {
      return;
    }

    const taxRate = 0.18;
    let commissionRate;
    let amountSendCalc;

    if (isReceiveAmount) {
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
  }, [
    amountSend,
    amountReceive,
    fromCurrency,
    toCurrency,
    editingReceiveAmount,
    exchangeRates,
    commissionRates, // Agregamos commissionRates a las dependencias
  ]);

  const handleAmountChange = (e) => {
    const amount = e.target.value;
    setAmountSend(amount);
    setEditingReceiveAmount(false);
  };

  const handleAmountReceiveChange = (e) => {
    const amount = e.target.value;
    setAmountReceive(amount);
    setEditingReceiveAmount(true);
  };

  const handleFromCurrencyChange = (selectedOption) => {
    const newFromCurrency = selectedOption.value;
    setFromCurrency(newFromCurrency);
    const newToCurrencies = currencyOptions[newFromCurrency];
    if (!newToCurrencies.includes(toCurrency)) {
      setToCurrency(newToCurrencies[0]);
    }
  };

  const handleToCurrencyChange = (selectedOption) => {
    setToCurrency(selectedOption.value);
  };

  const getAvailableToCurrencies = () => {
    return currencyOptions[fromCurrency] || [];
  };

  const handleSendWhatsAppMessage = () => {
    if (!acceptedTerms) {
      alert(t.calculadora["Debe aceptar la Política de Privacidad"]);
      return;
    }

    if (
      amountSend === "" ||
      amountReceive === "" ||
      isNaN(parseFloat(amountSend)) ||
      isNaN(parseFloat(amountReceive))
    ) {
      alert(t.calculadora["Ingrese los montos"]);
      return;
    }

    if (errorMessage) {
      alert(t.calculadora["Corrija los errores"]);
      return;
    }

    const phoneNumber = "51966991933";

    const fromCurrencyName = currencies.find(
      (currency) => currency.code === fromCurrency
    ).name;
    const toCurrencyName = currencies.find(
      (currency) => currency.code === toCurrency
    ).name;

    const message = `${t.calculadora["Excelente, su cotización Brasper para su envío de hoy es la siguiente:"]}\n\n*${t.calculadora["Monto a Enviar"]}: ${amountSend} ${fromCurrency}*\n${t.calculadora["Tipo de Cambio"]}: ${exchangeRate}\n${t.calculadora["Comisión"]}: ${commission} ${fromCurrency}\n${t.calculadora["Impuestos"]}: ${tax} ${fromCurrency}\n${t.calculadora["Neto a convertir"]}: ${totalToSend} ${fromCurrency}\n*${t.calculadora["Total a Recibir"]}: ${amountReceive} ${toCurrency}*\n\n*${t.calculadora["Resumen:"]}*  ${t.calculadora["Para su envío de"]}  *${amountSend} ${fromCurrency}* ${t.calculadora[", recibirá directo en su cuenta de destino"]} *${amountReceive} ${toCurrency}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="calculator-container m-3 text-center">
      <h5 >{t.calculadora.Titulo}</h5>
      {/* <Image
          src={Logo}
          style={{  
            paddingBottom: "20px",
            width: "70px",
          }}
      /> */}
      <div className="currency-inputs r pb-4 pt-2">
       
        <div className="currency-row pb-2">
          {/* Selector de moneda "Desde" */}
          <Select
            value={currencyOptionsSelect.find(
              (option) => option.value === fromCurrency
            )}
            onChange={handleFromCurrencyChange}
            options={currencyOptionsSelect.filter((option) =>
              Object.keys(currencyOptions).includes(option.value)
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
              }),
              control: (base) => ({ ...base, minHeight: "45px" }),
              valueContainer: (base) => ({
                ...base,
                display: "flex",
                alignItems: "center",
              }),
            }}
          />
          {/* Entrada del monto a enviar */}
          <input
            type="number"
            className="currency-input"
            placeholder={t.calculadora.EnviarP}
            value={amountSend}
            onChange={handleAmountChange}
            min="100"
            style={{ backgroundColor: "transparent" }}
          />
        </div>

        {/* Muestra mensaje de error si aplica */}
        {errorMessage && (
          <div className="error-message text-danger">{errorMessage}</div>
        )}

        {/* Mostrar los cálculos resultantes */}
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

        <a
          style={{
            color: "#066ac9",
            fontSize: "20px",
            paddingBottom: "50px",
          }}
        >
          {t.calculadora.Recibe}
        </a>
        <div className="currency-row">
          <Select
            value={currencyOptionsSelect.find(
              (option) => option.value === toCurrency
            )}
            onChange={handleToCurrencyChange}
            options={currencyOptionsSelect.filter((option) =>
              getAvailableToCurrencies().includes(option.value)
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
              }),
              control: (base) => ({ ...base, minHeight: "45px" }),
              valueContainer: (base) => ({
                ...base,
                display: "flex",
                alignItems: "center",
              }),
            }}
          />
          {/* Entrada del monto a recibir */}
          <input
            type="number"
            className="currency-input"
            placeholder={t.calculadora.RecibirP}
            value={amountReceive}
            onChange={handleAmountReceiveChange}
            min="100"
            style={{
              backgroundColor: "transparent",
            }}
          />
        </div>
      </div>

      {/* Términos y Condiciones */}
      <div className="terms-container" style={{ margin: "20px 0" }}>
        <input
          type="checkbox"
          id="acceptTerms"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          style={{ marginRight: "8px" }}
        />
        <label htmlFor="acceptTerms">
          {t.calculadora.Acepto}
          <a href="/terminos-y-condiciones" target="_blank">
            {t.calculadora.Términos}
          </a>
        </label>
      </div>

      {/* Botón de envío */}
      <button className="theme-btn" onClick={handleSendWhatsAppMessage}>
        {t.calculadora.Enviar}
      </button>
    </div>
  );
};

export default Calculator;
