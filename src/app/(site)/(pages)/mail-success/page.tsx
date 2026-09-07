import React from "react";
import MailSuccess from "@/components/MailSuccess";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Mail Success Page | Neora",
  description: "This is Mail Success Page for Neora Store",
  // other metadata
};

const MailSuccessPage = () => {
  return (
    <main>
      <MailSuccess />
    </main>
  );
};

export default MailSuccessPage;
