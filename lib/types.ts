export interface User {
  id: string;
  farcasterId: string;
  connectedWallets: string[];
  createdAt: Date;
}

export interface AssetHolding {
  id: string;
  userId: string;
  assetSymbol: string;
  assetName: string;
  quantity: number;
  currentValue: number;
  platform: string;
  lastUpdated: Date;
  priceChange24h?: number;
  logo?: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalChange24h: number;
  totalChangePercent24h: number;
  assetCount: number;
  topAssets: AssetHolding[];
}

export interface SearchResult {
  asset: AssetHolding;
  platform: string;
  quantity: number;
}
