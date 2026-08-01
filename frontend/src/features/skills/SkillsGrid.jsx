import React, { useState } from 'react';
import { PROFILE } from '../../constants/profile';
import SectionHeader from '../../components/SectionHeader';
import { Code, Server, Database, Wrench } from 'lucide-react';

const SkillsGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Skills', icon: Code },
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'backend', label: 'Backend', icon: Server },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'tools', label: 'Dev Tools', icon: Wrench },
  ];

  const getFilteredSkills = () => {
    if (activeCategory === 'all') {
      return [
        ...PROFILE.skills.frontend,
        ...PROFILE.skills.backend,
        ...PROFILE.skills.database,
        ...PROFILE.skills.tools,
      ];
    }
    return PROFILE.skills[activeCategory] || [];
  };

  return (
    <section id="skills" className="py-20 bg-slate-900/40 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Capabilities"
          title="Technical Expertise"
          subtitle="Modern web technologies and frameworks I use to build production apps."
        />

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {getFilteredSkills().map((skill, index) => (
            <div
              key={index}
              className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl text-center hover:border-emerald-500/30 transition-all group"
            >
              <p className="text-sm font-semibold text-slate-300 group-hover:text-emerald-400 transition-colors">
                {skill}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsGrid;