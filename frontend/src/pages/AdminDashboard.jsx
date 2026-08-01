import React, { useState } from 'react';
import AdminSidebar from './admin/components/AdminSidebar';
import AdminHeader from './admin/components/AdminHeader';
import StatCard from '../components/StatCard';
import { FolderGit2, Briefcase, Mail, ShieldAlert } from 'lucide-react';
import ProjectsTab from './admin/tabs/ProjectsTab'
import ExperiencesTab from './admin/tabs/ExperiencesTab';
import InboxTab from './admin/tabs/InboxTab';

//This assembles the sidebar, header, stat counters, and tab views into a layout.

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Placeholder counters (will connect to Redux store states)
  const stats = {
    projectsCount: 6,
    experiencesCount: 2,
    unreadMessages: 3,
  };

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-100">
      {/* Sidebar Navigation */}
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        unreadCount={stats.unreadMessages} 
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <AdminHeader activeTab={activeTab} />

        {/* Dynamic Workspace Content */}
        <main className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
          {/* Top Quick Stats Grid (Visible on Overview & Projects) */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard 
                  title="Total Projects" 
                  value={stats.projectsCount} 
                  icon={FolderGit2} 
                  color="emerald" 
                />
                <StatCard 
                  title="Work History" 
                  value={stats.experiencesCount} 
                  icon={Briefcase} 
                  color="cyan" 
                />
                <StatCard 
                  title="Unread Messages" 
                  value={stats.unreadMessages} 
                  icon={Mail} 
                  color="rose" 
                />
              </div>

              {/* Quick Actions Panel */}
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                <h3 className="text-base font-bold text-white mb-2">System Status</h3>
                <p className="text-sm text-slate-400">
                  Your portfolio API is connected and responding. Authentication tokens are active via httpOnly secure cookies.
                </p>
              </div>
            </div>
          )}

          {/* Tab Views */}
          {activeTab === 'projects' && <ProjectsTab />}

         {activeTab === 'experiences' && <ExperiencesTab />}

         {activeTab === 'inbox' && <InboxTab />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;