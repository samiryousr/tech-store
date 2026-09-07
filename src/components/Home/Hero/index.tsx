"use client";
import React, { useEffect, useState } from "react";
import HeroCarousel from "./HeroCarousel";
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
    router.push("/shop-details");
  };

  const discountPrice = (product: Product | null) =>
    product ? (product.price * (1 - product.discountPercentage / 100)).toFixed(0) : "699";

  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-[#f4efe9]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          <div className="xl:max-w-[757px] w-full">
            <div className="relative z-1 rounded-[10px] border border-[#e6e1d8] bg-[#fffdfb] shadow-[0_12px_28px_rgba(30,36,48,0.05)] overflow-hidden">
              {/* <!-- bg shapes --> */}
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
              />

              <HeroCarousel />
            </div>
          </div>

          <div className="xl:max-w-[393px] w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5">
              <div className="w-full relative rounded-[10px] border border-[#e6e1d8] bg-[#fffdfb] p-4 sm:p-7.5 shadow-[0_8px_20px_rgba(30,36,48,0.04)] cursor-pointer" onClick={() => openProduct(phoneProduct)}>
                <div className="flex items-center gap-14">
                  <div>
                    <h2 className="max-w-[153px] font-semibold text-dark text-xl mb-20">
                      <span>{phoneProduct?.title ?? "iPhone 14 Plus & 14 Pro Max"}</span>
                    </h2>

                    <div>
                      <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
                        limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="font-medium text-heading-5 text-red">
                          ${discountPrice(phoneProduct)}
                        </span>
                        <span className="font-medium text-2xl text-dark-4 line-through">
                          ${phoneProduct?.price.toFixed(0) ?? "999"}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <Image
                      src={phoneProduct?.thumbnail ?? "/images/hero/hero-02.png"}
                      alt={phoneProduct?.title ?? "mobile image"}
                      width={123}
                      height={161}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full relative rounded-[10px] border border-[#e6e1d8] bg-[#fffdfb] p-4 sm:p-7.5 shadow-[0_8px_20px_rgba(30,36,48,0.04)] cursor-pointer" onClick={() => openProduct(headphoneProduct)}>
                <div className="flex items-center gap-14">
                  <div>
                    <h2 className="max-w-[153px] font-semibold text-dark text-xl mb-20">
                      <span>{headphoneProduct?.title ?? "Wireless Headphone"}</span>
                    </h2>

                    <div>
                      <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
                        limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="font-medium text-heading-5 text-red">
                          ${discountPrice(headphoneProduct)}
                        </span>
                        <span className="font-medium text-2xl text-dark-4 line-through">
                          ${headphoneProduct?.price.toFixed(0) ?? "999"}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <Image
                      src={headphoneProduct?.thumbnail ?? "/images/hero/hero-01.png"}
                      alt={headphoneProduct?.title ?? "headphone"}
                      width={123}
                      height={161}
                    />
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
