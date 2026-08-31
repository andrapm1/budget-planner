import React from 'react';
import CustomPiechart from '../Charts/CustomPieChart';

const COLORS = ['#f59e0b', '#22c55e', '#ef4444'];

const FinanceOverview = ({ totalBalance, totalIncome, totalSpendings }) => {
    const balanceData = [
        { name: 'Balanta totala', amount: totalBalance },
        { name: 'Incasari totale', amount: totalIncome },
        { name: 'Cheltuieli totale', amount: totalSpendings },
    ];

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Financial Overview</h5>
            </div>

            <CustomPiechart
                data={balanceData}
                label="Total Balance"
                totalAmount={`$${totalBalance}`}
                colors={COLORS}
                showTextAnchor
            />

            <div className="mt-6 flex flex-wrap gap-6 justify-center items-center">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[0] }}></div>
                    <span className="text-sm text-gray-700">Balanta totala: <span className="font-semibold">${totalBalance}</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[1] }}></div>
                    <span className="text-sm text-gray-700">Incasari totale: <span className="font-semibold">${totalIncome}</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[2] }}></div>
                    <span className="text-sm text-gray-700">Cheltuieli totale: <span className="font-semibold">${totalSpendings}</span></span>
                </div>
            </div>
        </div>
    );
};

export default FinanceOverview;