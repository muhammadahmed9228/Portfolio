import React from 'react';
import { PROFILE } from '../constants/profile';
import { Code2, Heart, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">
              {PROFILE.name} <span className="text-emerald-400">• Full-Stack MERN Developer</span>
            </p>
            <p className="text-slate-500 mt-0.5">
              Built with MERN Stack (MongoDB, Express, React, Node.js)
            </p>
          </div>
        </div>

        {/* Quick Nav & Admin Link */}
        <div className="flex items-center gap-6">
          <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
          <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
          <a href="#experience" className="hover:text-emerald-400 transition-colors">Experience</a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
          <Link to="/admin/login" className="flex items-center gap-1 text-slate-500 hover:text-white transition-colors">
            <Lock className="w-3 h-3" />
            <span>Admin</span>
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;