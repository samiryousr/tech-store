"use client";
import { Category } from "@/types/category";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SingleItem = ({ item }: { item: Category }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = cardRef.current;
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

  return (
    <Link
      ref={cardRef}
      href={`/shop-without-sidebar?category=${item.apiCategory}`}
      className={`group flex h-full flex-col items-center rounded-xl border border-gray-3 dark:border-slate-800 bg-white dark:bg-[#111827] p-3 shadow-1 dark:shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all duration-700 ease-out hover:-translate-y-1 hover:border-blue dark:hover:border-blue hover:shadow-lg cursor-pointer ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-6 scale-[0.98] pointer-events-none"
      }`}
    >
      <div className="mb-3 flex h-28 w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800/80 dark:to-slate-900/90 dark:border dark:border-slate-700/50 p-3 sm:h-36">
        <Image
          src={item.img}
          alt={item.title}
          width={140}
          height={105}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="flex w-full items-center justify-between gap-2">
        <h3 className="text-left text-sm font-medium text-dark dark:text-slate-200 group-hover:text-blue dark:group-hover:text-blue-light sm:text-base">
          {item.title}
        </h3>
        <span className="shrink-0 rounded-full bg-blue-50 dark:bg-blue/20 px-2 py-1 text-[10px] font-semibold text-blue dark:text-blue-light">
          {item.productCount ?? "..."}
        </span>
      </div>
    </Link>
  );
};

export default SingleItem;
