"use client";
import React, { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Login from "./Login";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useSelector, useDispatch } from "react-redux";
import { removeAllItemsFromCart } from "@/redux/features/cart-slice";
import { useAuth } from "@/app/context/AuthContext";
import { saveOrder } from "@/lib/orders";

const Checkout = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const shippingFee = cartItems.length ? 15 : 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!cartItems.length) return;

    // Check if user is logged in
    if (!user) {
      setShowAuthModal(true);
      setError("Please sign in or create an account to complete your order.");
      return;
    }

    const orderId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}`;

    saveOrder(user.uid, {
      orderId,
      createdAt: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      status: "processing",
      total: `$${(totalPrice + shippingFee).toFixed(2)}`,
      title: cartItems.map((item) => `${item.title} x${item.quantity}`).join(", "),
    });

    dispatch(removeAllItemsFromCart());
    setSubmitted(true);
  };

  // Success Confirmation View
  if (submitted) {
    return (
      <>
        <Breadcrumb title={"Order Confirmed"} pages={["checkout", "/", "confirmation"]} />
        <section className="overflow-hidden py-16 lg:py-24 bg-gray-2 dark:bg-[#0b0f19]">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="max-w-[560px] w-full mx-auto rounded-2xl bg-white dark:bg-[#111827] border border-gray-3/60 dark:border-slate-800 shadow-1 p-8 sm:p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-green/10 text-green flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 fill-current" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white mb-3">
                Order Placed Successfully!
              </h2>

              <p className="text-dark-4 dark:text-slate-400 text-sm sm:text-base mb-8 leading-relaxed">
                Thank you for your purchase. Your order has been placed and is now being processed. You can review and track all your orders in your account dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                <Link
                  href="/my-account"
                  className="inline-flex justify-center items-center py-3 px-6 rounded-xl font-medium text-sm text-white bg-blue hover:bg-blue-dark transition-all shadow-md"
                >
                  View My Orders
                </Link>
                <Link
                  href="/shop-without-sidebar"
                  className="inline-flex justify-center items-center py-3 px-6 rounded-xl font-medium text-sm text-dark dark:text-white bg-gray-1 dark:bg-slate-800 border border-gray-3 dark:border-slate-700 hover:border-blue dark:hover:border-blue transition-all"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden py-12 lg:py-20 bg-gray-2 dark:bg-[#0b0f19]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              {/* <!-- checkout left --> */}
              <div className="lg:max-w-[670px] w-full">
                {/* <!-- login box --> */}
                <Login />

                {/* <!-- billing details --> */}
                <Billing />

                {/* <!-- address box two --> */}
                <Shipping />

                {/* <!-- others note box --> */}
                <div className="bg-white dark:bg-[#111827] border border-gray-3/60 dark:border-slate-800 shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="notes" className="block mb-2.5 text-sm font-medium text-dark dark:text-slate-200">
                      Other Notes (optional)
                    </label>

                    <textarea
                      name="notes"
                      id="notes"
                      rows={5}
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      className="rounded-md border border-gray-3 dark:border-slate-700 bg-gray-1 dark:bg-slate-800 text-dark dark:text-white placeholder:text-dark-5 w-full p-4 sm:p-5 outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/20"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* <!-- checkout right --> */}
              <div className="max-w-[455px] w-full">
                {/* <!-- order list box --> */}
                <div className="bg-white dark:bg-[#111827] border border-gray-3/60 dark:border-slate-800 shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 dark:border-slate-800 py-5 px-4 sm:px-8.5">
                    <h3 className="font-semibold text-xl text-dark dark:text-white">
                      Your Order
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {/* <!-- title --> */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-3 dark:border-slate-800 text-sm font-medium text-dark dark:text-slate-300">
                      <span>Product</span>
                      <span>Subtotal</span>
                    </div>

                    {cartItems.length ? (
                      cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between py-4 border-b border-gray-3/70 dark:border-slate-800 text-sm"
                        >
                          <div className="pr-4">
                            <p className="text-dark dark:text-slate-200 font-medium line-clamp-1">
                              {item.title}
                            </p>
                            <span className="text-xs text-dark-4 dark:text-slate-400">
                              Qty: {item.quantity}
                            </span>
                          </div>
                          <p className="text-dark dark:text-white font-semibold shrink-0">
                            ${(item.discountedPrice * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="py-5 text-dark-4 dark:text-slate-400 text-sm">
                        Your cart is empty.
                      </p>
                    )}

                    <div className="flex items-center justify-between py-4 border-b border-gray-3 dark:border-slate-800 text-sm">
                      <span className="text-dark-4 dark:text-slate-400">Shipping Fee</span>
                      <span className="text-dark dark:text-white font-medium">
                        ${shippingFee.toFixed(2)}
                      </span>
                    </div>

                    {/* <!-- total --> */}
                    <div className="flex items-center justify-between pt-5">
                      <span className="font-semibold text-lg text-dark dark:text-white">
                        Total
                      </span>
                      <span className="font-bold text-xl text-blue dark:text-blue-light">
                        ${(totalPrice + shippingFee).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* <!-- coupon box --> */}
                <Coupon />

                {/* <!-- shipping box --> */}
                <ShippingMethod />

                {/* <!-- payment box --> */}
                <PaymentMethod />

                {/* Notice for unauthenticated users */}
                {!user && (
                  <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-300">
                    <svg
                      className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="font-bold text-sm mb-1">Account Required</p>
                      <p className="leading-relaxed">
                        You must be signed in to place an order. Please{" "}
                        <Link
                          href="/signin?redirect=/checkout"
                          className="font-bold underline text-blue dark:text-blue-light hover:opacity-80"
                        >
                          Sign In
                        </Link>{" "}
                        or{" "}
                        <Link
                          href="/signup?redirect=/checkout"
                          className="font-bold underline text-blue dark:text-blue-light hover:opacity-80"
                        >
                          Create an Account
                        </Link>{" "}
                        to complete this order.
                      </p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs font-medium text-center">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!cartItems.length}
                  className="w-full flex justify-center items-center gap-2 font-medium text-white bg-blue py-3.5 px-6 rounded-xl ease-out duration-200 hover:bg-blue-dark active:scale-[0.99] mt-6 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Process Order</span>
                </button>

                {!cartItems.length && (
                  <Link
                    href="/shop-without-sidebar"
                    className="block mt-3 text-center text-sm text-blue hover:underline"
                  >
                    Continue shopping
                  </Link>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Auth Required Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-[440px] rounded-2xl bg-white dark:bg-[#111827] border border-gray-3/60 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-center">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowAuthModal(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-dark-4 dark:text-slate-400 hover:text-dark dark:hover:text-white p-1 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-blue/10 dark:bg-blue/20 text-blue flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-dark dark:text-white mb-2">
              Account Required
            </h3>

            <p className="text-sm text-dark-4 dark:text-slate-400 mb-6 leading-relaxed">
              To place your order and track shipping updates, you need to be signed in. Please sign in or create a new account to proceed.
            </p>

            <div className="space-y-3">
              <Link
                href="/signin?redirect=/checkout"
                className="w-full flex justify-center items-center py-3 px-5 rounded-xl font-medium text-sm text-white bg-blue hover:bg-blue-dark transition-all shadow-md hover:shadow-lg"
              >
                Sign In to Your Account
              </Link>

              <Link
                href="/signup?redirect=/checkout"
                className="w-full flex justify-center items-center py-3 px-5 rounded-xl font-medium text-sm text-dark dark:text-white bg-gray-1 dark:bg-slate-800 border border-gray-3 dark:border-slate-700 hover:border-blue dark:hover:border-blue transition-all"
              >
                Create a New Account
              </Link>

              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="w-full text-xs font-medium text-dark-4 dark:text-slate-500 hover:text-dark dark:hover:text-slate-300 pt-2 transition-colors"
              >
                Cancel and return to checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
