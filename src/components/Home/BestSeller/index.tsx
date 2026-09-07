"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SingleGridItem from "@/components/Shop/SingleGridItem";
import { getDiverseProducts, getShopData } from "@/components/Shop/shopData";
import { Product } from "@/types/product";

const BestSeller = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getShopData().then(({ products: apiProducts }) => {
      const bestRatedProducts = [...apiProducts].sort(
        (first, second) => second.rating - first.rating
      );
      setProducts(getDiverseProducts(bestRatedProducts, 6));
    });
  }, []);

  return (
    <section className="overflow-hidden">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- section title --> */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark dark:text-slate-300 mb-1.5">
              <Image
                src="/images/icons/icon-07.svg"
                alt="icon"
                width={17}
                height={17}
              />
              This Month
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark dark:text-white">
              Best Sellers
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-x-4 sm:gap-y-6 xl:gap-7.5">
          {/* <!-- Best Sellers item --> */}
          {products.map((item) => (
            <SingleGridItem item={item} key={item.id} />
          ))}
        </div>

        <div className="text-center mt-12.5">
          <Link
            href="/shop-without-sidebar"
            className="inline-flex font-medium text-custom-sm py-3 px-7 sm:px-12.5 rounded-md border-gray-3 dark:border-slate-700 border bg-gray-1 dark:bg-slate-800 text-dark dark:text-white ease-out duration-200 hover:bg-dark dark:hover:bg-blue hover:text-white hover:border-transparent"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
