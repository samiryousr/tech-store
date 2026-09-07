"use client";
import React from "react";
import Discount from "./Discount";
import OrderSummary from "./OrderSummary";
import { useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";
import Breadcrumb from "../Common/Breadcrumb";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { removeAllItemsFromCart } from "@/redux/features/cart-slice";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {/* <!-- ===== Breadcrumb Section Start ===== --> */}
      <section>
        <Breadcrumb title={"Cart"} pages={["Cart"]} />
      </section>
      {/* <!-- ===== Breadcrumb Section End ===== --> */}
      {cartItems.length > 0 ? (
        <section className="overflow-hidden py-12 sm:py-16 lg:py-20 bg-gray-2 dark:bg-[#0B0F19]">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
              <div className="flex items-center gap-3">
                <h2 className="font-bold text-dark dark:text-white text-2xl sm:text-3xl">Your Cart</h2>
                <span className="rounded-full bg-blue/10 dark:bg-blue/20 text-blue dark:text-blue-light text-xs sm:text-sm font-semibold px-3 py-1">
                  {cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)} items
                </span>
              </div>

              <button
                type="button"
                onClick={() => dispatch(removeAllItemsFromCart())}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-dark-4 dark:text-slate-400 hover:text-red dark:hover:text-red transition-colors"
              >
                <svg className="fill-current w-4 h-4" viewBox="0 0 16 16">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10 2H6a1 1 0 0 0-1 1v1H2.5a.5.5 0 0 0 0 1h.56l.78 8.58A2 2 0 0 0 5.83 15h4.34a2 2 0 0 0 1.99-1.42l.78-8.58h.56a.5.5 0 0 0 0-1H11V3a1 1 0 0 0-1-1zm-4 2V3h4v1H6zm1 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V8a.5.5 0 0 1 .5-.5zm3 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V8a.5.5 0 0 1 .5-.5z"/>
                </svg>
                Clear Shopping Cart
              </button>
            </div>

            <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-1 dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] border border-gray-3/60 dark:border-slate-800 overflow-hidden">
              {/* <!-- Desktop table view --> */}
              <div className="hidden lg:block w-full overflow-x-auto no-scrollbar">
                <div className="min-w-[1000px]">
                  {/* <!-- table header --> */}
                  <div className="flex items-center py-4 px-6 sm:px-8 bg-gray-1/80 dark:bg-slate-800/60 border-b border-gray-3 dark:border-slate-800 text-xs font-semibold text-dark-4 dark:text-slate-400 uppercase tracking-wider">
                    <div className="min-w-[420px] flex-1">
                      <p>Product</p>
                    </div>

                    <div className="min-w-[160px]">
                      <p>Price</p>
                    </div>

                    <div className="min-w-[220px]">
                      <p>Quantity</p>
                    </div>

                    <div className="min-w-[160px]">
                      <p>Subtotal</p>
                    </div>

                    <div className="min-w-[60px] text-right">
                      <p>Action</p>
                    </div>
                  </div>

                  {/* <!-- cart items --> */}
                  <div className="divide-y divide-gray-3 dark:divide-slate-800">
                    {cartItems.map((item) => (
                      <SingleItem item={item} key={item.id} />
                    ))}
                  </div>
                </div>
              </div>

              {/* <!-- Mobile card list view --> */}
              <div className="block lg:hidden divide-y divide-gray-3 dark:divide-slate-800">
                {cartItems.map((item) => (
                  <SingleItem item={item} key={item.id} isMobile />
                ))}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11 mt-10">
              <Discount />
              <OrderSummary />
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 sm:py-28 bg-gray-2 dark:bg-[#0B0F19]">
          <div className="max-w-[600px] mx-auto px-4 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-50 dark:bg-slate-800/80 flex items-center justify-center text-blue dark:text-blue-light shadow-sm">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white mb-3">
              Your cart is empty
            </h3>

            <p className="text-sm sm:text-base text-dark-4 dark:text-slate-400 mb-8 max-w-[400px] mx-auto">
              Looks like you haven&apos;t added any items to your cart yet. Discover our latest tech gear and gadgets!
            </p>

            <Link
              href="/shop-with-sidebar"
              className="inline-flex items-center justify-center gap-2 font-medium text-white bg-blue py-3.5 px-8 rounded-xl ease-out duration-200 hover:bg-blue-dark shadow-md hover:shadow-lg active:scale-95"
            >
              <span>Explore Products</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
