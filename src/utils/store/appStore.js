import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slice/cartSlice";

const appStore = configureStore({ reducer: { cart: cartSlice } });

export default appStore;
