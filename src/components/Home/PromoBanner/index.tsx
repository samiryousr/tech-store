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

  return (
    <section className="overflow-hidden py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- promo banner big --> */}
        <div className="relative z-1 overflow-hidden rounded-lg bg-[#F5F5F7] py-12.5 lg:py-17.5 xl:py-22.5 px-4 sm:px-7.5 lg:px-14 xl:px-19 mb-7.5">
          <div className="max-w-[550px] w-full">
            <span className="block font-medium text-xl text-dark mb-3">
              {featuredProduct?.title ?? "Loading product..."}
            </span>

            <h2 className="font-bold text-xl lg:text-heading-4 xl:text-heading-3 text-dark mb-5">
              {getDiscount(featuredProduct)}
            </h2>

            <p className="mb-2 max-w-[300px] line-clamp-1 text-xs text-dark-4 sm:mb-0 sm:max-w-[390px] sm:line-clamp-2 sm:text-sm">
              {featuredProduct?.description ?? "Powerful performance for your everyday tech needs."}
            </p>

            <Link
              href={getProductHref(featuredProduct)}
              className="inline-flex font-medium text-xs sm:text-custom-sm text-white bg-blue py-2 px-6 sm:py-[11px] sm:px-9.5 rounded-md ease-out duration-200 hover:bg-blue-dark mt-4 sm:mt-7.5"
            >
              Buy Now
            </Link>
          </div>

          {getProductImage(featuredProduct) && (
            <Image
              src={getProductImage(featuredProduct)}
              alt={featuredProduct?.title ?? "product"}
                className="absolute bottom-0 right-0 lg:right-20 -z-1 object-contain"
                width={360}
                height={430}
            />
          )}
        </div>

        <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
          {/* <!-- promo banner small --> */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#DBF4F3] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            {getProductImage(laptop) && (
              <Image
                src={getProductImage(laptop)}
                alt={laptop?.title ?? "product"}
                className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-10 -z-1 object-contain"
                width={241}
                height={241}
              />
            )}

            <div className="text-right">
              <span className="block text-lg text-dark mb-1.5">
                {laptop?.title ?? "Loading product..."}
              </span>

              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                {getPrice(laptop)}
              </h2>

              <p className="font-semibold text-custom-1 text-teal">
                {getDiscount(laptop)}
              </p>

              <Link
                href={getProductHref(laptop)}
                className="inline-flex font-medium text-custom-sm text-white bg-teal py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-teal-dark mt-9"
              >
                Grab Now
              </Link>
            </div>
          </div>

          {/* <!-- promo banner small --> */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#FFECE1] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            {getProductImage(accessory) && (
              <Image
                src={getProductImage(accessory)}
                alt={accessory?.title ?? "product"}
                className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-8.5 -z-1 object-contain"
                width={200}
                height={200}
              />
            )}

            <div>
              <span className="block text-lg text-dark mb-1.5">
                {accessory?.title ?? "Loading product..."}
              </span>

              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                {getPrice(accessory)}
              </h2>

              <p className="max-w-[285px] text-custom-sm">
                {getDiscount(accessory)}
              </p>

              <Link
                href={getProductHref(accessory)}
                className="inline-flex font-medium text-custom-sm text-white bg-orange py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-orange-dark mt-7.5"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
