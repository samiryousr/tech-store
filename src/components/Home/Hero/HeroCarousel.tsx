"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";
import { getShopData } from "@/components/Shop/shopData";
import { Product } from "@/types/product";
import { updateproductDetails } from "@/redux/features/product-details";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const HeroCarousal = () => {
  const [headphoneProduct, setHeadphoneProduct] = useState<Product | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    getShopData().then(({ products }) => {
      setHeadphoneProduct(
        products.find(
          (product) =>
            product.category === "mobile-accessories" &&
            /headphone|earbud|airpod/i.test(product.title)
        ) ??
          products.find((product) => product.category === "mobile-accessories") ??
          null
      );
    });
  }, []);

  const handleProductClick = () => {
    if (!headphoneProduct) return;

    const productDetails = {
      ...headphoneProduct,
      discountedPrice:
        headphoneProduct.price *
        (1 - headphoneProduct.discountPercentage / 100),
      imgs: {
        thumbnails: headphoneProduct.images,
        previews: headphoneProduct.images,
      },
    };

    dispatch(updateproductDetails(productDetails));
    localStorage.setItem("productDetails", JSON.stringify(productDetails));
    router.push("/shop-details");
  };

  const discount = headphoneProduct?.discountPercentage.toFixed(0) ?? "30";
  const productImage = headphoneProduct?.thumbnail ?? "/images/hero/hero-01.png";

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      <SwiperSlide>
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                {discount}%
              </span>
              <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                Sale
                <br />
                Off
              </span>
            </div>

            <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              <button onClick={handleProductClick} className="text-left">
                {headphoneProduct?.title ?? "True Wireless Noise Cancelling Headphone"}
              </button>
            </h1>

            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ipsum at risus euismod lobortis in
            </p>

            <button
              onClick={handleProductClick}
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
            >
              Shop Now
            </button>
          </div>

          <div>
            <Image
              src={productImage}
              alt={headphoneProduct?.title ?? "headphone"}
              width={351}
              height={358}
            />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-26 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                {discount}%
              </span>
              <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                Sale
                <br />
                Off
              </span>
            </div>

            <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              <button onClick={handleProductClick} className="text-left">
                {headphoneProduct?.title ?? "True Wireless Noise Cancelling Headphone"}
              </button>
            </h1>

            <p>
              Lorem ipsum dolor sit, consectetur elit nunc suscipit non ipsum
              nec suscipit.
            </p>

            <button
              onClick={handleProductClick}
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-blue py-3 px-9 ease-out duration-200 hover:bg-blue-dark mt-10"
            >
              Shop Now
            </button>
          </div>

          <div>
            <Image
              src={productImage}
              alt={headphoneProduct?.title ?? "headphone"}
              width={351}
              height={358}
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousal;
