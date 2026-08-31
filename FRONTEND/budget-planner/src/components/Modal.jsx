import React from 'react'

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;
  
  return <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/50 dark:bg-gray-900/50">
    <div className="relative p4 w-full max-w-2xl max-h-full mx-auto">
      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h3>

          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            
            <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6m-6-6h.01M13 1v12M1 1v12"
              />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="p-4 md:p-5 space-y-4">
          {children}
        </div>
      </div>
    </div>
  </div>
};

export default Modal
