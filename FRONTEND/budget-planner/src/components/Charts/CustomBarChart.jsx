import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const CustomBarChart = ({ data = [] }) => {
  const getBarColor = (index) => {
    const colors = ['#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];
    return colors[index % colors.length];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { value } = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="text-lg font-bold text-gray-900">
            Suma: <span className="text-green-600">${Number(value).toFixed(2)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="bg-white mt-6 p-6 text-center text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="bg-white mt-6 p-4 rounded shadow">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="square"
          />
          <Bar
            dataKey="amount"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: '#FFD700' }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
