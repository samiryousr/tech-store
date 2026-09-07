import React from "react";
import { Wishlist } from "@/components/Wishlist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist Page | Neora",
  description: "This is Wishlist Page for Neora Store",
  // other metadata
};

const WishlistPage = () => {
  return (
    <main>
      <Wishlist />
    </main>
  );
};

export default WishlistPage;
