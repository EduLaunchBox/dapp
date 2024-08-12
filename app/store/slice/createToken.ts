"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface CreateTokenState {
  formStep: number;
}

const initialState: CreateTokenState = {
  formStep: 1,
};

export const createTokenSlice = createSlice({
  name: "createToken",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.formStep += 1;
    },
    prevStep: (state) => {
      state.formStep -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { nextStep, prevStep } = createTokenSlice.actions;

export default createTokenSlice.reducer;
