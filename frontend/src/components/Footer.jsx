import React from 'react';
import { PROFILE } from '../constants/profile';
import { Code2, Heart, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#07111c] border-t border-[#223244]/80 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-xl">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">
              {PROFILE.name} <span className="text-amber-300">• Full-Stack MERN Developer</span>
            </p>
            <p className="text-slate-500 mt-0.5">
              Built with MERN Stack (MongoDB, Express, React, Node.js)
            </p>
          </div>
        </div>

        {/* Quick Nav & Admin Link */}
        <div className="flex items-center gap-6">
          <a href="#about" className="hover:text-amber-300 transition-colors">About</a>
          <a href="#projects" className="hover:text-amber-300 transition-colors">Projects</a>
          <a href="#experience" className="hover:text-amber-300 transition-colors">Experience</a>
          <a href="#contact" className="hover:text-amber-300 transition-colors">Contact</a>
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