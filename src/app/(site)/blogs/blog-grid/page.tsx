import React from "react";
import BlogGrid from "@/components/BlogGrid";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog Grid Page | Neora",
  description: "This is Blog Grid Page for Neora Store",
  // other metadata
};

const BlogGridPage = () => {
  return (
    <main>
      <BlogGrid />
    </main>
  );
};

export default BlogGridPage;
