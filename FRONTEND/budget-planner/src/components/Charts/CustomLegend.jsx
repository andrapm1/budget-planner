import React from 'react';

const CustomLegend = ({ payload = [] }) => {
  if (!payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="mr-2 h-4 w-4 rounded"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium text-gray-700">{entry.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
