import React, { useState } from "react";

const Discount = () => {
  const [couponCode, setCouponCode] = useState("");
  const [applied, setApplied] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      setApplied(true);
    }
  };

  const handleQuickCode = (code: string) => {
    setCouponCode(code);
    setApplied(true);
  };

  return (
    <div className="lg:max-w-[670px] w-full">
      <form onSubmit={handleApply}>
        {/* <!-- coupon box --> */}
        <div className="bg-white dark:bg-[#111827] shadow-1 dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-2xl border border-gray-3/60 dark:border-slate-800 overflow-hidden">
          <div className="border-b border-gray-3 dark:border-slate-800 py-5 px-6 sm:px-8 bg-gray-1/40 dark:bg-slate-800/40 flex items-center justify-between">
            <h3 className="font-bold text-xl text-dark dark:text-white">Discount & Coupon</h3>
            <span className="text-xs text-dark-4 dark:text-slate-400">Have a promo code?</span>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-sm text-dark-4 dark:text-slate-400 mb-4">
              Enter your promotional coupon code to receive an exclusive instant discount on your order.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  name="coupon"
                  id="coupon"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                    if (applied) setApplied(false);
                  }}
                  placeholder="e.g. NEORA20"
                  className="rounded-xl border border-gray-3 dark:border-slate-700 bg-gray-1 dark:bg-slate-800 text-dark dark:text-white placeholder:text-dark-5 dark:placeholder:text-slate-500 w-full py-3 px-5 outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/20 uppercase font-mono tracking-wider text-sm"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center font-semibold text-white bg-dark dark:bg-slate-800 border border-transparent dark:border-slate-700 py-3 px-7 rounded-xl ease-out duration-200 hover:bg-blue dark:hover:bg-blue shadow-sm active:scale-98 transition-all"
              >
                Apply Coupon
              </button>
            </div>

            {/* Quick-apply pills */}
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-dark-4 dark:text-slate-400">Popular:</span>
              <button
                type="button"
                onClick={() => handleQuickCode("NEORA20")}
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue/20 text-blue dark:text-blue-light border border-blue/20 hover:bg-blue hover:text-white transition-colors cursor-pointer"
              >
                🏷️ NEORA20 (-20%)
              </button>
              <button
                type="button"
                onClick={() => handleQuickCode("FREESHIP")}
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-green/10 dark:bg-green/20 text-green border border-green/20 hover:bg-green hover:text-white transition-colors cursor-pointer"
              >
                🚚 FREESHIP
              </button>
            </div>

            {applied && (
              <div className="mt-3.5 flex items-center gap-2 text-xs font-medium text-green bg-green/10 dark:bg-green/20 border border-green/30 rounded-xl px-4 py-2.5">
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Coupon code <strong>{couponCode}</strong> successfully verified!</span>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Discount;
