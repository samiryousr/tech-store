import React from "react";
import { Testimonial } from "@/types/testimonial";
import Image from "next/image";

const SingleItem = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="shadow-testimonial bg-white dark:bg-[#111827] border border-transparent dark:border-slate-800 rounded-[10px] py-7.5 px-4 sm:px-8.5 m-1 transition-colors">
      <div className="flex items-center gap-1 mb-5">
        <Image
          src="/images/icons/icon-star.svg"
          alt="star icon"
          width={15}
          height={15}
        />
        <Image
          src="/images/icons/icon-star.svg"
          alt="star icon"
          width={15}
          height={15}
        />
        <Image
          src="/images/icons/icon-star.svg"
          alt="star icon"
          width={15}
          height={15}
        />
        <Image
          src="/images/icons/icon-star.svg"
          alt="star icon"
          width={15}
          height={15}
        />
        <Image
          src="/images/icons/icon-star.svg"
          alt="star icon"
          width={15}
          height={15}
        />
      </div>

      <p className="text-dark dark:text-slate-300 mb-6 leading-relaxed">{testimonial.review}</p>

      <div className="flex items-center gap-4">
        <div className="w-12.5 h-12.5 rounded-full overflow-hidden border border-gray-3 dark:border-slate-700">
          <Image
            src={testimonial.authorImg}
            alt="author"
            loading="lazy"
            className="w-12.5 h-12.5 rounded-full overflow-hidden object-cover"
            width={50}
            height={50}
          />
        </div>

        <div>
          <h3 className="font-medium text-dark dark:text-white">{testimonial.authorName}</h3>
          <p className="text-custom-sm text-dark-4 dark:text-slate-400">{testimonial.authorRole}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
