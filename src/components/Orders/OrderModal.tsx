import React from "react";
import OrderDetails from "./OrderDetails";

interface OrderModalProps {
  showDetails: boolean;
  toggleModal: (status: boolean) => void;
  order: any;
}

const OrderModal: React.FC<OrderModalProps> = ({ showDetails, toggleModal, order }) => {
  if (!showDetails) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-[580px] rounded-2xl bg-white dark:bg-[#111827] border border-gray-3/60 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
        <button
          onClick={() => toggleModal(false)}
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 text-dark-4 dark:text-slate-400 hover:text-dark dark:hover:text-white p-1 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <OrderDetails orderItem={order} />
      </div>
    </div>
  );
};

export default OrderModal;
