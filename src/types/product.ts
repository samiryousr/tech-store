export type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;

  // Legacy fields used by the current product-card and cart components.
  discountedPrice?: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductLike = {
  id: number;
  title: string;
  price: number;
  discountPercentage?: number;
  discountedPrice?: number;
  thumbnail?: string;
  images?: string[];
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
  reviews?: ProductReview[] | number;
  stock?: number;
  availabilityStatus?: string;
};

export const getProductDiscountedPrice = (product: ProductLike): number =>
  product.discountedPrice ??
  Number(
    (
      product.price -
      (product.price * (product.discountPercentage ?? 0)) / 100
    ).toFixed(2)
  );

export const getProductImages = (product: ProductLike): string[] => {
  if (product.images?.length) return product.images;
  if (product.imgs?.previews?.length) return product.imgs.previews;
  if (product.thumbnail) return [product.thumbnail];
  return [];
};

export const getProductReviewCount = (product: ProductLike): number =>
  Array.isArray(product.reviews) ? product.reviews.length : product.reviews ?? 0;
