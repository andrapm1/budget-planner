import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../helpers/axiosInstance';
import { API_PATHS } from '../../helpers/APIpaths';
import InfoCard from '../../components/Cards/InfoCard';
import { IoMdCard } from 'react-icons/io';
import { addThousandSeparator } from '../../helpers/help';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import SpendingTransactions from '../../components/Dashboard/SpendingTransactions';
import Last30DaysSpendings from '../../components/Dashboard/Last30DaysSpendings';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import BudgetAlert from '../../components/Dashboard/BudgetAlert';

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response?.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log('Ceva nu a functionat. Te rugam sa incerci din nou.', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      
      <div className="mt-10">
  <BudgetAlert
    budgetAlert={dashboardData?.budgetAlert}
    onBudgetUpdated={fetchDashboardData}
  />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <InfoCard
            icon={<IoMdCard />}
            label="Balanta totala"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-yellow-500"
          />

          <InfoCard
            icon={<IoMdCard />}
            label="Incasari totale"
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-green-500"
          />

          <InfoCard
            icon={<IoMdCard />}
            label="Cheltuieli totale"
            value={addThousandSeparator(dashboardData?.totalSpendings || 0)}
            color="bg-red-600"
          />
        </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

  <RecentTransactions
    transactions={dashboardData?.recentTransactions}
    onSeeMore={() => navigate('/spending')}
  />

  <FinanceOverview
    totalBalance={dashboardData?.totalBalance || 0}
    totalIncome={dashboardData?.totalIncome || 0}
    totalSpendings={dashboardData?.totalSpendings || 0}
  />

  <SpendingTransactions
  transactions={dashboardData?.last30DaysSpendings?.transactions || []}
  onSeeMore={() => navigate('/spending')}
/>

  <Last30DaysSpendings
    data={dashboardData?.last30DaysSpendings?.transactions || []}
  />

   <RecentIncomeWithChart
    data={dashboardData?.last30DaysIncome?.transactions?.slice(0, 4) || []}
    totalIncome={dashboardData?.last30DaysIncome?.total || 0}
  />

  <RecentIncome 
  transactions={dashboardData?.last30DaysIncome?.transactions || []}
  onSeeMore={() => navigate('/income')}
  />

</div>
  </div>
    </DashboardLayout>
  );
};

export default Home;