"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const { user } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    return (
      <div className="bg-white dark:bg-[#111827] border border-gray-3/60 dark:border-slate-800 shadow-1 rounded-[10px] py-4 px-5 sm:px-6 mb-7.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-green/10 text-green flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <div>
            <p className="text-xs text-dark-4 dark:text-slate-400">Ordering as</p>
            <p className="text-sm font-semibold text-dark dark:text-white">
              {user.email || user.displayName || "Logged in User"}
            </p>
          </div>
        </div>
        <span className="text-xs font-medium text-green bg-green/10 px-2.5 py-1 rounded-full">
          Active Account
        </span>
      </div>
    );
  }

  const handleInlineLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setDropdown(false);
    } catch (err: any) {
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("Invalid email or password.");
      } else {
        setError("Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-3/60 dark:border-slate-800 shadow-1 rounded-[10px] mb-7.5 overflow-hidden">
      <div
        onClick={() => setDropdown(!dropdown)}
        className={`cursor-pointer flex items-center justify-between py-4.5 px-5 sm:px-6 transition-colors ${
          dropdown ? "border-b border-gray-3 dark:border-slate-800 bg-gray-1/40 dark:bg-slate-800/40" : ""
        }`}
      >
        <div className="flex items-center gap-2 text-sm text-dark-4 dark:text-slate-300">
          <span>Already have an account?</span>
          <span className="font-semibold text-blue hover:underline">
            Click here to login
          </span>
        </div>
        <svg
          className={`${
            dropdown ? "rotate-180" : ""
          } fill-current text-dark dark:text-slate-300 ease-out duration-200 w-5 h-5 shrink-0`}
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.06103 7.80259C4.30813 7.51431 4.74215 7.48092 5.03044 7.72802L10.9997 12.8445L16.9689 7.72802C17.2572 7.48092 17.6912 7.51431 17.9383 7.80259C18.1854 8.09088 18.1521 8.5249 17.8638 8.772L11.4471 14.272C11.1896 14.4927 10.8097 14.4927 10.5523 14.272L4.1356 8.772C3.84731 8.5249 3.81393 8.09088 4.06103 7.80259Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* <!-- dropdown menu --> */}
      {dropdown && (
        <div className="pt-6 pb-7 px-5 sm:px-8">
          <p className="text-xs text-dark-4 dark:text-slate-400 mb-5">
            Log in below or{" "}
            <Link
              href="/signup?redirect=/checkout"
              className="text-blue hover:underline font-medium"
            >
              create a new account
            </Link>{" "}
            to complete your order and track your delivery.
          </p>

          <div>
            {error && (
              <div className="mb-4 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs font-medium">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="checkout-login-email" className="block mb-1.5 text-xs font-medium text-dark dark:text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                id="checkout-login-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleInlineLogin();
                  }
                }}
                placeholder="Enter your email"
                className="rounded-lg border border-gray-3 dark:border-slate-700 bg-gray-1 dark:bg-slate-800 text-dark dark:text-white placeholder:text-dark-5 w-full py-2.5 px-4 text-sm outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/20"
              />
            </div>

            <div className="mb-5">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="checkout-login-password" className="block text-xs font-medium text-dark dark:text-slate-300">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="checkout-login-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleInlineLogin();
                    }
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="rounded-lg border border-gray-3 dark:border-slate-700 bg-gray-1 dark:bg-slate-800 text-dark dark:text-white placeholder:text-dark-5 w-full py-2.5 pl-4 pr-10 text-sm outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-dark dark:hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleInlineLogin()}
                disabled={loading}
                className="inline-flex items-center justify-center font-medium text-sm text-white bg-blue py-2.5 px-6 rounded-lg ease-out duration-200 hover:bg-blue-dark disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Login"}
              </button>

              <Link
                href="/signin?redirect=/checkout"
                className="text-xs text-dark-4 dark:text-slate-400 hover:text-blue"
              >
                Or open full sign in page →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
