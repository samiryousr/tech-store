import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
  value: Product;
};

const initialState = {
  value: {
    title: "",
    reviews: 0,
    price: 0,
    discountedPrice: 0,
    img: "",
    id: 0,
    images: [],
    imgs: { thumbnails: [], previews: [] },
  } as unknown as Product,
} as InitialState;

export const quickView = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    updateQuickView: (_, action) => {
      const p = action.payload || {};
      const productImage = p.thumbnail || (p.images && p.images[0]) || "";
      const thumbnails =
        p.imgs?.thumbnails?.length
          ? p.imgs.thumbnails
          : p.images?.length
          ? p.images
          : productImage
          ? [productImage]
          : [];
      const previews =
        p.imgs?.previews?.length
          ? p.imgs.previews
          : p.images?.length
          ? p.images
          : productImage
          ? [productImage]
          : [];
      const discountedPrice =
        p.discountedPrice ??
        (p.discountPercentage && p.price
          ? Number((p.price - (p.price * p.discountPercentage) / 100).toFixed(2))
          : p.price ?? 0);

      return {
        value: {
          ...p,
          imgs: { thumbnails, previews },
          discountedPrice,
        },
      };
    },

    resetQuickView: () => {
      return {
        value: initialState.value,
      };
    },
  },
});

export const { updateQuickView, resetQuickView } = quickView.actions;
export default quickView.reducer;
