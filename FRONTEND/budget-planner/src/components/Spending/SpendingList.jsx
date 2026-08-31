import React from 'react'
import { LuDownload } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const SpendingList = ({ transactions, onDelete, onDownload }) => {
  return (
        <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Toate cheltuielile</h5>

        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((spending) => (
          <TransactionInfoCard
            key={spending._id}
            title={spending.category}
            icon={spending.icon}
            date={moment(spending.date).format("Do MMM YYYY")}
            amount={spending.amount}
            type="cheltuiala"
            onDelete={() => onDelete(spending._id)}
          />
        ))}
      </div>
    </div>
    
  )
}

export default SpendingList
