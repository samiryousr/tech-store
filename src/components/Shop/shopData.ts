import { Product, ProductsResponse } from "@/types/product";

export const TECH_CATEGORIES = [
  "smartphones",
  "laptops",
  "tablets",
  "mobile-accessories",
] as const;

export type TechCategory = (typeof TECH_CATEGORIES)[number];

const isTechCategory = (category: string): category is TechCategory =>
  TECH_CATEGORIES.includes(category as TechCategory);

export const getShopData = async (): Promise<ProductsResponse> => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=0");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: ProductsResponse = await response.json();
    const products = data.products.filter((product) =>
      isTechCategory(product.category)
    );

    return {
      ...data,
      products,
      total: products.length,
      skip: 0,
      limit: products.length,
    };
  } catch (error) {
    console.error("Error fetching shop data:", error);
    return {
      products: [],
      total: 0,
      skip: 0,
      limit: 0,
    };
  }
};

const shopData: Product[] = [];

export default shopData;

