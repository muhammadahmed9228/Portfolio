import React from 'react';

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-[#182533] text-slate-200 border-[#304355]/80',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    sky: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    emerald: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    cyan: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border rounded-lg transition-colors ${variants[variant] || variants.default}`}>
      {children}
    </span>
  );
};

export default Badge;