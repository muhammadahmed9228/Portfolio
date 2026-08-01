import React from 'react';
import { PROFILE } from '../../../constants/profile';
import { Mail, MapPin, Send } from 'lucide-react';

const ContactInfoCard = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white">Let's Connect</h3>
        <p className="text-slate-400 text-sm mt-1 leading-relaxed">
          I am actively seeking internship and full-time junior software engineering roles. Feel free to send a message or reach out directly via email.
        </p>
      </div>

      <div className="space-y-4 text-sm text-slate-300">
        {/* Email */}
        <div className="flex items-center gap-3 p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-mono uppercase">Direct Email</p>
            <a href={`mailto:${PROFILE.email}`} className="font-semibold text-white hover:text-emerald-400 transition-colors">
              {PROFILE.email}
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-3 p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
          <div className="p-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-mono uppercase">Location</p>
            <p className="font-semibold text-white">{PROFILE.location}</p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="pt-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Professional Profiles</p>
        <div className="flex items-center gap-3">
          <a
            href={PROFILE.socials.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
  
            <span>GitHub</span>
          </a>
          <a
            href={PROFILE.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-slate-300 hover:text-emerald-400 hover:border-slate-700 transition-colors"
          >
          
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;