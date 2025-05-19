import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
      <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
        {children}
      </div>
    );
  };
  
  interface CardStatProps {
    title: string;
    value: string | number;
    change?: string;
    icon?: React.ReactNode;
    valueClassName?: string;
  }
  
  export const CardStat: React.FC<CardStatProps> = ({ title, value, change, icon, valueClassName="text-gray-900" }) => {
    return (
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 text-sm">{title}</span>
          {icon && <span className="text-gray-500">{icon}</span>}
        </div>
        <div className={`text-2xl font-bold mb-1 ${valueClassName}`}>{value}</div>
        {change && <div className="text-sm text-gray-500 mt-1">{change}</div>}
      </div>
    );
  };