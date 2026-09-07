import { Product, ProductsResponse } from "@/types/product";

export const getShopData = async (): Promise<ProductsResponse> => {
  const response = await fetch("https://dummyjson.com/products");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

const shopData: Product[] = [];

export default shopData;

