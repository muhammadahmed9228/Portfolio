import React from 'react';

const SectionHeader = ({ title, subtitle, badgeText }) => {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
      {badgeText && (
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
          {badgeText}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;