import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SpendingOverview from '../../components/Spending/SpendingOverview';
import axiosInstance from '../../helpers/axiosInstance';
import { API_PATHS } from '../../helpers/APIpaths';
import toast from 'react-hot-toast';
import AddSpendingForm from '../../components/Spending/AddSpendingForm';
import Modal from "../../components/Modal";
import SpendingList from '../../components/Spending/SpendingList';
import DeleteAlert from '../../components/DeleteAlert';


const Spending = () => {
  useUserAuth();

    const [spendingData, setSpendingData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    });
  
    const [openAddSpendingModal, setIsAddSpendingModalOpen] = useState(false);
  
  const fetchSpendingDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.SPENDINGS.GET_ALL_SPENDINGS}`);
      if (response?.data) {
        setSpendingData(response.data);
      }
    } catch (error) {
      console.log("Error fetching spending details:", error);
    } finally {
      setLoading(false);
    }
  };
   
  // handle add spending
  const handleAddSpending = async (spending) => {
    const { category, amount, date, icon } = spending;

    if (!category.trim()) {
      toast.error("Categoria cheltuielii este obligatorie");
      return;
    }

    if (!date) {
      toast.error("Data cheltuielii este obligatorie");
      return;
    }
     try {
      await axiosInstance.post(API_PATHS.SPENDINGS.ADD_SPENDINGS, { category, amount, date, icon });
      setIsAddSpendingModalOpen(false);
      toast.success("Cheltuiala a fost adaugata cu succes");
      fetchSpendingDetails();
    } catch (error) {
      console.error(
        "Eroare la adaugarea cheltuielii:",
        error.response?.data?.message || error.message
      );
     }
  };

  const deleteSpending = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.SPENDINGS.DELETE_SPENDINGS(id));
      setOpenDeleteAlert({ show: false, data: null }); 
      toast.success("Cheltuiala a fost stearsa cu succes");
      fetchSpendingDetails();
    } catch (error) {
      console.error(
        "Eroare la stergerea cheltuielii:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleDownloadSpendingDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SPENDINGS.DOWNLOAD_SPENDINGS, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'spending_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading spending details:", error);
      toast.error("A aparut o eroare la descarcarea detaliilor cheltuielilor");
    }
  };

  useEffect(() => {
    fetchSpendingDetails();
    return () => {};
  }, []);

  
  return (
    <DashboardLayout activeMenu="Spendings">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
            <SpendingOverview
              transactions={spendingData}
                onSpendingIncome={() => setIsAddSpendingModalOpen(true)}
            />

        <SpendingList
        transactions={spendingData}
        onDelete={(id) => {
          setOpenDeleteAlert({ show: true, data: id });
        }}
        onDownload={handleDownloadSpendingDetails}
        />

        </div>

      <Modal
      isOpen={openAddSpendingModal}
      onClose={() => setIsAddSpendingModalOpen(false)}
      title="Adauga tranzactie"
      >
        <AddSpendingForm onAddSpending={handleAddSpending} />
      </Modal>

      <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Sterge tranzactia"
        >
          <DeleteAlert
          content="Esti sigur ca vrei sa stergi aceasta tranzactie?"
          onDelete={() => deleteSpending(openDeleteAlert.data)}
          />
        </Modal>


      </div>
    </DashboardLayout>
  );
};

export default Spending;