'use client';

import { AssetHolding } from '@/lib/types';
import { formatCurrency, formatNumber, formatPercentage, getChangeColor } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AssetCardProps {
  asset: AssetHolding;
  variant?: 'default' | 'compact';
}

export function AssetCard({ asset, variant = 'default' }: AssetCardProps) {
  const isPositive = (asset.priceChange24h || 0) >= 0;

  if (variant === 'compact') {
    return (
      <div className="glass-card rounded-lg p-4 hover:bg-white hover:bg-opacity-15 transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-lg">
              {asset.logo || asset.assetSymbol.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-white">{asset.assetSymbol}</div>
              <div className="text-sm text-gray-300">{formatNumber(asset.quantity)}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-white">{formatCurrency(asset.currentValue)}</div>
            {asset.priceChange24h !== undefined && (
              <div className={`text-sm flex items-center ${getChangeColor(asset.priceChange24h)}`}>
                {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {formatPercentage(asset.priceChange24h)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-lg p-6 hover:bg-white hover:bg-opacity-15 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-xl">
            {asset.logo || asset.assetSymbol.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">{asset.assetSymbol}</h3>
            <p className="text-gray-300 text-sm">{asset.assetName}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-white text-lg">{formatCurrency(asset.currentValue)}</div>
          {asset.priceChange24h !== undefined && (
            <div className={`text-sm flex items-center justify-end ${getChangeColor(asset.priceChange24h)}`}>
              {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {formatPercentage(asset.priceChange24h)}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white border-opacity-20">
        <div>
          <div className="text-gray-300 text-sm">Quantity</div>
          <div className="text-white font-semibold">{formatNumber(asset.quantity)}</div>
        </div>
        <div>
          <div className="text-gray-300 text-sm">Platform</div>
          <div className="text-white font-semibold">{asset.platform}</div>
        </div>
      </div>
    </div>
  );
}
