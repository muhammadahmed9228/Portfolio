import React, { useEffect } from 'react';
import { LayoutDashboard, FolderGit2, Briefcase, Mail, LogOut, Code2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../../../features/auth/authSlice';

const AdminSidebar = ({ activeTab, setActiveTab, unreadCount = 0 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get authentication state to check if we are still authenticated
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Safely kick the user back to the login screen as soon as isAuthenticated flips to false
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'experiences', label: 'Experiences', icon: Briefcase },
    { id: 'inbox', label: 'Inbox', icon: Mail, badge: unreadCount },
  ];

  return (
    <aside className="w-full md:w-72 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between md:min-h-screen">
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center gap-3 px-4 sm:px-6 border-b border-slate-800">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-white text-sm">DevPortfolio</h2>
            <p className="text-xs text-slate-500">Admin Control Panel</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 sm:p-4 flex md:block gap-2 md:space-y-1.5 overflow-x-auto md:overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex shrink-0 md:w-full items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <div className="p-3 sm:p-4 border-t border-slate-800">
        <button
          onClick={() => dispatch(logoutAdmin())}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;