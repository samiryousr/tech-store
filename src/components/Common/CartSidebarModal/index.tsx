"use client";
import React, { useEffect } from "react";

import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import {
  removeAllItemsFromCart,
  selectTotalPrice,
} from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import SingleItem from "./SingleItem";
import Link from "next/link";
import EmptyCart from "./EmptyCart";

const CartSidebarModal = () => {
  const { isCartModalOpen, closeCartModal } = useCartModalContext();
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const dispatch = useDispatch<AppDispatch>();

  const totalPrice = useSelector(selectTotalPrice);
  const numTotal = Number(totalPrice) || 0;
  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, (numTotal / freeShippingThreshold) * 100);
  const amountRemaining = (freeShippingThreshold - numTotal).toFixed(2);
  const hasFreeShipping = numTotal >= freeShippingThreshold;
  const itemCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  useEffect(() => {
    // Disable body scroll when modal is open
    if (isCartModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartModalOpen]);

  return (
    <>
      {/* Dark backdrop blur */}
      <div
        onClick={closeCartModal}
        className={`fixed inset-0 z-99999 bg-dark/60 backdrop-blur-sm transition-opacity duration-300 ${
          isCartModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-99999 h-full w-full max-w-[460px] bg-white dark:bg-[#0c1322] dark:border-l dark:border-slate-800 shadow-2xl flex flex-col transition-transform duration-300 ease-out modal-content ${
          isCartModalOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-gray-3/80 dark:border-slate-800 flex items-center justify-between shrink-0 bg-white dark:bg-[#0c1322]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue/10 dark:bg-blue/20 flex items-center justify-center text-blue dark:text-blue-light">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
            </div>
            <h2 className="font-bold text-dark dark:text-white text-base sm:text-lg">
              Shopping Cart
            </h2>
            <span className="rounded-full bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light text-xs font-semibold px-2.5 py-0.5">
              {itemCount}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={() => dispatch(removeAllItemsFromCart())}
                className="text-xs text-dark-4 dark:text-slate-400 hover:text-red transition-colors font-medium px-2 py-1"
              >
                Clear all
              </button>
            )}
            <button
              onClick={closeCartModal}
              aria-label="button for close modal"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-dark-4 dark:text-slate-400 hover:text-dark dark:hover:text-white bg-gray-2 dark:bg-slate-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Free Shipping Progress Bar */}
        {cartItems.length > 0 && (
          <div className="px-5 sm:px-6 py-2.5 bg-blue-50/70 dark:bg-slate-900/70 border-b border-blue/10 dark:border-slate-800 shrink-0">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {hasFreeShipping ? (
                <span className="font-semibold text-green flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Unlocked Free Express Shipping!
                </span>
              ) : (
                <span className="text-dark-3 dark:text-slate-300 font-medium">
                  Add <strong className="text-blue dark:text-blue-light">${amountRemaining}</strong> for Free Shipping
                </span>
              )}
              <span className="font-bold text-[11px] text-dark-4 dark:text-slate-400">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-gray-3 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  hasFreeShipping ? "bg-green" : "bg-gradient-to-r from-blue to-cyan-400"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Scrollable Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 no-scrollbar">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <SingleItem
                key={item.id}
                item={item}
              />
            ))
          ) : (
            <EmptyCart />
          )}
        </div>

        {/* Sticky Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-gray-3/80 dark:border-slate-800 bg-white dark:bg-[#0c1322] shrink-0 space-y-4 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-dark-4 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-dark dark:text-slate-200">
                  ${numTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-dark-4 dark:text-slate-400">
                <span>Shipping</span>
                <span className={`font-semibold ${hasFreeShipping ? "text-green" : "text-dark dark:text-slate-200"}`}>
                  {hasFreeShipping ? "Free" : "$15.00"}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-2 dark:border-slate-800">
                <span className="font-bold text-base text-dark dark:text-white">Total</span>
                <span className="font-extrabold text-2xl text-blue dark:text-blue-light">
                  ${(hasFreeShipping ? numTotal : numTotal + 15).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <Link
                onClick={closeCartModal}
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 font-semibold text-white bg-blue py-3.5 px-6 rounded-xl ease-out duration-200 hover:bg-blue-dark shadow-md hover:shadow-lg active:scale-98 transition-all"
              >
                <span>Proceed to Checkout</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                onClick={closeCartModal}
                href="/cart"
                className="w-full flex items-center justify-center font-medium text-dark dark:text-white bg-gray-1 dark:bg-slate-800/80 hover:bg-gray-2 dark:hover:bg-slate-700/80 border border-gray-3 dark:border-slate-700 py-3 px-5 rounded-xl ease-out duration-200 transition-all text-sm"
              >
                View Full Cart
              </Link>
            </div>

            <div className="flex items-center justify-center gap-3 text-[11px] text-dark-4 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                SSL Encrypted
              </span>
              <span>•</span>
              <span>Free 30-Day Returns</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebarModal;
