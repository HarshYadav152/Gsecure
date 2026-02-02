"use client";
import { useAuth } from '@/lib/contexts/AuthContext';
import Link from 'next/link';
import React from 'react';

function Navbar() {
  const { user, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-black/40 via-gray-900/40 to-black/40 backdrop-blur-xl supports-backdrop-blur:bg-black/30">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-2xl font-bold tracking-tighter text-white transition-opacity hover:opacity-80"
              >
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  G-secure
                </span>
              </Link>
            </div>

            {/* Right Section - GitHub & Auth */}
            <div className="flex items-center space-x-3">
              {/* GitHub Link */}
              <a 
                href="https://github.com/HarshYadav152/gsecure" 
                target='_blank'
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110 border border-white/10"
                aria-label="GitHub Repository"
              >
                {/* GitHub SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-white"
                >
                  <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.793-.258.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.625-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.192.694.801.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-3 ml-2">
                {loading ? (
                  <div className="text-white text-sm animate-pulse">
                    Loading...
                  </div>
                ) : user ? (
                  <>
                    <Link
                      href="/vault"
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-900/80 to-yellow-900/80 hover:from-amber-800 hover:to-yellow-800 transition-all duration-300 font-medium text-amber-100 border border-amber-700/30 hover:border-amber-600/50 shadow-lg hover:shadow-amber-900/30"
                    >
                      Vault
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-900/80 to-rose-900/80 hover:from-red-800 hover:to-rose-800 transition-all duration-300 font-medium text-red-100 border border-red-700/30 hover:border-red-600/50 shadow-lg hover:shadow-red-900/30"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-900/80 to-yellow-900/80 hover:from-amber-800 hover:to-yellow-800 transition-all duration-300 font-medium text-amber-100 border border-amber-700/30 hover:border-amber-600/50 shadow-lg hover:shadow-amber-900/30"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;