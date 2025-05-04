import { createSlice } from "@reduxjs/toolkit";

const status = sessionStorage.getItem("isAuthenticated") || "not-authenticated";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: status, // "authenticated", "not-authenticated"
        user: {},
        errorMessage: undefined
    },
    reducers: {
        checking: (state) => {
            state.status = "not-authenticated";
            state.user = {};
            state.errorMessage = undefined;
            sessionStorage.setItem("isAuthenticated", "not-authenticated");
        },
        onLogin: (state, action) => {
            state.status = "authenticated";
            state.user = action.payload;
            state.errorMessage = undefined;
            sessionStorage.setItem("isAuthenticated", "authenticated");
        },
        onLogout: (state) => {
            state.status = "not-authenticated";
            state.user = {};
            state.errorMessage = undefined;
            sessionStorage.setItem("isAuthenticated", "not-authenticated");
        }
    }
})

export const { checking, onLogin, onLogout } = authSlice.actions;