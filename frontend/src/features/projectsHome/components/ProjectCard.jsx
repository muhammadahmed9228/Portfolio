import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import Badge from '../../../components/Badge';

const ProjectCard = ({ project, onSelect }) => {
  return (
    <div className="bg-[#0a1520] border border-[#223244] rounded-2xl overflow-hidden hover:border-amber-500/25 transition-all duration-300 flex flex-col group">
      {/* Thumbnail Container */}
      <div className="relative h-48 overflow-hidden bg-[#07111c]">
        {project.image?.url ? (
          <img
            src={project.image.url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs">
            No Image Preview
          </div>
        )}

        {/* Category & Featured Badge Overlays */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Badge variant="sky">{project.category}</Badge>
          {project.featured && (
            <Badge variant="amber">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Featured
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-300/80 text-sm mt-2 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                  className="px-2 py-0.5 text-[11px] font-mono bg-[#182533] text-sky-300 rounded-md border border-[#314355]/50"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
            <div className="pt-3 border-t border-[#223244]/80 flex items-center justify-between">
            <button
              onClick={() => onSelect(project)}
                className="text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors cursor-pointer"
            >
              View Details →
            </button>

              <div className="flex items-center gap-3 text-slate-400">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                    className="hover:text-white transition-colors"
                  title="View Source Code"
                >
                
                </a>
              )}
              {project.liveDemoLink && (
                <a
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noreferrer"
                    className="hover:text-amber-300 transition-colors"
                  title="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;