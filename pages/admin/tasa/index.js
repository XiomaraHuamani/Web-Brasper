'use client';
import { useState, useEffect } from "react";
import Layout from "../layout";
import axios from "axios";

const API_URL = "https://pro.brasper.site/api/v1/coin/exchange-rates/";

// Mapeo de los IDs de las monedas a sus nombres
const currencyMap = {
  1: "PEN",
  2: "BRL",
  3: "USD"
};

const Tasa = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [editedRates, setEditedRates] = useState({});
  const [cachedRates, setCachedRates] = useState({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(API_URL);
        setExchangeRates(response.data);
        setCachedRates(response.data.reduce((acc, rate) => {
          const key = `${rate.base_currency}-${rate.target_currency}`;
          acc[key] = rate.rate;
          return acc;
        }, {}));
      } catch (error) {
        console.error("Error al obtener las tasas de cambio:", error);
      }
    };
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setExchangeRates((prevRates) =>
        prevRates.map((rate) => ({
          ...rate,
          rate: cachedRates[`${rate.base_currency}-${rate.target_currency}`] || rate.rate,
        }))
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [cachedRates]);

  const handleSaveRate = async (rate) => {
    const key = `${rate.base_currency}-${rate.target_currency}`;
    const updatedRate = editedRates[key] || rate.rate;

    try {
      await axios.put(`${API_URL}${rate.id}/`, {
        base_currency: rate.base_currency,
        target_currency: rate.target_currency,
        rate: updatedRate,
      });
      setCachedRates((prev) => ({
        ...prev,
        [key]: updatedRate,
      }));
      console.log("Tasa de cambio guardada correctamente.");
    } catch (error) {
      console.error("Error al guardar la tasa de cambio:", error);
    }
  };

  const handleInputChange = (key, value) => {
    setEditedRates({
      ...editedRates,
      [key]: parseFloat(value),
    });
  };

  const handleAddRate = async () => {
    const base_currency = prompt("Ingrese el ID de la moneda base (ejemplo: '1' para PEN)");
    const target_currency = prompt("Ingrese el ID de la moneda objetivo (ejemplo: '3' para USD)");
    const newRate = prompt("Ingrese el valor de la tasa (por ejemplo: '3.5')");

    if (base_currency && target_currency && newRate) {
      try {
        await axios.post(API_URL, {
          base_currency: parseInt(base_currency),
          target_currency: parseInt(target_currency),
          rate: parseFloat(newRate),
        });
        console.log("Nueva tasa de cambio creada correctamente.");
        setCachedRates((prev) => ({
          ...prev,
          [`${base_currency}-${target_currency}`]: parseFloat(newRate),
        }));
      } catch (error) {
        console.error("Error al agregar la nueva tasa de cambio:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center vh-90">
        <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
          <h2 className="text-center mb-4">Tasas de Cambio</h2>
          <form>
            {exchangeRates.map((rate) => {
              const key = `${rate.base_currency}-${rate.target_currency}`;
              const baseCurrencyName = currencyMap[rate.base_currency];
              const targetCurrencyName = currencyMap[rate.target_currency];
              return (
                <div key={key} className="row mb-3 align-items-center">
                  <label htmlFor={key} className="col-sm-4 col-form-label">
                    {baseCurrencyName}-{targetCurrencyName}
                  </label>
                  <div className="col-sm-5">
                    <input
                      type="number"
                      className="form-control"
                      value={editedRates[key] !== undefined ? editedRates[key] : rate.rate}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      step="0.0001"
                    />
                  </div>
                  <div className="col-sm-3 text-end">
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      style={{ width: "100%" }}
                      onClick={() => handleSaveRate(rate)}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="text-center mt-4">
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={handleAddRate}
              >
                Agregar nueva tasa
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Tasa;
