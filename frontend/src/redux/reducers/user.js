import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    loading: false,
    addressLoading: false,
    user: null,
    error: null,
    successMessage: null,
};

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(`LoadUserRequest`, (state) => {
            state.loading = true;
        })
        .addCase(`LoadUserSuccess`, (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(`LoadUserFail`, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase(`UpdateUserInfoRequest`, (state) => {
            state.loading = true;
        })
        .addCase(`UpdateUserInfoSuccess`, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(`UpdateUserInfoFailed`, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(`UpdateUserAddressRequest`, (state) => {
            state.addressLoading = true;
        })
        .addCase(`UpdateUserAddressSuccess`, (state, action) => {
            state.addressLoading = false;
            state.successMessage = action.payload.successMessage;
            state.user = action.payload.user;
        })
        .addCase(`UpdateUserAddressFailed`, (state, action) => {
            state.addressLoading = false;
            state.error = action.payload;
        })
        .addCase(`DeleteUserAddressRequest`, (state) => {
            state.addressLoading = true;
        })
        .addCase(`DeleteUserAddressSuccess`, (state, action) => {
            state.addressLoading = false;
            state.successMessage = action.payload.successMessage;
            state.user = action.payload.user;
        })
        .addCase(`DeleteUserAddressFailed`, (state, action) => {
            state.addressLoading = false;
            state.error = action.payload;
        })
        .addCase(`ClearErrors`, (state) => {
            state.error = null;
        })
        .addCase(`ClearMessages`, (state) => {
            state.successMessage = null;
        });
});