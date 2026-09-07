import React from "react";
import Link from "next/link";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";

const EmptyCart = () => {
  const { closeCartModal } = useCartModalContext();

  return (
    <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-blue/10 dark:bg-blue/20 flex items-center justify-center text-blue dark:text-blue-light mb-5">
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>

      <h3 className="font-bold text-lg text-dark dark:text-white mb-2">
        Your Cart is Empty
      </h3>

      <p className="text-xs sm:text-sm text-dark-4 dark:text-slate-400 mb-6 max-w-[240px]">
        Add some awesome tech gadgets to your cart and they will show up here.
      </p>

      <Link
        onClick={() => closeCartModal()}
        href="/shop-with-sidebar"
        className="w-full max-w-[240px] flex items-center justify-center gap-2 font-semibold text-sm text-white bg-blue py-3 px-6 rounded-xl ease-out duration-200 hover:bg-blue-dark shadow-sm hover:shadow-md transition-all active:scale-95"
      >
        <span>Start Shopping</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
};

export default EmptyCart;
