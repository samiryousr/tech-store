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
      className="flex flex-col-reverse sm:flex-row min-h-[360px] sm:min-h-[440px] items-center justify-between gap-6 px-4 py-6 sm:px-8 sm:py-10 lg:px-14 lg:py-14"
    >
      <div className={isVisible ? "animate-hero-text-in w-full sm:max-w-[430px]" : "w-full sm:max-w-[430px] opacity-0"}>
        <div className="mb-4 flex items-center gap-2.5 sm:mb-6">
          <span className="rounded-full bg-blue px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
            Tech pick
          </span>
          {product && (
            <span className="text-xs sm:text-sm font-medium text-dark-4 dark:text-slate-400 capitalize">
              {product.category.replace("-", " ")}
            </span>
          )}
        </div>

        <h1 className="mb-3 max-w-[430px] text-xl font-bold leading-tight text-dark dark:text-white sm:text-3xl lg:text-4xl">
          {product?.title ?? "Discover your next tech essential"}
        </h1>

        <p className="mb-4 max-w-[390px] line-clamp-2 text-xs sm:text-sm leading-relaxed text-dark-4 dark:text-slate-400 sm:mb-6">
          {product?.description ?? "Real products, real prices, ready for your setup."}
        </p>

        <div className="mb-5 flex items-end gap-3 sm:mb-8">
          <span className="text-xl font-bold text-blue dark:text-blue-light sm:text-3xl">
            {product ? `$${discountedPrice}` : "Loading..."}
          </span>
          {product && product.price !== getProductDiscountedPrice(product) && (
            <span className="pb-0.5 text-sm text-dark-4 dark:text-slate-500 line-through sm:text-lg">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <Link
          href={productHref}
          className="inline-flex items-center justify-center rounded-md bg-dark dark:bg-blue px-6 py-2.5 sm:px-9 sm:py-3 text-xs sm:text-sm font-medium text-white transition-all duration-200 hover:bg-blue dark:hover:bg-blue-dark shadow-sm hover:shadow-md active:scale-95"
        >
          Shop this product
        </Link>
      </div>

      <Link
        href={productHref}
        className={isVisible
          ? "animate-hero-product-in flex h-[200px] sm:h-[300px] md:h-[350px] w-full sm:w-[44%] max-w-[320px] sm:max-w-[340px] items-center justify-center rounded-2xl bg-white/80 dark:bg-slate-800/80 p-4 sm:p-6 shadow-[0_14px_35px_rgba(60,80,224,0.12)] dark:shadow-[0_14px_35px_rgba(0,0,0,0.5)] backdrop-blur-sm border border-white/60 dark:border-slate-700/60 transition-transform hover:scale-[1.02]"
          : "flex h-[200px] sm:h-[300px] md:h-[350px] w-full sm:w-[44%] max-w-[320px] sm:max-w-[340px] items-center justify-center rounded-2xl bg-white/80 dark:bg-slate-800/80 p-4 sm:p-6 opacity-0 sm:h-[360px] sm:p-8"}
      >
        {productImage ? (
          <Image
            src={productImage}
            alt={product?.title ?? "Featured technology product"}
            width={380}
            height={380}
            className={isVisible
              ? "animate-hero-product-float max-h-full w-full scale-[1.08] object-contain drop-shadow-md"
              : "max-h-full w-full scale-[1.08] object-contain"}
            priority
          />
        ) : (
          <span className="text-center text-sm text-dark-4 dark:text-slate-400">Loading product...</span>
        )}
      </Link>
    </div>
  );
};

export default HeroShowcase;
