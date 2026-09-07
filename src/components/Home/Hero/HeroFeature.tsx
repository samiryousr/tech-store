import React from "react";
import Image from "next/image";

const featureData = [
  {
    img: "/images/icons/icon-01.svg",
    title: "Free Shipping",
    description: "For all orders $200",
  },
  {
    img: "/images/icons/icon-02.svg",
    title: "1 & 1 Returns",
    description: "Cancellation after 1 day",
  },
];

const HeroFeature = () => {
  return (
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7.5 xl:gap-12.5 mt-6 sm:mt-10">
        {featureData.map((item, key) => (
          <div className="flex items-center gap-2 sm:gap-4" key={key}>
            <Image
              src={item.img}
              alt="icons"
              width={40}
              height={41}
              className="w-7 sm:w-10 h-auto"
            />

            <div>
              <h3 className="font-medium text-sm sm:text-lg text-dark">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
