import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Details Page | Neora",
  description: "This is Shop Details Page for Neora Store",
  // other metadata
};

const ShopDetailsPage = () => {
  return (
    <main>
      <ShopDetails />
    </main>
  );
};

export default ShopDetailsPage;
