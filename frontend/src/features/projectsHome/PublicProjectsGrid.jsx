import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../features/projects/projectSlice';
import SectionHeader from '../../components/SectionHeader';
import ProjectCard from './components/ProjectCard';
import Modal from '../../components/Modal';
import { Loader2, ExternalLink } from 'lucide-react';

const PublicProjectsGrid = () => {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((state) => state.projects);

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const categories = ['All', 'Full-Stack', 'Frontend', 'Backend'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badgeText="Portfolio"
        title="Featured Engineering Projects"
        subtitle="Explore real-world applications and microservices I have built with the MERN stack."
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === cat
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/10'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="py-16 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
          <p className="text-sm">Fetching projects from API...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <p className="text-base font-medium">No projects available under this filter yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal View */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || 'Project Details'}
      >
        {selectedProject && (
          <div className="space-y-4">
            {selectedProject.image?.url && (
              <img
                src={selectedProject.image.url}
                alt={selectedProject.title}
                className="w-full h-56 object-cover rounded-xl border border-slate-800"
              />
            )}
            <p className="text-slate-300 text-sm leading-relaxed">
              {selectedProject.description}
            </p>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tech Stack Used</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.techStack.map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 text-xs bg-slate-800 text-emerald-400 rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
              {selectedProject.githubLink && (
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl"
                >
                
                  <span>GitHub Repository</span>
                </a>
              )}
              {selectedProject.liveDemoLink && (
                <a
                  href={selectedProject.liveDemoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Preview</span>
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default PublicProjectsGrid;