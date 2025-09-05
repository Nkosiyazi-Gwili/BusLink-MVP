'use client';

import { ReactNode } from 'react';

interface LayoutWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function LayoutWrapper({ children, className = '' }: LayoutWrapperProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}

export function CenteredContent({ children, className = '' }: LayoutWrapperProps) {
  return (
    <div className={`flex justify-center items-center min-h-screen ${className}`}>
      <div className="w-full max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
}

export function Card({ children, className = '' }: LayoutWrapperProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}