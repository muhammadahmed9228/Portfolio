import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = "emerald" }) => {
  const colorMap = {
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    rose: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  return (
    <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
        <h4 className="text-2xl font-bold text-white mt-1">{value}</h4>
      </div>
      <div className={`p-3 rounded-xl border ${colorMap[color] || colorMap.emerald}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default StatCard;