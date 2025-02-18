// components/calculator/SendButton.jsx

import React from "react";

const SendButton = ({
  t,
  errorMessage,
  acceptedTerms,
  amountSend,
  amountReceive,
  fromCurrency,
  toCurrency,
  currencies,
  exchangeRate,
  commission,
  tax,
  totalToSend,
}) => {
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

    const message = `${t.calculadora["Excelente, su cotización Brasper para su envío de hoy es la siguiente:"]}\n *${t.calculadora["Monto a Enviar"]}: ${amountSend} ${fromCurrency}*\n ${t.calculadora["Tipo de Cambio"]}: ${exchangeRate}\n ${t.calculadora["Comisión"]} ${t.calculadora["Descuento"]}: ${commission} ${fromCurrency}\n ${t.calculadora["Impuestos"]}: ${tax} ${fromCurrency}\n ${t.calculadora["Neto a convertir"]}: ${totalToSend} ${fromCurrency}\n *${t.calculadora["Total a Recibir"]}: ${amountReceive} ${toCurrency}*\n\n *${t.calculadora["Resumen:"]}* ${t.calculadora["Para su envío de"]} *${amountSend} ${fromCurrency}* ${t.calculadora[", recibirá directo en su cuenta de destino"]} *${amountReceive} ${toCurrency}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <button className="theme-btn" onClick={handleSendWhatsAppMessage}>
      {t.calculadora.Enviar}
    </button>
  );
};

export default SendButton;
