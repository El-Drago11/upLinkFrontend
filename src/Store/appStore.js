import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

const appStore = configureStore({
    reducer:{
        auth:authReducer,
        profile :profileReducer,
    }
});

export default appStore;