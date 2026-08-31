import React from 'react';
import poza1 from '../../assets/images/poza1.png';

const AuthLayout = ({children}) => {
  return (
    <div className="flex">
        <div className="w-screen h-screen md:w-[60vw] px-14 pt-9 pb-13">
            <h2 className="text-3xl font-bold mb-8">Budget Planner</h2>
            {children}
        </div>

        <div className="hidden md:block w-[40vw] h-screen bg-auth-bg-img bg-cover bn-no-repeat bg-center overflow hidden p-9 relative ">
            <div className="w-48 h-48 rounded-[40px] bg-orange-600 absolute -top-7 -right rotate-[15deg] opacity-20"></div>
            <div className="w-48 h-56 rounded-[40px] border-[20px] border-orange-600 absolute top-[20%] -right-10 rotate-[30deg] opacity-15"></div>
            <div className="w-48 h-48 rounded-[40px] bg-orange-500 absolute -bottom-7 -left rotate-[19deg] opacity-30"></div>
                
            <img src={poza1}
            className="w-65 lg:w-[90%]  absolute bottom-40 right-10 shadow-lg shadow-orange-300 w-[50%] h-auto" 
            />
            
        </div>

        <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-orange-400 opacity-50 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500 opacity-50 rounded-full blur-[80px]"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-orange-300 opacity-50 rounded-full blur-[80px]"></div>
        </div>

        <div className="absolute top-20 right-30 bg-white p-8 rounded-lg shadow-lg flex items-center space-x-6">
            <div className="text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21V3m12 7l-3 3m0 0l-3-3m3 3V3" />
                </svg>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-800">Gestionează-ți bugetul și cheltuielile</h3>
                <h2 className="text-sm text-gray-600">Planifică-ți viitorul financiar cu ușurință</h2>
            </div>
        </div>

    </div>
  );
};

export default AuthLayout;