import React, { useState } from 'react'
import Input from "../Inputs/Input"; 
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = useState({
        source: '',
        amount: '',
        date: '',
        icon: ''
    });

    const handleChange = (key, value) => setIncome({...income, [key]: value});
  return (
    <div>

        <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
        />
        
        <Input
        value={income.source}
        onChange={({ target }) => handleChange('source', target.value)}
        label="Sursa venitului"
        placeholder="Ex: Salariu, Freelance, Investitii"
        type="text"
        />
        <Input
        value={income.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label="Suma"
        placeholder="Ex: 1000"
        type="number"
        />
        <Input
        value={income.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label="Data"
        placeholder="Ex: 2023-08-15"
        type="date"
        />

        <div className="flex justify-end mt-4">
            <button
            type="button"
            className="add-btn add-btn-fill"
            onClick={() => onAddIncome(income)}
            >
                Adauga venit
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm
