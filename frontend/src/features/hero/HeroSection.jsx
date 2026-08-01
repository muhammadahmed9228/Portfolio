import React from "react";
import { PROFILE } from "../../constants/profile";
// import TerminalWindow from './components/TerminalWindow';
import ProfileImageCard from "./components/ProfileImageCard";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{PROFILE.status}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
              Building Scalable <br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Full-Stack Web Apps
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {PROFILE.about}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/10 flex items-center gap-2 transition-all cursor-pointer text-sm"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold rounded-xl transition-all text-sm"
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
                className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:text-white hover:border-slate-700 transition-colors"
              ></a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:text-emerald-400 hover:border-slate-700 transition-colors"
              ></a>
              <a
                href={`mailto:${PROFILE.email}`}
                className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:text-cyan-400 hover:border-slate-700 transition-colors"
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
