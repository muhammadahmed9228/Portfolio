import React from "react";
import { PROFILE } from "../../constants/profile";
// import TerminalWindow from './components/TerminalWindow';
import ProfileImageCard from "./components/ProfileImageCard";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.14),_rgba(245,158,11,0.02)_45%,_transparent_72%)] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.12),_rgba(56,189,248,0.02)_45%,_transparent_72%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{PROFILE.status}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
              Building Scalable <br />
              <span className="bg-gradient-to-r from-amber-200 via-slate-100 to-sky-300 bg-clip-text text-transparent">
                Full-Stack Web Apps
              </span>
            </h1>

            <p className="text-slate-300/85 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {PROFILE.about}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 py-3.5 bg-amber-300 hover:bg-amber-200 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/10 flex items-center gap-2 transition-all cursor-pointer text-sm"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 bg-[#0d1824] hover:bg-[#132131] text-slate-100 border border-[#223244] font-semibold rounded-xl transition-all text-sm"
              >
                Contact Me
              </a>
            </div>

            {/* Social Icons Row */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-slate-400">
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#0d1824] border border-[#223244] rounded-xl hover:text-white hover:border-[#314558] transition-colors"
              ></a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#0d1824] border border-[#223244] rounded-xl hover:text-amber-300 hover:border-[#314558] transition-colors"
              ></a>
              <a
                href={`mailto:${PROFILE.email}`}
                className="p-2.5 bg-[#0d1824] border border-[#223244] rounded-xl hover:text-sky-300 hover:border-[#314558] transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Visual Column (Interactive Code Terminal) */}
          <div className="lg:col-span-5 max-w-lg mx-auto lg:max-w-none w-full">
            <ProfileImageCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
