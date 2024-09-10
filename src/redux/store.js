import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice.js";
import signupSlice from "./signupSlice.js";

const store = configureStore({
    reducer:{
        products: productSlice,
        signup: signupSlice,
    }
})

export default store;