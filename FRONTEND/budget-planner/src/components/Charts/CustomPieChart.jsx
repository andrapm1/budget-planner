import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPiechart = ({
    data,
    label,
    totalAmount,
    colors,
    showTextAnchor = false,
}) => {
    const palette = Array.isArray(colors) ? colors : Object.values(colors || {});
    const chartData = (data || []).map((entry) => ({
        ...entry,
        amount: Math.abs(Number(entry.amount)) || 0,
    }));
    const hasValues = chartData.some((entry) => entry.amount > 0);
    const renderData = hasValues
        ? chartData
        : [{ name: "No data", amount: 1, isPlaceholder: true }];

    return (
        <ResponsiveContainer width="100%" height={380} minWidth={0}>
            <PieChart>
                <Pie
                    data={renderData}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {renderData.map((entry, index) => (
                        <Cell
                            key={`${entry.name}-${index}`}
                            fill={entry.isPlaceholder
                                ? "#20ca64"
                                : palette[index % palette.length] || "#d1d5db"}
                        />
                    ))}
                </Pie>
                <Tooltip content={CustomTooltip} />

                {showTextAnchor && (
                    <>
                        <text
                            x="50%"
                            y="50%"
                            dy={-25}
                            textAnchor="middle"
                            fill="#666"
                            fontSize="16px"
                        >
                            {label}
                        </text>

                        <text
                            x="50%"
                            y="50%"
                            dy={8}
                            textAnchor="middle"
                            fill="#333"
                            fontSize="24px"
                            fontWeight="600"
                        >
                            {totalAmount}
                        </text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPiechart;