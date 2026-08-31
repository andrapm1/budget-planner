import React, { useState, useEffect } from 'react'
import { LuPlus } from "react-icons/lu";
import { prepareSpendingLineChartData } from '../../helpers/help';
import CustomLineChart from '../Charts/CustomLineChart';

const SpendingOverview = ({ transactions, onSpendingIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareSpendingLineChartData(transactions);
        setChartData(result);

        return () => {};
    }, [transactions]);
  return <div className="card">
    <div className="flex items-center justify-between">
        <div className="">
        <h5 className="text-lg">Cheltuieli</h5>
            <p className="text-xs text-gray-500 mt-0.5">Vizualizeaza cheltuielile tale in timp real</p>
        </div>

    <button className="add-btn" onClick={onSpendingIncome}>
        <LuPlus className="text-lg" />
        <span className="">Adauga cheltuiala</span>
    </button>
    </div>
    <div className="mt-10">
        <CustomLineChart data={chartData} />

        </div>
    </div>
  
}

export default SpendingOverview
