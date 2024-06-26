import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('addToCart', (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);
      if (isItemExist) {
        state.cart = state.cart.map((i) => (i._id === isItemExist._id ? item : i));
      } else {
        state.cart = [...state.cart, { ...item, selected: true }];
      }
    })
    .addCase('removeFromCart', (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
    })
    .addCase('toggleSelectItem', (state, action) => {
      state.cart = state.cart.map((item) =>
        item._id === action.payload ? { ...item, selected: !item.selected } : item
      );
    })
    .addCase('clearCart', (state) => {
      state.cart = [];
    })
    .addCase('selectAllItems', (state, action) => {
      state.cart = state.cart.map((item) => ({ ...item, selected: action.payload }));
    });
});
