"use client";
import { TokenDetails } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address } from "viem";

export interface MigrateTokenState {
  formStep: number;
  oldTokenAddress: string;
  verificationStep: number;
  verified: boolean;
  tokenDetails: TokenDetails;
}

const initialState: MigrateTokenState = {
  formStep: 1,
  verificationStep: 1,
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
    logo: undefined,
    holders: undefined,
  },
  verified: false,
  oldTokenAddress: "",
};

export const migrateTokenSlice = createSlice({
  name: "migrateToken",
  initialState,
  reducers: {
    nextStep: (state, action: PayloadAction<TokenDetails>) => {
      state.tokenDetails = { ...action.payload };
      state.formStep += 1;
    },
    prevStep: (state) => {
      state.formStep -= 1;
    },
    verificationNext: (state, action: PayloadAction<Address>) => {
      state.tokenDetails = { ...state.tokenDetails, contract: action.payload };
      state.verified = true;
      state.verificationStep += 1;
    },
    verificationPrev: (state) => {
      state.verificationStep -= 1;
    },
    updateOldTokenAddress: (state, action: PayloadAction<Address>) => {
      state.oldTokenAddress = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  nextStep,
  prevStep,
  verificationNext,
  verificationPrev,
  updateOldTokenAddress,
} = migrateTokenSlice.actions;

export default migrateTokenSlice.reducer;
