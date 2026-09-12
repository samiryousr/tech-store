"use client";

import React, { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder";
import { useAuth } from "@/app/context/AuthContext";
import { getStoredOrders, StoredOrder } from "@/lib/orders";

const Orders = () => {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<StoredOrder[]>([]);

  useEffect(() => {
    if (user) setOrders(getStoredOrders(user.uid));
  }, [user]);

  if (loading) {
    return <p className="p-6 text-sm text-dark-4">Loading orders...</p>;
  }

  if (!user || !orders.length) {
    return <p className="px-4 py-9.5 text-sm text-dark-4 sm:px-7.5 xl:px-10">You don&apos;t have any orders yet.</p>;
  }

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[770px]">
          {/* <!-- order item --> */}
          {orders.length > 0 && (
            <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex ">
              <div className="min-w-[111px]">
                <p className="text-custom-sm text-dark">Order</p>
              </div>
              <div className="min-w-[175px]">
                <p className="text-custom-sm text-dark">Date</p>
              </div>

              <div className="min-w-[128px]">
                <p className="text-custom-sm text-dark">Status</p>
              </div>

              <div className="min-w-[213px]">
                <p className="text-custom-sm text-dark">Title</p>
              </div>

              <div className="min-w-[113px]">
                <p className="text-custom-sm text-dark">Total</p>
              </div>

              <div className="min-w-[113px]">
                <p className="text-custom-sm text-dark">Action</p>
              </div>
            </div>
          )}
          {orders.map((orderItem) => (
            <SingleOrder key={orderItem.orderId} orderItem={orderItem} smallView={false} />
          ))}
        </div>

        {orders.map((orderItem) => (
          <SingleOrder key={`${orderItem.orderId}-mobile`} orderItem={orderItem} smallView={true} />
        ))}
      </div>
    </>
  );
};

export default Orders;
