'use client';

import { useEffect } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useAccount } from 'wagmi';
import { Wallet as WalletIcon, Link } from 'lucide-react';

export function WalletConnection() {
  const { setFrameReady } = useMiniKit();
  const { isConnected, address } = useAccount();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  if (!isConnected) {
    return (
      <div className="glass-card rounded-lg p-8 text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <WalletIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h2>
        <p className="text-gray-300 mb-6">
          Connect your wallet to view your unified crypto portfolio across all platforms.
        </p>
        
        <Wallet>
          <ConnectWallet className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center space-x-2">
              <Link className="w-5 h-5" />
              <span>Connect Wallet</span>
            </div>
          </ConnectWallet>
        </Wallet>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar address={address} className="w-10 h-10" />
          <div>
            <Name address={address} className="text-white font-semibold" />
            <div className="text-sm text-gray-300">Connected</div>
          </div>
        </div>
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
