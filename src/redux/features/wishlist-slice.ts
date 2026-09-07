import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  items: WishListItem[];
};

type WishListItem = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  status?: string;
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
    addItemToWishlist: (state, action: PayloadAction<any>) => {
      const item = action.payload;
      const productImage = item.thumbnail || (item.images && item.images[0]) || "";
      const thumbnails =
        item.imgs?.thumbnails?.length
          ? item.imgs.thumbnails
          : item.images?.length
          ? item.images
          : productImage
          ? [productImage]
          : [];
      const previews =
        item.imgs?.previews?.length
          ? item.imgs.previews
          : item.images?.length
          ? item.images
          : productImage
          ? [productImage]
          : [];
      const discountedPrice =
        item.discountedPrice ??
        (item.discountPercentage && item.price
          ? Number((item.price - (item.price * item.discountPercentage) / 100).toFixed(2))
          : item.price ?? 0);

      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.items.push({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity || 1,
          imgs: { thumbnails, previews },
          discountedPrice,
          status: item.status || "available",
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
  },
});

export const {
  addItemToWishlist,
  removeItemFromWishlist,
  removeAllItemsFromWishlist,
} = wishlist.actions;
export default wishlist.reducer;
