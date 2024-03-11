import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const forgotPasswordReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("ForgotPasswordRequest", (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    })
    .addCase("ForgotPasswordSuccess", (state) => {
      state.loading = false;
      state.success = true;
    })
    .addCase("ForgotPasswordFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
