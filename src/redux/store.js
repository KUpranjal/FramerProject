import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    ui: uiReducer,
  },
});
