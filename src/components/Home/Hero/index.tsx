"use client";
import React, { useEffect, useState } from "react";
import HeroShowcase from "./HeroShowcase";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getShopData } from "@/components/Shop/shopData";
import { Product } from "@/types/product";
import { updateproductDetails } from "@/redux/features/product-details";
import { AppDispatch } from "@/redux/store";

const Hero = () => {
  const [phoneProduct, setPhoneProduct] = useState<Product | null>(null);
  const [headphoneProduct, setHeadphoneProduct] = useState<Product | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    getShopData().then(({ products }) => {
      setPhoneProduct(products.find((product) => product.category === "smartphones") ?? null);
      setHeadphoneProduct(
        products.find(
          (product) => product.category === "mobile-accessories" && /headphone|earbud|airpod/i.test(product.title)
        ) ?? products.find((product) => product.category === "mobile-accessories") ?? null
      );
    });
  }, []);

  const openProduct = (product: Product | null) => {
    if (!product) return;
    const productDetails = {
      ...product,
      discountedPrice: product.price * (1 - product.discountPercentage / 100),
      imgs: { thumbnails: product.images, previews: product.images },
    };
    dispatch(updateproductDetails(productDetails));
    localStorage.setItem("productDetails", JSON.stringify(productDetails));
    router.push(`/shop-details?id=${product.id}`);
  };

  const discountPrice = (product: Product | null) =>
    product ? (product.price * (1 - product.discountPercentage / 100)).toFixed(0) : "699";

  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-gradient-to-b from-[#c5dbfc] via-[#f8fafc] to-white dark:from-[#0d172c] dark:via-[#0b0f19] dark:to-[#0b0f19]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          <div className="w-full xl:max-w-[757px] relative group scale-[1.02]">
            {/* Radiant Ambient Back-Glow */}
            <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-blue-600/30 via-purple-600/25 to-cyan-400/30 dark:from-blue-500/45 dark:via-purple-500/40 dark:to-cyan-400/45 rounded-2xl blur-xl sm:blur-2xl opacity-75 group-hover:opacity-100 group-hover:blur-3xl transition-all duration-700 pointer-events-none -z-10 animate-pulse-glow" />

            <div className="relative z-1 rounded-2xl border border-[#e6e1d8] dark:border-slate-800 bg-[#fffdfb] dark:bg-[#111827] shadow-[0_12px_28px_rgba(30,36,48,0.05)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* <!-- bg shapes --> */}
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1 opacity-100 dark:opacity-20 pointer-events-none"
                width={534}
                height={520}
              />

              <HeroShowcase />
            </div>
          </div>

          <div className="xl:max-w-[393px] w-full">
            <div className="grid grid-cols-2 gap-3 xl:flex xl:flex-col xl:gap-5">
              {/* Phone card with Cyan/Blue glow */}
              <div className="w-full relative group scale-[1.02]">
                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500/35 via-cyan-400/30 to-indigo-500/30 dark:from-blue-500/50 dark:via-cyan-400/40 dark:to-indigo-500/40 rounded-2xl blur-lg sm:blur-xl opacity-75 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500 pointer-events-none -z-10 animate-pulse-glow" />
                <div
                  className="w-full relative z-1 rounded-2xl border border-[#e6e1d8] dark:border-slate-800 bg-[#fffdfb] dark:bg-[#111827] p-3 sm:p-7.5 shadow-[0_8px_20px_rgba(30,36,48,0.04)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  onClick={() => openProduct(phoneProduct)}
                >
                  <div className="flex items-center gap-2 sm:gap-14">
                    <div>
                      <h2 className="max-w-[95px] sm:max-w-[153px] font-semibold text-dark dark:text-white text-xs sm:text-xl mb-2 sm:mb-20">
                          <span>{phoneProduct?.title ?? "Loading product..."}</span>
                      </h2>

                      <div>
                        <p className="font-medium text-dark-4 dark:text-slate-400 text-[9px] sm:text-custom-sm mb-0.5 sm:mb-1.5">
                          limited time offer
                        </p>
                        <span className="flex items-center gap-1 sm:gap-3">
                          <span className="font-medium text-lg sm:text-heading-5 text-red">
                            {phoneProduct ? `$${discountPrice(phoneProduct)}` : "--"}
                          </span>
                          <span className="font-medium text-xs sm:text-2xl text-dark-4 dark:text-slate-500 line-through">
                            {phoneProduct ? `$${phoneProduct.price.toFixed(0)}` : "--"}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div>
                      {phoneProduct ? (
                        <Image
                          src={phoneProduct.thumbnail}
                          alt={phoneProduct.title}
                          width={123}
                          height={161}
                          loading="lazy"
                          className="w-24 sm:w-[123px] h-auto scale-[1.1] object-contain transition-transform duration-300 hover:scale-110"
                        />
                      ) : (
                        <span className="text-xs text-dark-4 dark:text-slate-400">Loading...</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Headphone card with Purple/Pink glow */}
              <div className="w-full relative group scale-[1.02]">
                <div className="absolute -inset-1 bg-gradient-to-tr from-purple-600/35 via-pink-500/30 to-indigo-600/30 dark:from-purple-500/50 dark:via-pink-500/40 dark:to-indigo-500/40 rounded-2xl blur-lg sm:blur-xl opacity-75 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500 pointer-events-none -z-10 animate-pulse-glow" />
                <div
                  className="w-full relative z-1 rounded-2xl border border-[#e6e1d8] dark:border-slate-800 bg-[#fffdfb] dark:bg-[#111827] p-3 sm:p-7.5 shadow-[0_8px_20px_rgba(30,36,48,0.04)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  onClick={() => openProduct(headphoneProduct)}
                >
                  <div className="flex items-center gap-2 sm:gap-14">
                    <div>
                      <h2 className="max-w-[95px] sm:max-w-[153px] font-semibold text-dark dark:text-white text-xs sm:text-xl mb-2 sm:mb-20">
                          <span>{headphoneProduct?.title ?? "Loading product..."}</span>
                      </h2>

                      <div>
                        <p className="font-medium text-dark-4 dark:text-slate-400 text-[9px] sm:text-custom-sm mb-0.5 sm:mb-1.5">
                          limited time offer
                        </p>
                        <span className="flex items-center gap-1 sm:gap-3">
                          <span className="font-medium text-lg sm:text-heading-5 text-red">
                            {headphoneProduct ? `$${discountPrice(headphoneProduct)}` : "--"}
                          </span>
                          <span className="font-medium text-xs sm:text-2xl text-dark-4 dark:text-slate-500 line-through">
                            {headphoneProduct ? `$${headphoneProduct.price.toFixed(0)}` : "--"}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div>
                      {headphoneProduct ? (
                        <Image
                          src={headphoneProduct.thumbnail}
                          alt={headphoneProduct.title}
                          width={123}
                          height={161}
                          loading="lazy"
                          className="w-24 sm:w-[123px] h-auto scale-[1.1] object-contain transition-transform duration-300 hover:scale-110"
                        />
                      ) : (
                        <span className="text-xs text-dark-4 dark:text-slate-400">Loading...</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Hero features --> */}
      <HeroFeature />
    </section>
  );
};

export default Hero;
