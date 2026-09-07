import BlogDetails from "@/components/BlogDetails";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog Details Page | Neora",
  description: "This is Blog Details Page for Neora Store",
  // other metadata
};

const BlogDetailsPage = () => {
  return (
    <main>
      <BlogDetails />
    </main>
  );
};

export default BlogDetailsPage;
