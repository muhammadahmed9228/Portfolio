// import React from 'react';
// import { PROFILE } from '../../../constants/profile';

// const TerminalWindow = () => {
//   return (
//     <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs">
//       {/* Window Controls Header */}
//       <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded-full bg-rose-500/80" />
//           <div className="w-3 h-3 rounded-full bg-amber-500/80" />
//           <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
//         </div>
//         <span className="text-slate-500 text-[11px]">developer.json</span>
//       </div>

//       {/* Code Snippet Content */}
//       <div className="p-5 space-y-2 leading-relaxed text-slate-300">
//         <div><span className="text-emerald-400">const</span> developer = &#123;</div>
//         <div className="pl-4"><span className="text-cyan-400">name:</span> <span className="text-amber-300">"{PROFILE.name}"</span>,</div>
//         <div className="pl-4"><span className="text-cyan-400">role:</span> <span className="text-amber-300">"{PROFILE.title}"</span>,</div>
//         <div className="pl-4"><span className="text-cyan-400">status:</span> <span className="text-emerald-400">"{PROFILE.status}"</span>,</div>
//         <div className="pl-4">
//           <span className="text-cyan-400">stack:</span> [
//           <span className="text-amber-300">"MongoDB"</span>, <span className="text-amber-300">"Express"</span>, <span className="text-amber-300">"React"</span>, <span className="text-amber-300">"Node"</span>
//           ],
//         </div>
//         <div className="pl-4"><span className="text-cyan-400">location:</span> <span className="text-amber-300">"{PROFILE.location}"</span></div>
//         <div>&#125;;</div>
//       </div>
//     </div>
//   );
// };

// export default TerminalWindow;


import React from 'react';
import { PROFILE } from '../../../constants/profile';
import { Code2, Sparkles } from 'lucide-react';
import profileImg from '../../../../public/profile-photo2.jpg';

const ProfileImageCard = () => {
  return (
    <div className="relative group max-w-sm mx-auto lg:max-w-none">
      {/* Ambient Gradient Glow behind photo */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-sky-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500 pointer-events-none" />

      {/* Main Card Container */}
      <div className="relative bg-[#0a1520] border border-[#223244] rounded-3xl p-3 shadow-2xl overflow-hidden">
        
        {/* Photo Container */}
        <div className="relative h-[380px] sm:h-[420px] w-full rounded-2xl overflow-hidden bg-[#07111c] border border-[#223244]/80">
          <img
           src={profileImg} // Profile pic
            alt={PROFILE.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Dark Gradient Overlay at the bottom of image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111c] via-[#07111c]/20 to-transparent" />

          {/* Floating Status Badge (Top-Right) */}
          <div className="absolute top-3 right-3 px-3 py-1 bg-[#07111c]/80 backdrop-blur-md border border-[#223244] rounded-full flex items-center gap-2 text-[11px] font-medium text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
            <span>Open for Hire</span>
          </div>

          {/* Overlay Text Content (Bottom of Image) */}
          <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#0a1520]/82 backdrop-blur-md border border-[#223244]/80 rounded-xl space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">{PROFILE.name}</h3>
              <div className="p-1 bg-amber-500/10 text-amber-300 rounded-md">
                <Code2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-slate-300/80 text-xs font-medium">{PROFILE.title}</p>
          </div>
        </div>

        {/* Bottom Tech Pills Row */}
        <div className="mt-3 px-2 py-1 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5 text-amber-300 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            MERN Stack
          </span>
          <span>{PROFILE.location}</span>
        </div>

      </div>
    </div>
  );
};

export default ProfileImageCard;