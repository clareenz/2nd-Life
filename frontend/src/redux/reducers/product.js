import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('productCreateRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('productCreateSuccess', (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase('productCreateFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase('getAllProductsShopRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllProductsShopSuccess', (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase('getAllProductsShopFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('deleteProductRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('deleteProductSuccess', (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase('deleteProductFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('getAllProductsRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllProductsSuccess', (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    })
    .addCase('getAllProductsFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('updateProductRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('updateProductSuccess', (state, action) => {
      state.isLoading = false;
      // Assuming action.payload contains the updated product
      state.updatedProduct = action.payload;
    })
    .addCase('updateProductFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});

export default productReducer;
