import { Address } from "viem";

export type TokenDetails = {
  projectCategory: string;
  tokenName: string;
  tokenSymbol: string;
  tokenSupply: number;
  decimal: number;
  xUrl?: string;
  logoUrl?: string;
  network?: NetworkType;
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
  networkId: NetworkType;
  deployerId: Address;
  contract: Address;
  points: number;
};

export type NetworkType = {
  id?: number;
  name: string;
  logoUrl?: string;
  chainId?: number;
  explorerUrl?: string;
};
