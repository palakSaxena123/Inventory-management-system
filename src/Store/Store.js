import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Reducer/ProductSlice";

const Store = configureStore({
  reducer: {
    product : productReducer,
  },
});

export default Store;
