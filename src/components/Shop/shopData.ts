import { Product, ProductsResponse } from "@/types/product";

export const getShopData = async (): Promise<ProductsResponse> => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
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

