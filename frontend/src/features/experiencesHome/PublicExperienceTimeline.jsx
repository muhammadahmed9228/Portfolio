import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperiences } from '../../features/experiences/experienceSlice';
import SectionHeader from '../../components/SectionHeader';
import TimelineCard from './components/TimelineCard';
import { Loader2 } from 'lucide-react';

const PublicExperienceTimeline = () => {
  const dispatch = useDispatch();
  const { experiences, isLoading } = useSelector((state) => state.experiences);

  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  return (
    <section id="experience" className="py-20 bg-[#091520]/70 border-t border-[#223244]/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Work History"
          title="Experience & Internships"
          subtitle="My professional journey, roles held, and key contributions to engineering teams."
        />

        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-amber-300 mb-2" />
            <p className="text-sm">Loading experience timeline...</p>
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p className="text-base font-medium">Work history will appear here once added from the admin dashboard.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {experiences.map((exp) => (
              <TimelineCard key={exp._id} exp={exp} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicExperienceTimeline;