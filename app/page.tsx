'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { AppShell } from '@/components/AppShell';
import { WalletConnection } from '@/components/WalletConnection';
import { SearchBar } from '@/components/SearchBar';
import { AssetCard } from '@/components/AssetCard';
import { DataDisplay, PortfolioSummary } from '@/components/DataDisplay';
import { AssetHolding } from '@/lib/types';
import { generateMockAssets } from '@/lib/utils';
import { BarChart3, PieChart, Activity } from 'lucide-react';

export default function HomePage() {
  const { isConnected } = useAccount();
  const [assets, setAssets] = useState<AssetHolding[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<AssetHolding[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load mock data when wallet is connected
  useEffect(() => {
    if (isConnected) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const mockAssets = generateMockAssets();
        setAssets(mockAssets);
        setFilteredAssets(mockAssets);
        setIsLoading(false);
      }, 1500);
    } else {
      setAssets([]);
      setFilteredAssets([]);
    }
  }, [isConnected]);

  const handleSearch = (results: AssetHolding[]) => {
    setFilteredAssets(results);
  };

  // Calculate portfolio metrics
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const totalChange = assets.reduce((sum, asset) => {
    const change = (asset.priceChange24h || 0) * asset.currentValue / 100;
    return sum + change;
  }, 0);
  const totalChangePercent = totalValue > 0 ? (totalChange / totalValue) * 100 : 0;

  return (
    <AppShell>
      <WalletConnection />

      {isConnected && (
        <>
          {isLoading ? (
            <div className="space-y-6">
              {/* Loading Portfolio Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="glass-card rounded-lg p-6 animate-pulse">
                    <div className="h-4 bg-white bg-opacity-20 rounded mb-2"></div>
                    <div className="h-8 bg-white bg-opacity-20 rounded mb-2"></div>
                    <div className="h-3 bg-white bg-opacity-20 rounded w-2/3"></div>
                  </div>
                ))}
              </div>

              {/* Loading Search Bar */}
              <div className="glass-card rounded-lg p-4 animate-pulse">
                <div className="h-6 bg-white bg-opacity-20 rounded"></div>
              </div>

              {/* Loading Asset Cards */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="glass-card rounded-lg p-6 animate-pulse">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-white bg-opacity-20 rounded mb-2"></div>
                        <div className="h-4 bg-white bg-opacity-20 rounded w-2/3"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-4 bg-white bg-opacity-20 rounded"></div>
                      <div className="h-4 bg-white bg-opacity-20 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Portfolio Summary */}
              <PortfolioSummary
                totalValue={totalValue}
                totalChange={totalChangePercent}
                assetCount={assets.length}
              />

              {/* Search Bar */}
              <SearchBar
                assets={assets}
                onSearch={handleSearch}
                placeholder="Search your assets..."
              />

              {/* Portfolio Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <DataDisplay
                  variant="metric"
                  title="Your Portfolio"
                  value={1765.15}
                  change={5.2}
                  icon={<PieChart className="w-5 h-5" />}
                />
                
                <DataDisplay
                  variant="metric"
                  title="Asset Growth"
                  icon={<Activity className="w-5 h-5" />}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">This Week</span>
                    <span className="text-green-400 font-semibold">+12.5%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </DataDisplay>
              </div>

              {/* Assets List */}
              {filteredAssets.length > 0 ? (
                <DataDisplay
                  variant="list"
                  title="Your Assets"
                  icon={<BarChart3 className="w-5 h-5" />}
                >
                  <div className="space-y-4">
                    {filteredAssets.map((asset) => (
                      <AssetCard key={asset.id} asset={asset} variant="compact" />
                    ))}
                  </div>
                </DataDisplay>
              ) : (
                <div className="glass-card rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No Assets Found</h3>
                  <p className="text-gray-300">
                    {assets.length === 0 
                      ? "Your portfolio will appear here once we detect your assets."
                      : "Try adjusting your search terms."
                    }
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}

      {!isConnected && (
        <div className="text-center py-12">
          <div className="glass-card rounded-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to AssetSync</h2>
            <p className="text-gray-300 mb-6">
              Unify your crypto assets and see your whole portfolio at a glance. 
              Connect your wallet to get started.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <div className="text-white font-semibold">Unified Dashboard</div>
                <div className="text-gray-300">All assets in one view</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="text-white font-semibold">Universal Search</div>
                <div className="text-gray-300">Find any asset instantly</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
