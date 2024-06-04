import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  loading: true,
  addressLoading: false,
  admin: null,
  error: null,
  successMessage: null,
};

export const adminReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(`LoadAdminRequest`, (state) => {
      state.loading = true;
    })
    .addCase(`LoadAdminSuccess`, (state, action) => {
      state.isAdmin = true;
      state.loading = false;
      state.admin = action.payload;
    })
    .addCase(`LoadAdminFail`, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAdmin = false;
    })
      .addCase(`clearErrors`, (state) => {
      state.error = null;
    });
});
