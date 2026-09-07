"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getShopData } from "@/components/Shop/shopData";
import {
  getProductDiscountedPrice,
  Product,
} from "@/types/product";

const PromoBanner = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getShopData().then(({ products: apiProducts }) => setProducts(apiProducts));
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
    <section className="overflow-hidden py-8 sm:py-12 lg:py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="block sm:hidden">
          <div className="relative z-1 overflow-hidden rounded-xl bg-[#DBF4F3] py-6 px-4 mb-4">
            {getProductImage(laptop) && (
              <Image
                src={getProductImage(laptop)}
                alt={laptop?.title ?? "product"}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-[120px] h-auto object-contain"
                width={220}
                height={220}
              />
            )}

            <div className="ml-[120px] text-right relative z-10">
              <span className="block text-sm text-dark leading-5 line-clamp-2">
                {getShortTitle(laptop?.title, 2)}
              </span>

              <h2 className="font-bold text-base text-dark my-2">
                {getPrice(laptop)}
              </h2>

              <p className="font-semibold text-[11px] text-teal">
                {getDiscount(laptop)}
              </p>

              <Link
                href={getProductHref(laptop)}
                className="inline-flex font-medium text-[10px] text-white bg-teal py-2 px-5 rounded-md hover:bg-teal-dark mt-4"
              >
                Grab Now
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative z-1 overflow-hidden rounded-lg bg-[#FFECE1] py-6 px-4">
              {getProductImage(accessory) && (
                <Image
                  src={getProductImage(accessory)}
                  alt={accessory?.title ?? "product"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-[90px] h-auto object-contain"
                  width={180}
                  height={180}
                />
              )}

              <div className="max-w-[170px] relative z-10">
                <span className="block text-sm text-dark leading-5 line-clamp-2">
                  {getShortTitle(accessory?.title, 2)}
                </span>

                <h2 className="font-bold text-base text-dark my-2">
                  {getPrice(accessory)}
                </h2>

                <p className="text-[11px]">{getDiscount(accessory)}</p>

                <Link
                  href={getProductHref(accessory)}
                  className="inline-flex font-medium text-[10px] text-white bg-orange py-2 px-5 rounded-md hover:bg-orange-dark mt-4"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="relative z-1 overflow-hidden rounded-xl bg-[#F5F5F7] py-7 sm:py-10 lg:py-12 xl:py-16 px-4 sm:px-7.5 lg:px-14 xl:px-19 mb-4 sm:mb-7.5">
            <div className="max-w-[220px] sm:max-w-[350px] lg:max-w-[550px] w-full relative z-10">
              <span className="block font-medium text-sm sm:text-xl text-dark mb-2 sm:mb-3 leading-5">
                {getShortTitle(featuredProduct?.title, 3)}
              </span>

              <h2 className="font-bold text-base sm:text-xl lg:text-heading-4 xl:text-heading-3 text-dark mb-2 sm:mb-5">
                {getDiscount(featuredProduct)}
              </h2>

              <p className="mb-2 max-w-[180px] text-[10px] text-dark-4 sm:max-w-[390px] sm:text-sm line-clamp-2">
                {featuredProduct?.description ?? "Powerful performance for your everyday tech needs."}
              </p>

              <Link
                href={getProductHref(featuredProduct)}
                className="inline-flex font-medium text-[10px] sm:text-custom-sm text-white bg-blue py-2 px-4 sm:py-[11px] sm:px-9.5 rounded-md hover:bg-blue-dark mt-2 sm:mt-7.5"
              >
                Buy Now
              </Link>
            </div>

            {getProductImage(featuredProduct) && (
              <Image
                src={getProductImage(featuredProduct)}
                alt={featuredProduct?.title ?? "product"}
                className="absolute bottom-0 right-0 sm:right-6 lg:right-20 -z-1 object-contain w-[160px] sm:w-[220px] lg:w-[360px] h-auto"
                width={360}
                height={430}
              />
            )}
          </div>

          <div className="grid gap-4 sm:gap-7.5 grid-cols-1 lg:grid-cols-2">
            <div className="relative z-1 overflow-hidden rounded-lg bg-[#DBF4F3] py-6 sm:py-8 xl:py-16 px-4 sm:px-7.5 xl:px-10">
              {getProductImage(laptop) && (
                <Image
                  src={getProductImage(laptop)}
                  alt={laptop?.title ?? "product"}
                  className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-6 -z-1 object-contain w-[110px] sm:w-[180px] lg:w-[220px] h-auto"
                  width={241}
                  height={241}
                />
              )}

              <div className="text-right relative z-10">
                <span className="block text-sm sm:text-lg text-dark mb-1.5 leading-5 line-clamp-2">
                  {getShortTitle(laptop?.title, 2)}
                </span>

                <h2 className="font-bold text-base sm:text-xl lg:text-heading-4 text-dark mb-2.5">
                  {getPrice(laptop)}
                </h2>

                <p className="font-semibold text-[11px] sm:text-custom-1 text-teal">
                  {getDiscount(laptop)}
                </p>

                <Link
                  href={getProductHref(laptop)}
                  className="inline-flex font-medium text-[10px] sm:text-custom-sm text-white bg-teal py-2 px-5 sm:py-2.5 sm:px-8.5 rounded-md hover:bg-teal-dark mt-4 sm:mt-9"
                >
                  Grab Now
                </Link>
              </div>
            </div>

            <div className="relative z-1 overflow-hidden rounded-lg bg-[#FFECE1] py-6 sm:py-8 xl:py-16 px-4 sm:px-7.5 xl:px-10">
              {getProductImage(accessory) && (
                <Image
                  src={getProductImage(accessory)}
                  alt={accessory?.title ?? "product"}
                  className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-6 -z-1 object-contain w-[96px] sm:w-[150px] lg:w-[200px] h-auto"
                  width={200}
                  height={200}
                />
              )}

              <div className="relative z-10 max-w-[180px] sm:max-w-[220px]">
                <span className="block text-sm sm:text-lg text-dark mb-1.5 leading-5 line-clamp-2">
                  {getShortTitle(accessory?.title, 2)}
                </span>

                <h2 className="font-bold text-base sm:text-xl lg:text-heading-4 text-dark mb-2.5">
                  {getPrice(accessory)}
                </h2>

                <p className="text-[11px] sm:text-custom-sm">
                  {getDiscount(accessory)}
                </p>

                <Link
                  href={getProductHref(accessory)}
                  className="inline-flex font-medium text-[10px] sm:text-custom-sm text-white bg-orange py-2 px-5 sm:py-2.5 sm:px-8.5 rounded-md hover:bg-orange-dark mt-4 sm:mt-7.5"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
