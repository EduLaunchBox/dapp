"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface GeneralAppState {
  isMenuOpen: boolean;
}

const initialState: GeneralAppState = {
  isMenuOpen: true,
};

export const generalAppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleMenu } = generalAppSlice.actions;

export default generalAppSlice.reducer;
