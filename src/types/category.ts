import type { TechCategory } from "@/components/Shop/shopData";

export type Category = {
  title: string;
  id: number;
  img: string;
  apiCategory: TechCategory | "watches" | "audio";
  productCount?: number;
};
