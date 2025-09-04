'use client';

import { ReactNode } from 'react';
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

interface DataDisplayProps {
  variant: 'metric' | 'list';
  title?: string;
  value?: number;
  change?: number;
  children?: ReactNode;
  icon?: ReactNode;
}

export function DataDisplay({ variant, title, value, change, children, icon }: DataDisplayProps) {
  if (variant === 'metric') {
    const isPositive = (change || 0) >= 0;
    
    return (
      <div className="glass-card rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          {title && <h3 className="text-gray-300 text-sm font-medium">{title}</h3>}
          {icon && <div className="text-gray-300">{icon}</div>}
        </div>
        
        {value !== undefined && (
          <div className="mb-2">
            <div className="text-2xl font-bold text-white">{formatCurrency(value)}</div>
          </div>
        )}
        
        {change !== undefined && (
          <div className={`flex items-center text-sm ${getChangeColor(change)}`}>
            {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {formatPercentage(change)} (24h)
          </div>
        )}
        
        {children}
      </div>
    );
  }

  return (
    <div className="glass-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        {title && <h3 className="text-white font-semibold text-lg">{title}</h3>}
        {icon && <div className="text-gray-300">{icon}</div>}
      </div>
      
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

// Portfolio Summary Component
interface PortfolioSummaryProps {
  totalValue: number;
  totalChange: number;
  assetCount: number;
}

export function PortfolioSummary({ totalValue, totalChange, assetCount }: PortfolioSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <DataDisplay
        variant="metric"
        title="Total Portfolio Value"
        value={totalValue}
        change={totalChange}
        icon={<BarChart3 className="w-5 h-5" />}
      />
      
      <div className="glass-card rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-300 text-sm font-medium">Assets</h3>
        </div>
        <div className="text-2xl font-bold text-white">{assetCount}</div>
        <div className="text-sm text-gray-300">Different tokens</div>
      </div>
      
      <div className="glass-card rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-300 text-sm font-medium">Performance</h3>
        </div>
        <div className="text-2xl font-bold text-green-400">65.9%</div>
        <div className="text-sm text-gray-300">This month</div>
      </div>
    </div>
  );
}
