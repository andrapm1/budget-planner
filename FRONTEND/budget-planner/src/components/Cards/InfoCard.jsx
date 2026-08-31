import React from 'react';

const InfoCard = ({ icon, label, value, color }) => {
    return (
        <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-300/50 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-1xl`}>
                {icon}
            </div>
            <div className="flex-1">
                <h6 className="text-base font-semibold text-gray-700 mb-2">{label}</h6>
                <span className="text-2xl font-bold text-gray-900">{value}</span>
            </div>
        </div>
    );
};

export default InfoCard;