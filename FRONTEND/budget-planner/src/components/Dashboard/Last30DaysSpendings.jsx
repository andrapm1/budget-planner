import React, { useState, useEffect } from 'react';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareSpendingBarChartData } from '../../helpers/help';

const Last30DaysSpendings = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareSpendingBarChartData(data);
    setChartData(result);

    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Cheltuieli in ultimele 30 zile</h5>
      </div>
      <CustomBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysSpendings;
