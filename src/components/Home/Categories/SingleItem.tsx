import { Category } from "@/types/category";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const SingleItem = ({ item }: { item: Category }) => {
  return (
    <Link
      href={
        item.apiCategory === "watches" || item.apiCategory === "audio"
          ? `/shop-without-sidebar?category=${item.apiCategory}`
          : `/shop-without-sidebar?category=${item.apiCategory}`
      }
      className="group flex h-full flex-col items-center rounded-xl border border-gray-3 bg-white p-3 shadow-1 transition-all duration-300 hover:-translate-y-1 hover:border-blue hover:shadow-lg cursor-pointer"
    >
      <div className="mb-3 flex h-28 w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:h-36">
        <Image
          src={item.img}
          alt={item.title}
          width={140}
          height={105}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="flex w-full items-center justify-between gap-2">
        <h3 className="text-left text-sm font-medium text-dark group-hover:text-blue sm:text-base">
          {item.title}
        </h3>
        <span className="shrink-0 rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue">
          {item.productCount ?? "..."}
        </span>
      </div>
    </Link>
  );
};

export default SingleItem;
