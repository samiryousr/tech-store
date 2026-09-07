"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const CounDown = () => {
  const [days, setDays] = useState(14);
  const [hours, setHours] = useState(8);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(45);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Set a rolling dynamic deadline 24 days ahead so countdown is always alive
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 24);
    const targetTime = targetDate.getTime();

    const getTime = () => {
      const time = targetTime - Date.now();
      if (time <= 0) return;

      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    };

    getTime();
    const interval = setInterval(getTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="overflow-hidden py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div
          ref={cardRef}
          className={`relative overflow-hidden z-1 rounded-2xl bg-[#D0E9F3] dark:bg-gradient-to-r dark:from-[#0e1d38] dark:to-[#122442] dark:border dark:border-blue/20 p-4 sm:p-7.5 lg:p-10 xl:p-15 shadow-md transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-6 scale-[0.98]"
          }`}
        >
          <div className="max-w-[422px] w-full relative z-10">
            <span className="block font-semibold text-custom-1 text-blue dark:text-blue-light mb-2.5">
              Don’t Miss!!
            </span>

            <h2 className="font-bold text-dark dark:text-white text-xl lg:text-heading-4 xl:text-heading-3 mb-3">
              Enhance Your Music Experience
            </h2>

            <p className="text-dark-4 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              The Havit H206d is a premium wired PC headset designed for ultra-clear audio and gaming comfort.
            </p>

            {/* <!-- Countdown timer --> */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-6">
              {/* <!-- timer day --> */}
              <div>
                <span className="min-w-[64px] h-14.5 font-bold text-xl lg:text-3xl text-dark dark:text-white rounded-lg flex items-center justify-center bg-white dark:bg-slate-800/90 dark:border dark:border-slate-700 shadow-2 px-4 mb-2">
                  {days < 10 ? "0" + days : days}
                </span>
                <span className="block text-custom-sm text-dark dark:text-slate-300 font-medium text-center">
                  Days
                </span>
              </div>

              {/* <!-- timer hours --> */}
              <div>
                <span className="min-w-[64px] h-14.5 font-bold text-xl lg:text-3xl text-dark dark:text-white rounded-lg flex items-center justify-center bg-white dark:bg-slate-800/90 dark:border dark:border-slate-700 shadow-2 px-4 mb-2">
                  {hours < 10 ? "0" + hours : hours}
                </span>
                <span className="block text-custom-sm text-dark dark:text-slate-300 font-medium text-center">
                  Hours
                </span>
              </div>

              {/* <!-- timer minutes --> */}
              <div>
                <span className="min-w-[64px] h-14.5 font-bold text-xl lg:text-3xl text-dark dark:text-white rounded-lg flex items-center justify-center bg-white dark:bg-slate-800/90 dark:border dark:border-slate-700 shadow-2 px-4 mb-2">
                  {minutes < 10 ? "0" + minutes : minutes}
                </span>
                <span className="block text-custom-sm text-dark dark:text-slate-300 font-medium text-center">
                  Minutes
                </span>
              </div>

              {/* <!-- timer seconds --> */}
              <div>
                <span className="min-w-[64px] h-14.5 font-bold text-xl lg:text-3xl text-dark dark:text-white rounded-lg flex items-center justify-center bg-white dark:bg-slate-800/90 dark:border dark:border-slate-700 shadow-2 px-4 mb-2">
                  {seconds < 10 ? "0" + seconds : seconds}
                </span>
                <span className="block text-custom-sm text-dark dark:text-slate-300 font-medium text-center">
                  Seconds
                </span>
              </div>
            </div>
            {/* <!-- Countdown timer ends --> */}

            <a
              href="/shop-with-sidebar"
              className="inline-flex font-medium text-custom-sm text-white bg-blue py-3 px-9.5 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5 shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Check it Out!
            </a>
          </div>

          {/* <!-- bg shapes --> */}
          <Image
            src="/images/countdown/countdown-bg.png"
            alt="bg shapes"
            loading="lazy"
            className="hidden sm:block absolute right-0 bottom-0 -z-1 opacity-100 dark:opacity-20 pointer-events-none"
            width={737}
            height={482}
          />
          <Image
            src="/images/countdown/countdown-01.png"
            alt="product"
            loading="lazy"
            className="hidden lg:block absolute right-4 xl:right-33 bottom-4 xl:bottom-10 z-1 drop-shadow-2xl"
            width={411}
            height={376}
          />
        </div>
      </div>
    </section>
  );
};

export default CounDown;
