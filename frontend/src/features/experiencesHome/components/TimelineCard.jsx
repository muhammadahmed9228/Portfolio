import React from 'react';
import { Building2, Calendar, MapPin } from 'lucide-react';

const TimelineCard = ({ exp }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="relative pl-8 md:pl-0">
      <div className="p-6 bg-[#0a1520] border border-[#223244] rounded-2xl hover:border-amber-500/25 transition-colors space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#223244]">
          <div className="flex items-center gap-3">
            {exp.companyLogo ? (
              <img src={exp.companyLogo} alt={exp.company} className="w-10 h-10 rounded-lg object-contain bg-[#07111c] p-1 border border-[#223244]" />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-[#182533] text-amber-300 flex items-center justify-center border border-[#314355]">
                <Building2 className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-white">{exp.company}</h3>
              {exp.location && (
                <p className="text-xs text-slate-300/80 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-sky-300" />
                  {exp.location}
                </p>
              )}
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182533] text-amber-300 text-xs font-mono font-medium self-start sm:self-auto border border-[#314355]">
            <Calendar className="w-3.5 h-3.5 text-slate-300" />
            {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
          </span>
        </div>

        {/* Achievement Bullets */}
        <ul className="space-y-2 list-disc list-inside text-slate-200/90 text-sm leading-relaxed">
          {exp.description?.map((bullet, i) => (
            <li key={i}>
              <span className="-ml-1">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimelineCard;
