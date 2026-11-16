import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  iconSize?: number;
  textColor?: string;
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  iconSize = 22,
  textColor = 'text-charcoal-800',
  showSubtitle = false,
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-sage-500/10 text-sage-600 border border-sage-500/20 shadow-xs">
        <ShieldCheck size={iconSize} strokeWidth={2.2} />
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-sage-500" />
      </div>
      <div className="flex flex-col">
        <span className={`font-heading font-bold text-lg tracking-tight leading-none ${textColor}`}>
          AegisFamily
        </span>
        {showSubtitle && (
          <span className="text-[10px] uppercase font-medium tracking-wider text-charcoal-500 mt-0.5">
            Parental Control System
          </span>
        )}
      </div>
    </div>
  );
};
