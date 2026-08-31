import React, { useState } from 'react';
import axiosInstance from '../../helpers/axiosInstance';
import { API_PATHS } from '../../helpers/APIpaths';
import toast from 'react-hot-toast';

const BudgetAlert = ({ budgetAlert, onBudgetUpdated }) => {
  const [budgetInput, setBudgetInput] = useState(budgetAlert?.monthlyBudget || '');
  const [saving, setSaving] = useState(false);

  const handleSaveBudget = async () => {
    if (!budgetInput || Number(budgetInput) < 0) {
      toast.error("Introdu o valoare valida pentru buget");
      return;
    }

    setSaving(true);
    try {
      await axiosInstance.put(API_PATHS.AUTH.UPDATE_BUDGET, { monthlyBudget: Number(budgetInput) });
      toast.success("Bugetul a fost actualizat");
      onBudgetUpdated();
    } catch (error) {
      toast.error("Eroare la actualizarea bugetului");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h5 className="text-lg">Buget lunar</h5>
          {budgetAlert?.monthlyBudget > 0 ? (
            <p className={`text-sm mt-1 ${budgetAlert.exceeded ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
              {budgetAlert.exceeded
                ? `Ai depasit bugetul! Cheltuit in ultimele 30 de zile: $${budgetAlert.spentLast30Days} din $${budgetAlert.monthlyBudget}`
                : `Cheltuit in ultimele 30 de zile: $${budgetAlert.spentLast30Days} din $${budgetAlert.monthlyBudget}`}
            </p>
          ) : (
            <p className="text-sm text-gray-500 mt-1">Nu ai setat inca un buget lunar</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            placeholder="Ex: 1500"
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-32"
          />
          <button
            type="button"
            className="add-btn add-btn-fill"
            onClick={handleSaveBudget}
            disabled={saving}
          >
            Salveaza
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetAlert;