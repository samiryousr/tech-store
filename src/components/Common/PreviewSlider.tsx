"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import Image from "next/image";

import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { useAppSelector } from "@/redux/store";

const PreviewSliderModal = () => {
  const { closePreviewModal, isModalPreviewOpen, activeImageIndex } =
    usePreviewSlider();

  const reduxProduct = useAppSelector(
    (state) => state.productDetailsReducer.value
  );

  const [localProduct, setLocalProduct] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<any>(null);

  // Fallback to localStorage if redux store is empty
  useEffect(() => {
    if (isModalPreviewOpen) {
      try {
        const stored =
          typeof window !== "undefined"
            ? localStorage.getItem("productDetails")
            : null;
        if (stored) {
          setLocalProduct(JSON.parse(stored));
        }
      } catch (e) {}
    }
  }, [isModalPreviewOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePreviewModal();
      }
    };

    if (isModalPreviewOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isModalPreviewOpen, closePreviewModal]);

  const product =
    reduxProduct?.title || reduxProduct?.images?.length || reduxProduct?.thumbnail
      ? reduxProduct
      : localProduct || reduxProduct;

  // Collect and deduplicate all valid product images
  const rawImages: string[] = [];

  if (Array.isArray(product?.imgs?.previews) && product.imgs.previews.length > 0) {
    rawImages.push(...product.imgs.previews);
  } else if (Array.isArray(product?.images) && product.images.length > 0) {
    rawImages.push(...product.images);
  } else if (
    Array.isArray(product?.imgs?.thumbnails) &&
    product.imgs.thumbnails.length > 0
  ) {
    rawImages.push(...product.imgs.thumbnails);
  }

  if (product?.thumbnail && !rawImages.includes(product.thumbnail)) {
    rawImages.unshift(product.thumbnail);
  }

  const displayImages = Array.from(
    new Set(rawImages.filter((src) => typeof src === "string" && src.trim() !== ""))
  );

  const finalImages =
    displayImages.length > 0
      ? displayImages
      : ["/images/products/product-01.png"];

  // When modal opens or activeImageIndex changes, move swiper to that slide
  useEffect(() => {
    if (isModalPreviewOpen && swiperRef.current) {
      const targetIndex =
        typeof activeImageIndex === "number" &&
        activeImageIndex >= 0 &&
        activeImageIndex < finalImages.length
          ? activeImageIndex
          : 0;
      swiperRef.current.slideTo(targetIndex, 0);
      setCurrentSlide(targetIndex);
    }
  }, [isModalPreviewOpen, activeImageIndex, finalImages.length]);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  if (!isModalPreviewOpen) return null;

  return (
    <div
      className="fixed inset-0 w-full h-screen z-999999 flex flex-col justify-center items-center bg-white select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closePreviewModal();
        }
      }}
    >
      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 w-full p-4 sm:p-6 flex items-center justify-between z-30 pointer-events-none border-b border-gray-2 bg-white">
        <div className="pointer-events-auto max-w-[70%]">
          {product?.title && (
            <h3 className="text-dark text-base sm:text-lg font-medium truncate">
              {product.title}
            </h3>
          )}
          {finalImages.length > 1 && (
            <p className="text-dark-4 text-xs sm:text-sm mt-0.5 font-medium">
              {currentSlide + 1} / {finalImages.length}
            </p>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => closePreviewModal()}
          aria-label="close zoom modal"
          className="pointer-events-auto flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-2 hover:bg-gray-3 text-dark hover:text-blue transition-all duration-150 shadow-1"
        >
          <svg
            className="fill-current"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.707 5.293a1 1 0 010 1.414L13.414 12l5.293 5.293a1 1 0 01-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 12 5.293 6.707a1 1 0 011.414-1.414L12 10.586l5.293-5.293a1 1 0 011.414 0z"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Arrows */}
      {finalImages.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white border border-gray-3 hover:border-blue text-dark hover:bg-blue hover:text-white cursor-pointer z-30 transition-all shadow-2"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.707 19.707a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 1.414L9.414 12l6.293 6.293a1 1 0 010 1.414z"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white border border-gray-3 hover:border-blue text-dark hover:bg-blue hover:text-white cursor-pointer z-30 transition-all shadow-2"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.293 4.293a1 1 0 011.414 0l7 7a1 1 0 010 1.414l-7 7a1 1 0 01-1.414-1.414L14.586 12 8.293 5.707a1 1 0 010-1.414z"
              />
            </svg>
          </button>
        </>
      )}

      {/* Main Image Slider */}
      <div className="w-full max-w-[900px] h-[70vh] max-h-[700px] px-6 sm:px-16 flex items-center justify-center mt-12 mb-14">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setCurrentSlide(swiper.activeIndex);
          }}
          slidesPerView={1}
          spaceBetween={30}
          className="w-full h-full"
        >
          {finalImages.map((src, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center p-2">
                <Image
                  src={src}
                  alt={product?.title || `product preview ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 95vw, 850px"
                  className="object-contain"
                  priority={index === (activeImageIndex || 0)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail Bar at bottom if multiple images */}
      {finalImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 max-w-[90%] overflow-x-auto no-scrollbar py-2 px-3 rounded-full bg-gray-1 border border-gray-3 shadow-1 z-30">
          {finalImages.map((thumbSrc, index) => (
            <button
              key={index}
              onClick={() => {
                swiperRef.current?.slideTo(index);
                setCurrentSlide(index);
              }}
              className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 bg-white ${
                currentSlide === index
                  ? "border-blue scale-105 shadow-md"
                  : "border-gray-3 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={thumbSrc}
                alt={`thumbnail ${index + 1}`}
                fill
                sizes="48px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviewSliderModal;
