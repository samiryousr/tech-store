"use client";

import { useEffect } from "react";
import { setCartItems } from "./features/cart-slice";
import { setWishlistItems } from "./features/wishlist-slice";
import { store } from "./store";
import { Provider } from "react-redux";
import React from "react";
import { useAuth } from "@/app/context/AuthContext";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    const wishlistKey = user ? `wishlistItems-${user.uid}` : null;

    try {
      const savedCart = localStorage.getItem("cartItems");
      const savedWishlist = wishlistKey ? localStorage.getItem(wishlistKey) : null;

      if (savedCart) {
        const items = JSON.parse(savedCart);
        if (Array.isArray(items)) store.dispatch(setCartItems(items));
      }

      const items = savedWishlist ? JSON.parse(savedWishlist) : [];
      store.dispatch(setWishlistItems(Array.isArray(items) ? items : []));
    } catch (error) {
      console.error("Failed to restore saved store data:", error);
    }

    return store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem("cartItems", JSON.stringify(state.cartReducer.items));
      if (wishlistKey) {
        localStorage.setItem(wishlistKey, JSON.stringify(state.wishlistReducer.items));
      }
    });
  }, [authLoading, user]);

  return <Provider store={store}>{children}</Provider>;
}
