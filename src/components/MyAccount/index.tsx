"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "../Common/Breadcrumb";
import Orders from "../Orders";
import { useAuth } from "@/app/context/AuthContext";

type AccountTab = "dashboard" | "orders" | "account-details";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState<AccountTab>("dashboard");
  const { user, logout } = useAuth();
  const router = useRouter();

  const userName = user?.displayName?.trim() || user?.email?.split("@")[0] || "User";
  const firstName = userName.split(/\s+/)[0];

  const handleLogout = async () => {
    await logout();
    router.push("/signin");
  };

  const tabs: { id: AccountTab; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "orders", label: "Orders" },
    { id: "account-details", label: "Account Details" },
  ];

  return (
    <>
      <Breadcrumb title="My Account" pages={["my account"]} />

      <section className="overflow-hidden bg-gray-2 py-12 sm:py-20">
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mb-7 rounded-xl bg-white p-6 shadow-1 sm:p-8">
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue">
              Account overview
            </p>
            <h1 className="text-2xl font-semibold text-dark sm:text-3xl">
              Welcome back, {firstName}
            </h1>
            <p className="mt-2 text-sm text-dark-4">
              {user?.email || "Manage your account and orders in one place."}
            </p>
          </div>

          <div className="flex flex-col gap-7.5 xl:flex-row">
            <aside className="h-fit w-full rounded-xl bg-white p-4 shadow-1 sm:p-6 xl:max-w-[300px]">
              <nav className="flex flex-wrap gap-3 xl:flex-col">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-md px-4 py-3 text-left text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue text-white"
                        : "bg-gray-1 text-dark-2 hover:bg-blue hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-md bg-gray-1 px-4 py-3 text-left text-sm font-medium text-red hover:bg-red hover:text-white"
                >
                  Log Out
                </button>
              </nav>
            </aside>

            <main className="min-w-0 flex-1">
              {activeTab === "dashboard" && (
                <section className="rounded-xl bg-white p-6 shadow-1 sm:p-9">
                  <h2 className="text-xl font-semibold text-dark">Your dashboard</h2>
                  <p className="mt-4 text-sm leading-7 text-dark-4">
                    From here you can review your orders and manage your account details.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("orders")}
                    className="mt-6 rounded-md bg-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
                  >
                    View Orders
                  </button>
                </section>
              )}

              {activeTab === "orders" && (
                <section className="overflow-hidden rounded-xl bg-white shadow-1">
                  <div className="border-b border-gray-3 px-6 py-5 sm:px-9">
                    <h2 className="text-xl font-semibold text-dark">Your Orders</h2>
                    <p className="mt-1 text-sm text-dark-4">
                      Review your recent order status and details.
                    </p>
                  </div>
                  <Orders />
                </section>
              )}

              {activeTab === "account-details" && (
                <section className="rounded-xl bg-white p-6 shadow-1 sm:p-9">
                  <h2 className="text-xl font-semibold text-dark">Account Details</h2>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 text-sm text-dark-4">Name</p>
                      <p className="rounded-md bg-gray-1 px-4 py-3 text-sm text-dark">{userName}</p>
                    </div>
                    <div>
                      <p className="mb-2 text-sm text-dark-4">Email</p>
                      <p className="rounded-md bg-gray-1 px-4 py-3 text-sm text-dark">
                        {user?.email || "Not available"}
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 text-sm leading-7 text-dark-4">
                    Your account information is managed through your Firebase sign-in provider.
                  </p>
                </section>
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAccount;
