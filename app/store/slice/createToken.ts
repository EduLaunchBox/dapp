"use client";
import { TokenDetails } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CreateTokenState {
  formStep: number;
  tokenDetails: TokenDetails;
}

const initialState: CreateTokenState = {
  formStep: 1,
  tokenDetails: {
    projectCategory: "",
    tokenName: "",
    tokenSymbol: "",
    tokenSupply: 0,
    decimal: 0,
    xUrl: undefined,
    logoUrl: undefined,
    network: undefined,
    deployer: undefined,
    contract: undefined,
    points: undefined,
  },
};

export const createTokenSlice = createSlice({
  name: "createToken",
  initialState,
  reducers: {
    nextStep: (state, action: PayloadAction<TokenDetails>) => {
      state.tokenDetails = { ...action.payload };
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
