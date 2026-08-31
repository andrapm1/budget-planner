import React from 'react'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';

const CustomLineChart = ({ data }) => {

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className="text-xs font-semibold text-orange-800 mb-1">{payload[0].payload.category}</p>
                    <p className="text-sm">
                    Amount: <span className="text-sm font-medium text-gray-800">${payload[0].payload.amount}</span>
                    </p>
                </div>
            );
        }

  return null;
};

return <div className="bg-white">
    <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
        <defs>
            <linearGradient id="incomeGraduent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
            </linearGradient>
        </defs>

        <CartesianGrid stroke="none" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} stroke="none" />
        <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} stroke="none" />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="amount" stroke="#F97316" fill="url(#incomeGradient)" strokeWidth={2} dot={{ r: 3, fill: '#F97316' }} />
        </AreaChart>
    </ResponsiveContainer>
</div>
};

export default CustomLineChart
