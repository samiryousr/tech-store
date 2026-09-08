import { Product, ProductsResponse } from "@/types/product";
import { havitHeadsetProduct } from "@/data/countdownProduct";

export const TECH_CATEGORIES = [
  "smartphones",
  "laptops",
  "tablets",
  "mobile-accessories",
  "mens-watches",
  "womens-watches",
] as const;

export type TechCategory = (typeof TECH_CATEGORIES)[number];

export const getDiverseProducts = (
  products: Product[],
  limit: number
): Product[] => {
  const productsByCategory = new Map<string, Product[]>();

  for (const product of products) {
    const categoryProducts = productsByCategory.get(product.category) ?? [];
    categoryProducts.push(product);
    productsByCategory.set(product.category, categoryProducts);
  }

  const diverseProducts: Product[] = [];
  const categoryIndex = new Map<string, number>();
  const categories = [...productsByCategory.keys()];

  while (diverseProducts.length < limit && categories.length > 0) {
    let addedProduct = false;

    for (const category of categories) {
      const productsInCategory = productsByCategory.get(category) ?? [];
      const productIndex = categoryIndex.get(category) ?? 0;
      const product = productsInCategory[productIndex];

      if (product) {
        diverseProducts.push(product);
        categoryIndex.set(category, productIndex + 1);
        addedProduct = true;
      }

      if (diverseProducts.length >= limit) break;
    }

    if (!addedProduct) break;
  }

  return diverseProducts;
};

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

    if (!products.some((p) => p.id === havitHeadsetProduct.id)) {
      products.push(havitHeadsetProduct);
    }

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
      products: [havitHeadsetProduct],
      total: 1,
      skip: 0,
      limit: 1,
    };
  }
};

const shopData: Product[] = [];

export default shopData;

