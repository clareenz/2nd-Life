import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
  isLoading: false, // Added isLoading property to initial state
  seller: null, // Added seller property to initial state
  error: null, // Added error property to initial state
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(`LoadSellerRequest`, (state) => {
      state.loading = true;
    })
    .addCase(`LoadSellerSuccess`, (state, action) => {
      state.isSeller = true;
      state.loading = false;
      state.seller = action.payload;
    })
    .addCase(`LoadSellerFail`, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
    .addCase(`clearErrors`, (state) => {
      state.error = null;
    });
});
