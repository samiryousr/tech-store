"use client";

import { useEffect } from "react";
import { setCartItems } from "./features/cart-slice";
import { setWishlistItems } from "./features/wishlist-slice";
import { store } from "./store";
import { Provider } from "react-redux";
import React from "react";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      const savedWishlist = localStorage.getItem("wishlistItems");

      if (savedCart) {
        const items = JSON.parse(savedCart);
        if (Array.isArray(items)) store.dispatch(setCartItems(items));
      }

      if (savedWishlist) {
        const items = JSON.parse(savedWishlist);
        if (Array.isArray(items)) store.dispatch(setWishlistItems(items));
      }
    } catch (error) {
      console.error("Failed to restore saved store data:", error);
    }

    return store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem("cartItems", JSON.stringify(state.cartReducer.items));
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistReducer.items)
      );
    });
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
