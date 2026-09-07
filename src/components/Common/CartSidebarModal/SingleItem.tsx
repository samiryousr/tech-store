"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/redux/features/cart-slice";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";

const SingleItem = ({ item }: { item: any; removeItemFromCart?: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { closeCartModal } = useCartModalContext();

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(item.id));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateCartItemQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleIncrease = () => {
    dispatch(updateCartItemQuantity({ id: item.id, quantity: (item.quantity || 1) + 1 }));
  };

  const itemImage =
    item.imgs?.thumbnails?.[0] ||
    item.imgs?.previews?.[0] ||
    item.thumbnail ||
    (item.images && item.images[0]) ||
    "/images/products/product-01.png";

  const itemPrice = item.discountedPrice ?? item.price;
  const itemTotal = (itemPrice * (item.quantity || 1)).toFixed(2);

  return (
    <div className="flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl border border-gray-3/70 dark:border-slate-800/80 bg-white dark:bg-[#111827] shadow-sm hover:shadow-md transition-all group">
      <Link
        href={`/shop-details?id=${item.id}`}
        onClick={closeCartModal}
        className="flex items-center justify-center rounded-xl bg-gray-1 dark:bg-slate-800/80 w-18 h-18 sm:w-20 sm:h-20 p-2 border border-gray-3/40 dark:border-slate-700/50 shrink-0 transition-transform group-hover:scale-105"
      >
        <Image
          src={itemImage}
          alt={item.title || "product"}
          width={80}
          height={80}
          loading="lazy"
          className="max-h-full w-auto object-contain"
        />
      </Link>

      <div className="flex-1 min-w-0 pr-1">
        <h4 className="font-semibold text-dark dark:text-white text-sm line-clamp-1 hover:text-blue dark:hover:text-blue-light transition-colors mb-1">
          <Link href={`/shop-details?id=${item.id}`} onClick={closeCartModal}>
            {item.title}
          </Link>
        </h4>

        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs text-dark-4 dark:text-slate-400">
            ${itemPrice} / item
          </span>
          <span className="font-bold text-sm text-dark dark:text-white">
            ${itemTotal}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="inline-flex items-center rounded-lg border border-gray-3 dark:border-slate-700 bg-gray-1 dark:bg-slate-800 shadow-sm">
            <button
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
              aria-label="decrease quantity"
              className="w-7 h-7 flex items-center justify-center text-dark dark:text-slate-300 hover:text-blue dark:hover:text-blue-light disabled:opacity-30 disabled:hover:text-current transition-colors text-xs font-bold"
            >
              −
            </button>
            <span className="w-8 text-center text-xs font-bold text-dark dark:text-white border-x border-gray-3 dark:border-slate-700">
              {item.quantity || 1}
            </span>
            <button
              onClick={handleIncrease}
              aria-label="increase quantity"
              className="w-7 h-7 flex items-center justify-center text-dark dark:text-slate-300 hover:text-blue dark:hover:text-blue-light transition-colors text-xs font-bold"
            >
              +
            </button>
          </div>

          <button
            onClick={handleRemoveFromCart}
            aria-label="remove product"
            className="w-7.5 h-7.5 rounded-lg flex items-center justify-center text-dark-4 dark:text-slate-400 hover:text-red hover:bg-red/10 dark:hover:bg-red/20 transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
              <path fillRule="evenodd" clipRule="evenodd" d="M10 2H6a1 1 0 0 0-1 1v1H2.5a.5.5 0 0 0 0 1h.56l.78 8.58A2 2 0 0 0 5.83 15h4.34a2 2 0 0 0 1.99-1.42l.78-8.58h.56a.5.5 0 0 0 0-1H11V3a1 1 0 0 0-1-1zm-4 2V3h4v1H6zm1 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V8a.5.5 0 0 1 .5-.5zm3 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V8a.5.5 0 0 1 .5-.5z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
