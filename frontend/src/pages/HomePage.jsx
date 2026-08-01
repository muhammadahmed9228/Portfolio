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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
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