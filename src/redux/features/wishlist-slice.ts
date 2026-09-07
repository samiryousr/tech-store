import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getProductDiscountedPrice,
  getProductImages,
  ProductLike,
} from "@/types/product";

type InitialState = {
  items: WishListItem[];
};

export type WishlistItem = WishListItem;
export type WishlistProductPayload = ProductLike & {
  quantity?: number;
  status?: string;
};

type WishListItem = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  status?: string;
  stock?: number;
  availabilityStatus?: string;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};

const initialState: InitialState = {
  items: [],
};

export const wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action: PayloadAction<WishlistProductPayload>) => {
      const item = action.payload;
      const images = getProductImages(item);
      const discountedPrice = getProductDiscountedPrice(item);

      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.items.push({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity || 1,
          imgs: { thumbnails: images, previews: images },
          discountedPrice,
          status: item.status || "available",
          stock: item.stock,
          availabilityStatus: item.availabilityStatus,
        });
      }
    },
    removeItemFromWishlist: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },

    removeAllItemsFromWishlist: (state) => {
      state.items = [];
    },
    setWishlistItems: (state, action: PayloadAction<WishListItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addItemToWishlist,
  removeItemFromWishlist,
  removeAllItemsFromWishlist,
  setWishlistItems,
} = wishlist.actions;
export default wishlist.reducer;
