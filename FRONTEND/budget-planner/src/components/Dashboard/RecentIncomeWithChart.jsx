import React, { useEffect, useState } from 'react'
import CustomPiechart from '../Charts/CustomPieChart';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

const RecentIncomeWithChart = ({ data, totalIncome }) => {

const [chartData, setChartData] = useState( []);

const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
        name: item?.source,
        amount: item?.amount,
}));

    setChartData(dataArr);
};

useEffect(() => {
prepareChartData();

return () => 0;
}, [data]);


  return (
    <div className="card">
     <div className="flex items-center justify-between">
    <h5 className="text-lg">Venituri din ultimele 30 de zile</h5>
    </div>

        <CustomPiechart
            data={chartData}
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            showTextAnchor
            colors={COLORS}
        />  

    </div>
  )
}

export default RecentIncomeWithChart
