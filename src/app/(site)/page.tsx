import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neora | Tech Store",
  description: "Neora is a modern technology store for premium gadgets, accessories, and smart devices.",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
 