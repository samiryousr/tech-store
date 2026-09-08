import { Product } from "@/types/product";

export const havitHeadsetProduct: Product = {
  id: 206,
  title: "Havit H206d PC Gaming Headset",
  description:
    "The Havit H206d is a premium wired PC headset designed for ultra-clear audio, deep resonant bass, and prolonged gaming comfort. Equipped with high-precision 40mm drivers and a noise-cancelling omnidirectional microphone.",
  category: "mobile-accessories",
  price: 49.99,
  discountPercentage: 20,
  discountedPrice: 39.99,
  rating: 4.8,
  stock: 45,
  tags: ["gaming", "headset", "audio", "havit", "headphones"],
  brand: "Havit",
  sku: "HAV-H206D-GAMING",
  weight: 320,
  dimensions: {
    width: 18,
    height: 20,
    depth: 8.5,
  },
  warrantyInformation: "1 year official manufacturer warranty",
  shippingInformation: "Ships in 1-2 business days with express tracking",
  availabilityStatus: "In Stock",
  reviews: [
    {
      rating: 5,
      comment: "Outstanding sound clarity and crystal clear mic. Great value!",
      date: "2024-03-15",
      reviewerName: "Omar K.",
      reviewerEmail: "omar@example.com",
    },
    {
      rating: 4.5,
      comment: "Super comfortable for long gaming sessions and music listening.",
      date: "2024-04-20",
      reviewerName: "Sara M.",
      reviewerEmail: "sara@example.com",
    },
  ],
  returnPolicy: "30-day risk-free money back guarantee",
  minimumOrderQuantity: 1,
  meta: {
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2024-06-01T00:00:00.000Z",
    barcode: "8902061234567",
    qrCode: "https://havit.hk/h206d",
  },
  images: [
    "/images/countdown/countdown-01.png",
    "/images/hero/hero-01.png",
  ],
  thumbnail: "/images/countdown/countdown-01.png",
  imgs: {
    thumbnails: [
      "/images/countdown/countdown-01.png",
      "/images/hero/hero-01.png",
    ],
    previews: [
      "/images/countdown/countdown-01.png",
      "/images/hero/hero-01.png",
    ],
  },
};
