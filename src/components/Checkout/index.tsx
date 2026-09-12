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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
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
  const shippingFee = cartItems.length ? 15 : 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!cartItems.length) return;
    if (!user) {
      setError("Please sign in before placing an order.");
      return;
    }

    const orderId = typeof crypto !== "undefined" && crypto.randomUUID
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

  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
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
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="notes" className="block mb-2.5">
                      Other Notes (optional)
                    </label>

                    <textarea
                      name="notes"
                      id="notes"
                      rows={5}
                      placeholder="Notes about your order, e.g. speacial notes for delivery."
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* // <!-- checkout right --> */}
              <div className="max-w-[455px] w-full">
                {/* <!-- order list box --> */}
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      Your Order
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {/* <!-- title --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <h4 className="font-medium text-dark">Product</h4>
                      </div>
                      <div>
                        <h4 className="font-medium text-dark text-right">
                          Subtotal
                        </h4>
                      </div>
                    </div>

                    {cartItems.length ? (
                      cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-5 border-b border-gray-3">
                          <div>
                            <p className="text-dark">{item.title} x {item.quantity}</p>
                          </div>
                          <div>
                            <p className="text-dark text-right">${(item.discountedPrice * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="py-5 text-dark-4">Your cart is empty.</p>
                    )}

                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <p className="text-dark">Shipping Fee</p>
                      <p className="text-dark text-right">${shippingFee.toFixed(2)}</p>
                    </div>

                    {/* <!-- total --> */}
                    <div className="flex items-center justify-between pt-5">
                      <div>
                        <p className="font-medium text-lg text-dark">Total</p>
                      </div>
                      <div>
                        <p className="font-medium text-lg text-dark text-right">
                          ${(totalPrice + shippingFee).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- coupon box --> */}
                <Coupon />

                {/* <!-- shipping box --> */}
                <ShippingMethod />

                {/* <!-- payment box --> */}
                <PaymentMethod />

                {/* <!-- checkout button --> */}
                {submitted && (
                  <p className="mt-5 text-center text-green">Order submitted successfully.</p>
                )}
                {error && <p className="mt-5 text-center text-red">{error}</p>}
                <button
                  type="submit"
                  disabled={!cartItems.length}
                  className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
                >
                  Process Order
                </button>
                {!cartItems.length && (
                  <Link href="/shop-with-sidebar" className="block mt-3 text-center text-blue">
                    Continue shopping
                  </Link>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
