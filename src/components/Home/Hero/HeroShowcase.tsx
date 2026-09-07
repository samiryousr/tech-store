"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getShopData } from "@/components/Shop/shopData";
import {
  getProductDiscountedPrice,
  Product,
} from "@/types/product";

const HeroShowcase = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getShopData().then(({ products }) => {
      const featuredProduct =
        products.find((item) => item.category === "laptops") ??
        products.find((item) => item.category === "smartphones") ??
        products[0] ??
        null;

      setProduct(featuredProduct);
    });
  }, []);

  useEffect(() => {
    const element = showcaseRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const productImage = product?.thumbnail || product?.images?.[0];
  const discountedPrice = product
    ? getProductDiscountedPrice(product).toFixed(2)
    : "";
  const productHref = product
    ? `/shop-details?id=${product.id}`
    : "/shop-with-sidebar";

  return (
    <div
      ref={showcaseRef}
      className="flex min-h-[360px] items-center justify-between gap-6 px-5 py-8 sm:min-h-[480px] sm:px-10 sm:py-12 lg:px-14 lg:py-16"
    >
      <div className={isVisible ? "animate-hero-text-in max-w-[430px]" : "max-w-[430px] opacity-0"}>
        <div className="mb-6 flex items-center gap-3 sm:mb-8">
          <span className="rounded-full bg-blue px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Tech pick
          </span>
          {product && (
            <span className="text-sm font-medium text-dark-4">
              {product.category.replace("-", " ")}
            </span>
          )}
        </div>

        <h1 className="mb-4 max-w-[430px] text-2xl font-semibold leading-tight text-dark sm:text-4xl">
          {product?.title ?? "Discover your next tech essential"}
        </h1>

        <p className="mb-6 max-w-[390px] line-clamp-2 text-sm leading-6 text-dark-4 sm:mb-8 sm:text-base">
          {product?.description ?? "Real products, real prices, ready for your setup."}
        </p>

        <div className="mb-7 flex items-end gap-3 sm:mb-9">
          <span className="text-2xl font-semibold text-blue sm:text-3xl">
            {product ? `$${discountedPrice}` : "Loading..."}
          </span>
          {product && product.price !== getProductDiscountedPrice(product) && (
            <span className="pb-1 text-base text-dark-4 line-through sm:text-lg">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <Link
          href={productHref}
          className="inline-flex rounded-md bg-dark px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-blue sm:px-9"
        >
          Shop this product
        </Link>
      </div>

      <Link
        href={productHref}
        className={isVisible
          ? "animate-hero-product-in flex h-[250px] w-[42%] max-w-[340px] items-center justify-center rounded-2xl bg-white/70 p-4 shadow-[0_18px_45px_rgba(30,64,175,0.14)] transition-transform hover:scale-[1.02] sm:h-[360px] sm:p-8"
          : "flex h-[250px] w-[42%] max-w-[340px] items-center justify-center rounded-2xl bg-white/70 p-4 opacity-0 sm:h-[360px] sm:p-8"}
      >
        {productImage ? (
          <Image
            src={productImage}
            alt={product?.title ?? "Featured technology product"}
            width={380}
            height={380}
            className={isVisible
              ? "animate-hero-product-float max-h-full w-full object-contain"
              : "max-h-full w-full object-contain"}
          />
        ) : (
          <span className="text-center text-sm text-dark-4">Loading product...</span>
        )}
      </Link>
    </div>
  );
};

export default HeroShowcase;
