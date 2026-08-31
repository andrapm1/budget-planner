import React from 'react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg">
        <p className="mb-1 text-sm font-semibold text-gray-800">{name}</p>
        <p className="text-sm text-gray-600">
          Amount: <span className="font-bold text-gray-900">${Number(value).toFixed(2)}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
