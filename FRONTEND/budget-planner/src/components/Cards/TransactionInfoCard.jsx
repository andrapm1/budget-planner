import React from "react";
import {
LuUtensils,
LuTrendingUp,
LuTrendingDown,
LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
    title,
    icon,
    date,
    amount,
    type,
    hideDeleteBtn,
    onDelete,
}) => {
    return (
        <div className="group relative flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center text-xl text-white bg-gray-400 rounded-full">
                    {icon ? (
                        <img src={icon} alt={title} className="w-6 h-6" />
                    ) : (
                        <LuUtensils />
                    )}
                </div>
                <div>
                    <p className="text-sm text-gray-600">{title}</p>
                    <p className="text-xs text-gray-400">{date}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <p className={`font-semibold ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {type === 'income' ? '+' : '-'} ${amount}
                </p>
                {!hideDeleteBtn && onDelete && (
                    <button className="text-gray-500 hover:text-gray-800" onClick={onDelete}>
                        <LuTrash2 size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default TransactionInfoCard;