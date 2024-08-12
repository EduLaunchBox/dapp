"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface MigrateTokenState {
  formStep: number;
  verificationStep: number;
}

const initialState: MigrateTokenState = {
  formStep: 1,
  verificationStep: 1,
};

export const migrateTokenSlice = createSlice({
  name: "migrateToken",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.formStep += 1;
    },
    prevStep: (state) => {
      state.formStep -= 1;
    },
    verificationNext: (state) => {
      state.verificationStep += 1;
    },
    verificationPrev: (state) => {
      state.verificationStep -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { nextStep, prevStep, verificationNext, verificationPrev } =
  migrateTokenSlice.actions;

export default migrateTokenSlice.reducer;
