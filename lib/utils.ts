export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B';
  }
  if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M';
  }
  if (value >= 1e3) {
    return (value / 1e3).toFixed(2) + 'K';
  }
  return value.toFixed(2);
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function getChangeColor(value: number): string {
  return value >= 0 ? 'text-green-400' : 'text-red-400';
}

export function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function generateMockAssets(): any[] {
  return [
    {
      id: '1',
      assetSymbol: 'ETH',
      assetName: 'Ethereum',
      quantity: 2.5,
      currentValue: 5250.00,
      platform: 'MetaMask',
      priceChange24h: 3.2,
      logo: '🔷'
    },
    {
      id: '2',
      assetSymbol: 'USDC',
      assetName: 'USD Coin',
      quantity: 1500,
      currentValue: 1500.00,
      platform: 'Coinbase',
      priceChange24h: 0.1,
      logo: '💵'
    },
    {
      id: '3',
      assetSymbol: 'UNI',
      assetName: 'Uniswap',
      quantity: 100,
      currentValue: 850.00,
      platform: 'Uniswap',
      priceChange24h: -2.1,
      logo: '🦄'
    },
    {
      id: '4',
      assetSymbol: 'AAVE',
      assetName: 'Aave',
      quantity: 25,
      currentValue: 2125.00,
      platform: 'Aave',
      priceChange24h: 5.7,
      logo: '👻'
    },
    {
      id: '5',
      assetSymbol: 'COMP',
      assetName: 'Compound',
      quantity: 15,
      currentValue: 675.00,
      platform: 'Compound',
      priceChange24h: -1.3,
      logo: '🏛️'
    }
  ];
}
