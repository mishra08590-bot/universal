
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/30">
          <h3 className="font-semibold text-slate-200">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
