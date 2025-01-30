// CommissionList.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CommissionList = ({
  items = [],
  setItems,
  apiUrl,
  baseCurrencyId,
  targetCurrencyId,
  reloadData,
}) => {
  const [loadingId, setLoadingId] = useState(null);

  // Manejar cambios en los inputs
  const handleInputChange = (id, field, newValue) => {
    // Elimina comas (si las hubiera) para asegurar que solo queden dígitos/decimales
    const sanitizedValue = newValue.replace(/,/g, '');
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: sanitizedValue } : item
      )
    );
  };

  // Guardar comisión y recargar datos
  const handleSaveCommission = async (item) => {
    setLoadingId(item.id || `new-${item.range}`);
    try {
      const commissionData = {
        base_currency: baseCurrencyId,
        target_currency: targetCurrencyId,
        commission_percentage:
          parseFloat(item.commission_percentage.toString().replace(/,/g, '')) || 0,
        reverse_commission:
          parseFloat(item.reverse_commission.toString().replace(/,/g, '')) || 0,
        range: item.range,
      };

      const rangeData = {
        min_amount: parseFloat(item.min_amount.toString().replace(/,/g, '')) || 0,
        max_amount: parseFloat(item.max_amount.toString().replace(/,/g, '')) || 0,
      };

      if (item.id) {
        // Actualizar registro existente
        await axios.put(`${apiUrl}${item.id}/`, {
          ...commissionData,
          range_details: rangeData,
        });
      } else {
        // Crear nuevo registro
        const response = await axios.post(apiUrl, {
          ...commissionData,
          range_details: rangeData,
        });
        // Actualizar el item con el nuevo ID asignado por el servidor
        const newId = response.data.id;
        setItems((prevItems) =>
          prevItems.map((commission) =>
            commission.range === item.range ? { ...commission, id: newId } : commission
          )
        );
      }

      console.log('Comisión guardada correctamente.');
      await reloadData();
    } catch (error) {
      console.error('Error al guardar la comisión:', error.response?.data || error.message);
    } finally {
      setLoadingId(null);
    }
  };

  // Función para agregar un nuevo rango
  const handleAddRange = () => {
    const nextRange = items.length > 0 ? Math.max(...items.map((item) => item.range)) + 1 : 1;
    setItems([
      ...items,
      {
        id: null,
        min_amount: '',
        max_amount: '',
        commission_percentage: '',
        reverse_commission: '',
        range: nextRange,
        range_id: null,
      },
    ]);
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-2xl font-bold mb-6">Comisiones</h3>
      
      {items
        .sort((a, b) => a.range - b.range)
        .map((item, index) => (
          <div
            key={item.id || `range-${item.range}-${index}`}
            className="flex flex-col md:flex-row items-center justify-center my-3 space-y-3 md:space-y-0 md:space-x-3"
          >
            {/* Min Amount */}
            <div className="w-full md:w-1/5">
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-400"
                value={item.min_amount}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  handleInputChange(item.id, 'min_amount', value);
                }}
                placeholder="Min Amount"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>

            {/* Max Amount */}
            <div className="w-full md:w-1/5">
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-400"
                value={item.max_amount}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  handleInputChange(item.id, 'max_amount', value);
                }}
                placeholder="Max Amount"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>

            {/* Comisión (%) */}
            <div className="w-full md:w-1/5">
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-400"
                value={item.commission_percentage}
                onChange={(e) =>
                  handleInputChange(item.id, 'commission_percentage', e.target.value)
                }
                placeholder="Comisión (%)"
                inputMode="decimal"
                pattern="[0-9]*[.]?[0-9]*"
                step="0.01"
                min="0"
              />
            </div>

            {/* Comisión inversa */}
            <div className="w-full md:w-1/5">
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-400"
                value={item.reverse_commission}
                onChange={(e) =>
                  handleInputChange(item.id, 'reverse_commission', e.target.value)
                }
                placeholder="Comisión inversa"
                inputMode="decimal"
                pattern="[0-9]*[.]?[0-9]*"
                step="0.0001"
                min="0"
              />
            </div>

            {/* Botón Guardar */}
            <div className="w-full md:w-1/5 flex justify-center">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded focus:outline-none disabled:opacity-50"
                onClick={() => handleSaveCommission(item)}
                disabled={loadingId === (item.id || `new-${item.range}`)}
              >
                {loadingId === (item.id || `new-${item.range}`) ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        ))
      }

      <div className="text-center mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
          onClick={handleAddRange}
        >
          Agregar nuevo rango
        </button>
      </div>
    </div>
  );
};

CommissionList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  setItems: PropTypes.func.isRequired,
  apiUrl: PropTypes.string.isRequired,
  baseCurrencyId: PropTypes.number.isRequired,
  targetCurrencyId: PropTypes.number.isRequired,
  reloadData: PropTypes.func.isRequired,
};

export default CommissionList;
