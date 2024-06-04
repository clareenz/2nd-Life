import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,  // Initially true to indicate loading state
  isSeller: false,  // Added default state for isSeller
  seller: null,     // Added default state for seller data
  sellers: [],      // Added default state for sellers list
  error: null,      // Added default state for error
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('LoadSellerRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('LoadSellerSuccess', (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase('LoadSellerFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
    // Get all sellers ---admin
    .addCase('getAllSellersRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllSellersSuccess', (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload;
    })
    .addCase('getAllSellersFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('UpdateShopInfoRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('UpdateShopInfoSuccess', (state, action) => {
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase('UpdateShopInfoFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});
