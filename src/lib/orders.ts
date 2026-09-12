export type StoredOrder = {
  orderId: string;
  createdAt: string;
  status: "processing" | "delivered" | "on-hold";
  total: string;
  title: string;
};

const getOrdersKey = (userId: string) => `tech-store-orders-${userId}`;

export const getStoredOrders = (userId: string): StoredOrder[] => {
  if (typeof window === "undefined") return [];

  try {
    const storedOrders = window.localStorage.getItem(getOrdersKey(userId));
    return storedOrders ? (JSON.parse(storedOrders) as StoredOrder[]) : [];
  } catch {
    return [];
  }
};

export const saveOrder = (userId: string, order: StoredOrder) => {
  const orders = getStoredOrders(userId);
  window.localStorage.setItem(getOrdersKey(userId), JSON.stringify([order, ...orders]));
};
