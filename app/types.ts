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
  category?: CategoryType;
  Liquidity?: LiquidityType[];
};

export type CategoryType = {
  name: string;
  id: number;
};

export type NetworkType = {
  id?: number;
  name: string;
  logoUrl?: string;
  chainId?: number;
  explorerUrl?: string;
};

type Dex = {
  id?: number;
  name?: string;
  logoUrl?: string;
};

export type UserType = {
  address?: string;
  points?: number;
};

export type LiquidityType = {
  id?: number;
  tokenId?: number;
  dexId?: number;
  quoteAmount?: string;
  baseAmount?: string;
  createdAt?: string;
  updatedAt?: string;
  token?: TokenType;
  dex?: Dex;
};
