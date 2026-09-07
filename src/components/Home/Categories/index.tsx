"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getShopData } from "@/components/Shop/shopData";
import { TECH_CATEGORIES, TechCategory } from "@/components/Shop/shopData";
import { Category } from "@/types/category";

import SingleItem from "./SingleItem";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getShopData().then(({ products }) => {
      const apiCategories = Array.from(
        new Set(products.map((product) => product.category))
      ).filter((category): category is TechCategory =>
        TECH_CATEGORIES.includes(category as TechCategory)
      );

      const hasWatches = apiCategories.some((category) =>
        category.endsWith("-watches")
      );
      const audioProducts = products.filter(
        (product) =>
          product.category === "mobile-accessories" &&
          /headphone|earbud|airpod|speaker|audio/i.test(product.title)
      );
      const orderedCategories = apiCategories
        .filter(
          (category) =>
            !category.endsWith("-watches") &&
            (audioProducts.length === 0 || category !== "mobile-accessories")
        )
        .sort(
          (first, second) =>
            TECH_CATEGORIES.indexOf(first) - TECH_CATEGORIES.indexOf(second)
        );

      if (hasWatches) orderedCategories.push("mens-watches");
      if (audioProducts.length) orderedCategories.push("mobile-accessories");

      setCategories(
        orderedCategories.map((apiCategory, index) => {
          const isWatchCategory = apiCategory === "mens-watches";
          const isAudioCategory =
            apiCategory === "mobile-accessories" && audioProducts.length > 0;
          const categoryProducts = products.filter((product) =>
            isWatchCategory
              ? product.category.endsWith("-watches")
              : isAudioCategory
              ? audioProducts.some((audioProduct) => audioProduct.id === product.id)
              : product.category === apiCategory
          );
          const firstProduct = categoryProducts[0];

          return {
            id: index + 1,
            title: isWatchCategory
              ? "Watches"
              : isAudioCategory
              ? "Headphones & Audio"
              : apiCategory
                  .split("-")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" "),
            apiCategory: isWatchCategory
              ? "watches"
              : isAudioCategory
              ? "audio"
              : apiCategory,
            productCount: categoryProducts.length,
            img: firstProduct?.thumbnail || firstProduct?.images?.[0] || "",
          };
        })
      );
    });
  }, []);

  return (
    <section className="overflow-hidden pt-17.5">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3 dark:border-slate-800/80">
        <div>
          {/* <!-- section title --> */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <span className="flex items-center gap-2.5 font-medium text-dark dark:text-slate-300 mb-1.5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_834_7356)">
                    <path
                      d="M3.94024 13.4474C2.6523 12.1595 2.00832 11.5155 1.7687 10.68C1.52908 9.84449 1.73387 8.9571 2.14343 7.18231L2.37962 6.15883C2.72419 4.66569 2.89648 3.91912 3.40771 3.40789C3.91894 2.89666 4.66551 2.72437 6.15865 2.3798L7.18213 2.14361C8.95692 1.73405 9.84431 1.52927 10.6798 1.76889C11.5153 2.00851 12.1593 2.65248 13.4472 3.94042L14.9719 5.46512C17.2128 7.70594 18.3332 8.82635 18.3332 10.2186C18.3332 11.6109 17.2128 12.7313 14.9719 14.9721C12.7311 17.2129 11.6107 18.3334 10.2184 18.3334C8.82617 18.3334 7.70576 17.2129 5.46494 14.9721L3.94024 13.4474Z"
                      stroke="#3C50E0"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="7.17245"
                      cy="7.39917"
                      r="1.66667"
                      transform="rotate(-45 7.17245 7.39917)"
                      stroke="#3C50E0"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M9.61837 15.4164L15.4342 9.6004"
                      stroke="#3C50E0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_834_7356">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Categories
              </span>
              <h2 className="font-semibold text-xl xl:text-heading-5 text-dark dark:text-white">
                Browse by Category
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-7 xl:grid-cols-5 xl:gap-7.5">
            {categories.map((item) => (
              <SingleItem item={item} key={item.apiCategory} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
