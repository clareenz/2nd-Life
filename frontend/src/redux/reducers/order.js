import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    orders: [],  // Ensure orders is defined in the initial state
    error: null,
    order:null,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    // get all orders of user
    .addCase('getAllOrdersUserRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllOrdersUserSuccess', (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase('getAllOrdersUserFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // get all orders of shop
    .addCase('getAllOrdersShopRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllOrdersShopSuccess', (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase('getAllOrdersShopFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // clear errors
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});
