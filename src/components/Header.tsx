
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn('w-full py-6 px-4 sm:px-6 md:px-8 animate-fade-in', className)}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-5 w-5 text-white"
            >
              <path d="M20 19c0-5.523-4.477-10-10-10S0 13.477 0 19h20z" />
              <path d="M14 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              <path d="M14 3h2c1.1 0 2 .9 2 2v2" />
            </svg>
          </div>
          <span className="text-xl font-medium tracking-tight">SignScan</span>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md px-2 py-1">
            Home
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md px-2 py-1">
            How It Works
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md px-2 py-1">
            About
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="hidden md:flex text-sm px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors focus-ring">
            Sign In
          </button>
          <button className="text-sm px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors focus-ring">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
