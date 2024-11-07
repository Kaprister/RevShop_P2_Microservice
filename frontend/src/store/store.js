import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
// import { apiSlice } from "../slices/authSlice";
// import adminReducer from "../slices/adminSlice"


const store = configureStore({
    reducer: {
        // [apiSlice.reducerPath] : apiSlice.reducer,
        auth : authReducer,
        // admin : adminReducer
    },
    // middleware: (getDefaultMiddleware) =>
        // getDefaultMiddleware().concat(apiSlice.middleware),
    // devTools: true,
})

export default store