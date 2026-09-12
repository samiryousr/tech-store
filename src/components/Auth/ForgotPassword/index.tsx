"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Countdown timer for resend button
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResetPassword = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, trimmedEmail);
      setSubmitted(true);
      setCooldown(60); // 60 seconds cooldown before resending
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email address.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many requests. Please try again later.");
      } else if (err.code === "auth/network-request-failed") {
        setError("Network error. Please check your internet connection.");
      } else {
        console.warn("Password reset error:", err.code, err.message);
        setError(err.message || "Failed to send reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb title={"Forgot Password"} pages={["Forgot Password"]} />
      <section className="overflow-hidden py-10 lg:py-16 bg-gray-2 dark:bg-[#0b0f19]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[440px] w-full mx-auto rounded-2xl bg-white dark:bg-[#111827] border border-gray-3/60 dark:border-slate-800 shadow-1 p-6 sm:p-8">
            {submitted ? (
              /* Success State */
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue/10 dark:bg-blue/20 text-blue flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <h2 className="font-semibold text-xl sm:text-2xl text-dark dark:text-white mb-2">
                  Check Your Email
                </h2>

                <p className="text-dark-4 dark:text-slate-400 text-sm mb-5 leading-relaxed">
                  We have sent password reset instructions to:
                  <span className="block font-medium text-dark dark:text-white mt-1">
                    {email}
                  </span>
                </p>

                <div className="rounded-lg bg-blue-50 dark:bg-blue/10 border border-blue-100 dark:border-blue/20 p-3.5 mb-6 text-xs text-dark-4 dark:text-slate-300 text-left">
                  <div className="flex gap-2">
                    <svg
                      className="w-4 h-4 text-blue shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      Didn&apos;t receive the email? Check your spam/junk folder, or request a new link below.
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2.5 p-3 mb-4 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs text-left">
                    <svg
                      className="w-4 h-4 shrink-0 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">{error}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    type="button"
                    disabled={loading || cooldown > 0}
                    onClick={() => handleResetPassword()}
                    className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-medium border border-gray-3 dark:border-slate-700 bg-gray-1 dark:bg-slate-800 text-dark dark:text-white hover:border-blue dark:hover:border-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? "Sending..."
                      : cooldown > 0
                      ? `Resend email in ${cooldown}s`
                      : "Resend Email"}
                  </button>

                  <Link
                    href="/signin"
                    className="w-full inline-flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-medium bg-blue text-white hover:bg-blue-dark transition-colors shadow-sm"
                  >
                    Back to Sign In
                  </Link>
                </div>
              </div>
            ) : (
              /* Request Form */
              <div>
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-blue/10 dark:bg-blue/20 text-blue flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                  <h2 className="font-semibold text-xl sm:text-2xl text-dark dark:text-white mb-1.5">
                    Forgot Password?
                  </h2>
                  <p className="text-dark-4 dark:text-slate-400 text-sm">
                    No worries! Enter your email address and we&apos;ll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleResetPassword}>
                  {error && (
                    <div className="flex items-center gap-2.5 p-3 mb-4 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs sm:text-sm">
                      <svg
                        className="w-4 h-4 shrink-0 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium leading-snug">{error}</span>
                    </div>
                  )}

                  <div className="mb-4">
                    <label
                      htmlFor="reset-email"
                      className="block mb-1.5 text-sm font-medium text-dark dark:text-slate-200"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="reset-email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your registered email"
                        autoComplete="email"
                        className="rounded-lg border border-gray-3 dark:border-slate-700 bg-gray-1 dark:bg-slate-800/80 text-dark dark:text-white placeholder:text-dark-5 dark:placeholder:text-slate-500 w-full py-2.5 pl-10 pr-4 text-sm outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/20"
                      />
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206"
                        />
                      </svg>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center font-medium text-sm text-white bg-blue py-2.5 px-4 rounded-lg ease-out duration-200 hover:bg-blue-dark disabled:opacity-50 shadow-sm"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending Link...
                      </span>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>

                  <div className="mt-5 text-center">
                    <Link
                      href="/signin"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-dark-4 dark:text-slate-400 hover:text-blue dark:hover:text-blue-light transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      Back to Sign In
                    </Link>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
