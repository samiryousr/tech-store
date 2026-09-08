import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Shop",
    newTab: false,
    path: "/shop-with-sidebar",
  },
  {
    id: 3,
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
  {
    id: 6,
    title: "pages",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 61,
        title: "All Products",
        newTab: false,
        path: "/shop-without-sidebar",
      },
      {
        id: 62,
        title: "This Week’s New Arrivals",
        newTab: false,
        path: "/#new-arrivals",
      },
      {
        id: 63,
        title: "This Month’s Best Sellers",
        newTab: false,
        path: "/#best-sellers",
      },
    ],
  },
];
