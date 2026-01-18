import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
