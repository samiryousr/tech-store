import React from "react";

const OrderDetails = ({ orderItem }: any) => {
  if (!orderItem) return null;

  return (
    <div className="w-full text-left">
      <div className="border-b border-gray-3/60 dark:border-slate-800 pb-4 mb-5">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-xl font-bold text-dark dark:text-white">
            Order Details
          </h3>
          <span
            className={`inline-block text-xs font-semibold py-1 px-3 rounded-full capitalize ${
              orderItem.status === "delivered"
                ? "text-green bg-green/10 dark:bg-green/20"
                : orderItem.status === "on-hold"
                ? "text-red bg-red/10 dark:bg-red/20"
                : orderItem.status === "processing"
                ? "text-yellow bg-yellow/10 dark:bg-yellow/20"
                : "text-dark-4 bg-gray-2 dark:bg-slate-800"
            }`}
          >
            {orderItem.status}
          </span>
        </div>
        <p className="text-xs text-dark-4 dark:text-slate-400">
          Order ID: <span className="font-mono text-dark dark:text-slate-300 font-medium">#{orderItem.orderId}</span>
        </p>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-center py-2 border-b border-gray-2 dark:border-slate-800/60">
          <span className="text-dark-4 dark:text-slate-400">Date Placed</span>
          <span className="font-medium text-dark dark:text-white">{orderItem.createdAt}</span>
        </div>

        <div className="py-2 border-b border-gray-2 dark:border-slate-800/60">
          <span className="block text-dark-4 dark:text-slate-400 mb-1">Items</span>
          <span className="font-medium text-dark dark:text-white leading-relaxed">
            {orderItem.title}
          </span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-2 dark:border-slate-800/60">
          <span className="text-dark-4 dark:text-slate-400">Total Amount</span>
          <span className="font-bold text-base text-blue dark:text-blue-light">{orderItem.total}</span>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-gray-1 dark:bg-slate-800/50 border border-gray-3/40 dark:border-slate-800 text-xs text-dark-4 dark:text-slate-400 flex items-start gap-2.5">
          <svg className="w-4 h-4 text-blue shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Order status is managed and updated automatically by our store administration team. You will see live updates here as your order progresses.
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
