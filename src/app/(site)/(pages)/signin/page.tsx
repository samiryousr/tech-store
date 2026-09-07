import Signin from "@/components/Auth/Signin";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Signin Page | Neora",
  description: "This is Signin Page for Neora Store",
  // other metadata
};

const SigninPage = () => {
  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;
