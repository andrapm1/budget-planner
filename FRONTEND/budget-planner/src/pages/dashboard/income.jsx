import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../helpers/axiosInstance";
import { API_PATHS } from "../../helpers/APIpaths";
import { useUserAuth } from "../../hooks/useUserAuth";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setIsAddIncomeModalOpen] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL);
      if (response?.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Error fetching income details:", error);
    } finally {
      setLoading(false);
    }
  };
   
  // handle add income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim () ) {
      toast.error("Sursa venitului este obligatorie");
      return;
    }

    if (!date) {
      toast.error("Data venitului este obligatorie");
      return;
    }
     try {
      await axiosInstance.post(API_PATHS.INCOME.ADD, { source, amount, date, icon });   
      setIsAddIncomeModalOpen(false);
      toast.success("Venitul a fost adaugat cu succes");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Eroare la adaugarea venitului:",
        error.response?.data?.message || error.message
      );
     }
  };


  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
     setOpenDeleteAlert({ show: false, data: null }); 
      toast.success("Venitul a fost sters cu succes");
     
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Eroare la stergerea venitului:",
        error.response?.data?.message || error.message
      );
    }
  };





  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Eroare la descarcarea detaliilor venitului:", error)
      toast.error("A aparut o eroare la descarcarea detaliilor venitului");
    }

  };

  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setIsAddIncomeModalOpen(true)}
            />
          </div>
        <IncomeList
        transactions={incomeData}
        onDelete={(id) => {
          setOpenDeleteAlert({ show:true, data: id });
        }}
        onDownload={handleDownloadIncomeDetails}
        />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setIsAddIncomeModalOpen(false)}
          title="Adauga venit"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Sterge venit"
        >
          <DeleteAlert
          content="Esti sigur ca vrei sa stergi acest venit?"
          onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>

      </div>
    </DashboardLayout>
  );
};

export default Income;