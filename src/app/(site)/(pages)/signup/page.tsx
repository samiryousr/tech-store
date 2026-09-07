import Signup from "@/components/Auth/Signup";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Signup Page | Neora",
  description: "This is Signup Page for Neora Store",
  // other metadata
};

const SignupPage = () => {
  return (
    <main>
      <Signup />
    </main>
  );
};

export default SignupPage;
