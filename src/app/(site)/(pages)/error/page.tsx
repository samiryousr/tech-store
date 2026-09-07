import React from "react";
import Error from "@/components/Error";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Error Page | Neora",
  description: "This is Error Page for Neora Store",
  // other metadata
};

const ErrorPage = () => {
  return (
    <main>
      <Error />
    </main>
  );
};

export default ErrorPage;
