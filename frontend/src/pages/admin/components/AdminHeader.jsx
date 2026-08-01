import React from 'react';
import { User, Bell, ExternalLink } from 'lucide-react';
import { useSelector } from 'react-redux';

const AdminHeader = ({ activeTab }) => {
  const { admin } = useSelector((state) => state.auth);

  const titleMap = {
    overview: "Dashboard Overview",
    projects: "Projects Management",
    experiences: "Internships & Work History",
    inbox: "Contact Messages Inbox",
  };

  return (
    <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between">
      {/* Title */}
      <h1 className="text-lg font-bold text-white capitalize">{titleMap[activeTab] || 'Dashboard'}</h1>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* View Live Portfolio Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>

        {/* User Pill */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-800/80 border border-slate-700/80 rounded-xl">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium text-slate-200">
            {admin?.email || 'Admin User'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;