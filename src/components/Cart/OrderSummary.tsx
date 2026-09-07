import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

const OrderSummary = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const numTotal = Number(totalPrice) || 0;
  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, (numTotal / freeShippingThreshold) * 100);
  const amountRemaining = (freeShippingThreshold - numTotal).toFixed(2);
  const hasFreeShipping = numTotal >= freeShippingThreshold;

  return (
    <div className="lg:max-w-[455px] w-full">
      {/* <!-- order list box --> */}
      <div className="bg-white dark:bg-[#111827] shadow-1 dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-2xl border border-gray-3/60 dark:border-slate-800 overflow-hidden">
        <div className="border-b border-gray-3 dark:border-slate-800 py-5 px-6 sm:px-8 bg-gray-1/40 dark:bg-slate-800/40">
          <h3 className="font-bold text-xl text-dark dark:text-white">Order Summary</h3>
        </div>

        <div className="p-6 sm:px-8 sm:py-7">
          {/* Free Shipping Progress Indicator */}
          <div className="mb-6 p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue/10 dark:border-blue/20">
            <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
              {hasFreeShipping ? (
                <span className="font-semibold text-green flex items-center gap-1.5">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  You unlocked Free Express Shipping!
                </span>
              ) : (
                <span className="font-medium text-dark-3 dark:text-slate-300">
                  Add <strong className="text-blue dark:text-blue-light">${amountRemaining}</strong> more for Free Shipping
                </span>
              )}
              <span className="font-bold text-xs text-dark-4 dark:text-slate-400">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-3 dark:bg-slate-700 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  hasFreeShipping ? "bg-green" : "bg-gradient-to-r from-blue to-cyan-400"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="space-y-4 pb-5 border-b border-gray-3 dark:border-slate-800 max-h-[220px] overflow-y-auto no-scrollbar">
            {cartItems.map((item, key) => (
              <div key={key} className="flex items-center justify-between text-sm">
                <div className="pr-4">
                  <p className="font-medium text-dark dark:text-slate-200 line-clamp-1">{item.title}</p>
                  <p className="text-xs text-dark-4 dark:text-slate-400 mt-0.5">Qty: {item.quantity || 1}</p>
                </div>
                <p className="font-semibold text-dark dark:text-white shrink-0">
                  ${((item.discountedPrice ?? item.price) * (item.quantity || 1)).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="py-5 border-b border-gray-3 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-sm text-dark-4 dark:text-slate-400">
              <span>Subtotal</span>
              <span className="font-medium text-dark dark:text-slate-200">${numTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-dark-4 dark:text-slate-400">
              <span>Shipping</span>
              <span className={`font-semibold ${hasFreeShipping ? "text-green" : "text-dark dark:text-slate-200"}`}>
                {hasFreeShipping ? "Free" : "$15.00"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 mb-7">
            <span className="font-bold text-lg text-dark dark:text-white">Total</span>
            <span className="font-extrabold text-2xl text-blue dark:text-blue-light">
              ${(hasFreeShipping ? numTotal : numTotal + 15).toFixed(2)}
            </span>
          </div>

          <Link
            href="/checkout"
            className="w-full flex items-center justify-center gap-2 font-semibold text-white bg-blue py-3.5 px-6 rounded-xl ease-out duration-200 hover:bg-blue-dark shadow-md hover:shadow-lg active:scale-98 transition-all"
          >
            <span>Proceed to Checkout</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          {/* Security & Guarantee Badges */}
          <div className="mt-5 pt-4 border-t border-gray-3/60 dark:border-slate-800 flex items-center justify-center gap-4 text-[11px] text-dark-4 dark:text-slate-400 font-medium text-center">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              Secure 256-Bit SSL
            </span>
            <span>•</span>
            <span>30-Day Returns</span>
            <span>•</span>
            <span>Fast Dispatch</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
