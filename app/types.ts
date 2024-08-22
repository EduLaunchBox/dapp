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
  holders?: number;
};

// When gotten from database
export type TokenType = {
  id: string;
  name: string;
  symbol: string;
  totalSupply: string;
  decimal: number;
  logoUrl: string;
  xUrl: string;
  categoryId: number;
  networkId: number;
  deployerId: Address;
  contract: Address;
  points: number;
};
