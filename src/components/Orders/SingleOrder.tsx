import React, { useState } from "react";
import OrderActions from "./OrderActions";
import OrderModal from "./OrderModal";

const SingleOrder = ({ orderItem, smallView }: any) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggleModal = (status: boolean) => {
    setShowDetails(status);
  };

  return (
    <>
      {!smallView && (
        <div className="items-center justify-between border-t border-gray-3 dark:border-slate-800 py-5 px-7.5 hidden md:flex transition-colors">
          <div className="min-w-[111px]">
            <p className="text-custom-sm font-semibold text-blue dark:text-blue-light">
              #{orderItem.orderId.slice(-8)}
            </p>
          </div>
          <div className="min-w-[175px]">
            <p className="text-custom-sm text-dark dark:text-slate-300">{orderItem.createdAt}</p>
          </div>

          <div className="min-w-[128px]">
            <p
              className={`inline-block text-custom-sm font-medium py-1 px-3 rounded-full capitalize ${
                orderItem.status === "delivered"
                  ? "text-green bg-green/10 dark:bg-green/20"
                  : orderItem.status === "on-hold"
                  ? "text-red bg-red/10 dark:bg-red/20"
                  : orderItem.status === "processing"
                  ? "text-yellow bg-yellow/10 dark:bg-yellow/20"
                  : "text-dark-4 bg-gray-2"
              }`}
            >
              {orderItem.status}
            </p>
          </div>

          <div className="min-w-[213px]">
            <p className="text-custom-sm text-dark dark:text-slate-300 line-clamp-1">{orderItem.title}</p>
          </div>

          <div className="min-w-[113px]">
            <p className="text-custom-sm font-semibold text-dark dark:text-white">{orderItem.total}</p>
          </div>

          <div className="flex gap-3 items-center">
            <OrderActions toggleDetails={toggleDetails} />
          </div>
        </div>
      )}

      {smallView && (
        <div className="block md:hidden border-t border-gray-3 dark:border-slate-800 first:border-t-0">
          <div className="py-4.5 px-6 space-y-2">
            <div>
              <p className="text-custom-sm text-dark dark:text-slate-300">
                <span className="font-bold pr-2 text-dark dark:text-white">Order:</span>
                <span className="font-semibold text-blue dark:text-blue-light">#{orderItem.orderId.slice(-8)}</span>
              </p>
            </div>
            <div>
              <p className="text-custom-sm text-dark dark:text-slate-300">
                <span className="font-bold pr-2 text-dark dark:text-white">Date:</span>{" "}
                {orderItem.createdAt}
              </p>
            </div>

            <div>
              <p className="text-custom-sm text-dark dark:text-slate-300 flex items-center">
                <span className="font-bold pr-2 text-dark dark:text-white">Status:</span>{" "}
                <span
                  className={`inline-block text-custom-sm font-medium py-0.5 px-2.5 rounded-full capitalize ${
                    orderItem.status === "delivered"
                      ? "text-green bg-green/10 dark:bg-green/20"
                      : orderItem.status === "on-hold"
                      ? "text-red bg-red/10 dark:bg-red/20"
                      : orderItem.status === "processing"
                      ? "text-yellow bg-yellow/10 dark:bg-yellow/20"
                      : "text-dark-4 bg-gray-2"
                  }`}
                >
                  {orderItem.status}
                </span>
              </p>
            </div>

            <div>
              <p className="text-custom-sm text-dark dark:text-slate-300">
                <span className="font-bold pr-2 text-dark dark:text-white">Title:</span> {orderItem.title}
              </p>
            </div>

            <div>
              <p className="text-custom-sm text-dark dark:text-slate-300">
                <span className="font-bold pr-2 text-dark dark:text-white">Total:</span>{" "}
                <span className="font-semibold text-dark dark:text-white">{orderItem.total}</span>
              </p>
            </div>

            <div className="pt-1">
              <p className="text-custom-sm text-dark dark:text-slate-300 flex items-center">
                <span className="font-bold pr-2 text-dark dark:text-white">Actions:</span>{" "}
                <OrderActions toggleDetails={toggleDetails} />
              </p>
            </div>
          </div>
        </div>
      )}

      <OrderModal
        showDetails={showDetails}
        toggleModal={toggleModal}
        order={orderItem}
      />
    </>
  );
};

export default SingleOrder;
