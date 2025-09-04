'use client';

import { ReactNode } from 'react';
import { Search, Menu, Bell } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-pink-500 rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-500 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <h1 className="text-xl font-bold text-white">AssetSync</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 glass-card rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-200">
              <Search className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 glass-card rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-200">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 glass-card rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-200">
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-8">
        <div className="max-w-lg mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
