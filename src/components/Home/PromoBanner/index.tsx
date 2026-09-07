"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getShopData } from "@/components/Shop/shopData";
import {
  getProductDiscountedPrice,
  Product,
} from "@/types/product";

const PromoBanner = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getShopData().then(({ products: apiProducts }) => setProducts(apiProducts));
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "60px", threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const featuredProduct = products.find(
    (product) => product.category === "tablets"
  );
  const laptop = products.find((product) => product.category === "laptops");
  const accessory = products.find(
    (product) => product.category === "mobile-accessories"
  );

  const getProductHref = (product?: Product) =>
    product ? `/shop-details?id=${product.id}` : "/shop-with-sidebar";

  const getProductImage = (product?: Product) =>
    product?.thumbnail || product?.images?.[0] || "";

  const getDiscount = (product?: Product) =>
    product ? `${product.discountPercentage.toFixed(0)}% OFF` : "Loading...";

  const getPrice = (product?: Product) =>
    product ? `$${getProductDiscountedPrice(product).toFixed(2)}` : "";

  const getShortTitle = (title?: string, maxWords = 3) => {
    if (!title) return "Loading product...";
    const words = title.split(" ");
    if (words.length <= maxWords) return title;
    return `${words.slice(0, maxWords).join(" ")}...`;
  };

  return (
    <section ref={sectionRef} className="overflow-hidden py-8 sm:py-12 lg:py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="block sm:hidden">
          <Link
            href={getProductHref(laptop)}
            className={`group block relative z-1 overflow-hidden rounded-xl bg-[#DBF4F3] dark:bg-[#0c2429] border border-transparent dark:border-teal/30 py-6 px-4 mb-4 shadow-sm cursor-pointer transition-all duration-700 ease-out hover:shadow-md hover:-translate-y-0.5 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {getProductImage(laptop) && (
              <Image
                src={getProductImage(laptop)}
                alt={laptop?.title ?? "product"}
                loading="lazy"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-[120px] h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                width={220}
                height={220}
              />
            )}

            <div className="ml-[120px] text-right relative z-10">
              <span className="block text-sm text-dark dark:text-white leading-5 line-clamp-2 font-medium">
                {getShortTitle(laptop?.title, 2)}
              </span>

              <h2 className="font-bold text-base text-dark dark:text-white my-2">
                {getPrice(laptop)}
              </h2>

              <p className="font-semibold text-[11px] text-teal dark:text-teal-light">
                {getDiscount(laptop)}
              </p>

              <span className="inline-flex font-medium text-[10px] text-white bg-teal py-2 px-5 rounded-md group-hover:bg-teal-dark mt-4 shadow-sm transition-colors">
                Grab Now
              </span>
            </div>
          </Link>

          <div className="space-y-4">
            <Link
              href={getProductHref(accessory)}
              className={`group block relative z-1 overflow-hidden rounded-lg bg-[#FFECE1] dark:bg-[#251711] border border-transparent dark:border-orange/30 py-6 px-4 shadow-sm cursor-pointer transition-all duration-700 ease-out hover:shadow-md hover:-translate-y-0.5 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {getProductImage(accessory) && (
                <Image
                  src={getProductImage(accessory)}
                  alt={accessory?.title ?? "product"}
                  loading="lazy"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-[90px] h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  width={180}
                  height={180}
                />
              )}

              <div className="max-w-[170px] relative z-10">
                <span className="block text-sm text-dark dark:text-white leading-5 line-clamp-2 font-medium">
                  {getShortTitle(accessory?.title, 2)}
                </span>

                <h2 className="font-bold text-base text-dark dark:text-white my-2">
                  {getPrice(accessory)}
                </h2>

                <p className="text-[11px] text-orange dark:text-orange-light font-semibold">{getDiscount(accessory)}</p>

                <span className="inline-flex font-medium text-[10px] text-white bg-orange py-2 px-5 rounded-md group-hover:bg-orange-dark mt-4 shadow-sm transition-colors">
                  Buy Now
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div className="hidden sm:block">
          <Link
            href={getProductHref(featuredProduct)}
            className={`group block relative z-1 overflow-hidden rounded-xl bg-[#F5F5F7] dark:bg-[#121c2e] border border-transparent dark:border-slate-800/80 py-7 sm:py-10 lg:py-12 xl:py-16 px-4 sm:px-7.5 lg:px-14 xl:px-19 mb-4 sm:mb-7.5 shadow-sm cursor-pointer transition-all duration-700 ease-out hover:shadow-lg hover:-translate-y-0.5 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="max-w-[220px] sm:max-w-[350px] lg:max-w-[550px] w-full relative z-10">
              <span className="block font-medium text-sm sm:text-xl text-dark dark:text-white mb-2 sm:mb-3 leading-5">
                {getShortTitle(featuredProduct?.title, 3)}
              </span>

              <h2 className="font-bold text-base sm:text-xl lg:text-heading-4 xl:text-heading-3 text-dark dark:text-white mb-2 sm:mb-5">
                {getDiscount(featuredProduct)}
              </h2>

              <p className="mb-2 max-w-[180px] text-[10px] text-dark-4 dark:text-slate-400 sm:max-w-[390px] sm:text-sm line-clamp-2">
                {featuredProduct?.description ?? "Powerful performance for your everyday tech needs."}
              </p>

              <span className="inline-flex font-medium text-[10px] sm:text-custom-sm text-white bg-blue py-2 px-4 sm:py-[11px] sm:px-9.5 rounded-md group-hover:bg-blue-dark mt-2 sm:mt-7.5 shadow-sm transition-colors">
                Buy Now
              </span>
            </div>

            {getProductImage(featuredProduct) && (
              <Image
                src={getProductImage(featuredProduct)}
                alt={featuredProduct?.title ?? "product"}
                loading="lazy"
                className="absolute bottom-0 right-0 sm:right-6 lg:right-20 -z-1 object-contain w-[160px] sm:w-[220px] lg:w-[360px] h-auto transition-transform duration-500 group-hover:scale-105"
                width={360}
                height={430}
              />
            )}
          </Link>

          <div className="grid gap-4 sm:gap-7.5 grid-cols-1 lg:grid-cols-2">
            <Link
              href={getProductHref(laptop)}
              className={`group block relative z-1 overflow-hidden rounded-lg bg-[#DBF4F3] dark:bg-[#0c2429] border border-transparent dark:border-teal/30 py-6 sm:py-8 xl:py-16 px-4 sm:px-7.5 xl:px-10 shadow-sm cursor-pointer transition-all duration-700 ease-out hover:shadow-lg hover:-translate-y-0.5 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {getProductImage(laptop) && (
                <Image
                  src={getProductImage(laptop)}
                  alt={laptop?.title ?? "product"}
                  loading="lazy"
                  className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-6 -z-1 object-contain w-[110px] sm:w-[180px] lg:w-[220px] h-auto transition-transform duration-500 group-hover:scale-105"
                  width={241}
                  height={241}
                />
              )}

              <div className="text-right relative z-10">
                <span className="block text-sm sm:text-lg text-dark dark:text-white mb-1.5 leading-5 line-clamp-2 font-medium">
                  {getShortTitle(laptop?.title, 2)}
                </span>

                <h2 className="font-bold text-base sm:text-xl lg:text-heading-4 text-dark dark:text-white mb-2.5">
                  {getPrice(laptop)}
                </h2>

                <p className="font-semibold text-[11px] sm:text-custom-1 text-teal dark:text-teal-light">
                  {getDiscount(laptop)}
                </p>

                <span className="inline-flex font-medium text-[10px] sm:text-custom-sm text-white bg-teal py-2 px-5 sm:py-2.5 sm:px-8.5 rounded-md group-hover:bg-teal-dark mt-4 sm:mt-9 shadow-sm transition-colors">
                  Grab Now
                </span>
              </div>
            </Link>

            <Link
              href={getProductHref(accessory)}
              className={`group block relative z-1 overflow-hidden rounded-lg bg-[#FFECE1] dark:bg-[#251711] border border-transparent dark:border-orange/30 py-6 sm:py-8 xl:py-16 px-4 sm:px-7.5 xl:px-10 shadow-sm cursor-pointer transition-all duration-700 ease-out hover:shadow-lg hover:-translate-y-0.5 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {getProductImage(accessory) && (
                <Image
                  src={getProductImage(accessory)}
                  alt={accessory?.title ?? "product"}
                  loading="lazy"
                  className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-6 -z-1 object-contain w-[96px] sm:w-[150px] lg:w-[200px] h-auto transition-transform duration-500 group-hover:scale-105"
                  width={200}
                  height={200}
                />
              )}

              <div className="relative z-10 max-w-[180px] sm:max-w-[220px]">
                <span className="block text-sm sm:text-lg text-dark dark:text-white mb-1.5 leading-5 line-clamp-2 font-medium">
                  {getShortTitle(accessory?.title, 2)}
                </span>

                <h2 className="font-bold text-base sm:text-xl lg:text-heading-4 text-dark dark:text-white mb-2.5">
                  {getPrice(accessory)}
                </h2>

                <p className="text-[11px] sm:text-custom-sm text-orange dark:text-orange-light font-semibold">
                  {getDiscount(accessory)}
                </p>

                <span className="inline-flex font-medium text-[10px] sm:text-custom-sm text-white bg-orange py-2 px-5 sm:py-2.5 sm:px-8.5 rounded-md group-hover:bg-orange-dark mt-4 sm:mt-7.5 shadow-sm transition-colors">
                  Buy Now
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
