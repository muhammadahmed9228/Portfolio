import React from 'react';
import Navbar from '../components/NavbarHome';
import HeroSection from '../features/hero/HeroSection';
import SkillsGrid from '../features/skills/SkillsGrid';
import PublicProjectsGrid from '../features/projectsHome/PublicProjectsGrid';
import PublicExperienceTimeline from '../features/experiencesHome/PublicExperienceTimeline';
import PublicContactForm from '../features/contactsHome/PublicContactForm';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07111c] text-slate-100 flex flex-col justify-between">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.10),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.08),_transparent_24%)]" />
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <SkillsGrid />
          <PublicProjectsGrid />
          <PublicExperienceTimeline />
          <PublicContactForm />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;