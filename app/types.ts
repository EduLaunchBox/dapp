import { Address } from "viem";

export type TokenDetails = {
  projectCategory: string;
  tokenName: string;
  tokenSymbol: string;
  tokenSupply: number;
  decimal: number;
  xUrl?: string;
  logoUrl?: string;
  network?: string;
  deployer?: Address;
  contract?: Address;
  points?: number;
  logo?: any;
};
