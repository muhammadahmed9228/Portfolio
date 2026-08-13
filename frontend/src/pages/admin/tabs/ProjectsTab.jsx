import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, addProject, editProject, removeProject } from '../../../features/projects/projectSlice';
import Modal from '../../../components/Modal';
import { Plus, Pencil, Trash2, ExternalLink, Loader2, Image as ImageIcon } from 'lucide-react';

const ProjectsTab = () => {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((state) => state.projects);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    githubLink: '',
    liveDemoLink: '',
    category: 'Full-Stack',
    featured: false,
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleOpenCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      techStack: '',
      githubLink: '',
      liveDemoLink: '',
      category: 'Full-Stack',
      featured: false,
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '),
      githubLink: project.githubLink || '',
      liveDemoLink: project.liveDemoLink || '',
      category: project.category || 'Full-Stack',
      featured: project.featured || false,
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project? This will also remove its image from Cloudinary.')) {
      dispatch(removeProject(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare FormData for file upload
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('techStack', formData.techStack);
    data.append('githubLink', formData.githubLink);
    data.append('liveDemoLink', formData.liveDemoLink);
    data.append('category', formData.category);
    data.append('featured', formData.featured);

    if (imageFile) {
      data.append('image', imageFile);
    }

    if (editingProject) {
      dispatch(editProject({ id: editingProject._id, formData: data })).then(() => {
        setIsModalOpen(false);
      });
    } else {
      dispatch(addProject(data)).then(() => {
        setIsModalOpen(false);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Header Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 p-4 sm:p-6 border border-slate-800 rounded-2xl">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white">Project Showcase Manager</h2>
          <p className="text-slate-400 text-sm mt-1">Add, update, or remove portfolio projects displayed on your site.</p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Table View */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
            <p className="text-sm">Loading projects from backend...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p className="text-base font-medium">No projects found.</p>
            <p className="text-xs mt-1">Click "Add New Project" above to create your first portfolio entry.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 p-4 xl:hidden">
              {projects.map((project) => (
                <div key={project._id} className="p-4 sm:p-5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 min-w-0">
                    {project.image?.url ? (
                      <img
                        src={project.image.url}
                        alt={project.title}
                        className="w-full sm:w-16 h-40 sm:h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                      />
                    ) : (
                      <div className="w-full sm:w-16 h-40 sm:h-16 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-700 shrink-0">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-semibold text-white break-words">{project.title}</div>
                          <p className="text-xs text-slate-400 line-clamp-3 mt-1">{project.description}</p>
                        </div>
                        {project.featured && (
                          <span className="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-medium shrink-0">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 text-xs bg-slate-800 border border-slate-700 text-slate-300 rounded-lg">
                      {project.category}
                    </span>
                    {project.techStack.slice(0, 2).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 text-[11px] bg-slate-800/80 text-emerald-400 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 2 && (
                      <span className="text-[11px] text-slate-500">+{project.techStack.length - 2} more</span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-slate-400">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="hover:text-white">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveDemoLink && (
                        <a href={project.liveDemoLink} target="_blank" rel="noreferrer" className="hover:text-emerald-400">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditModal(project)}
                        className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden xl:block overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Tech Stack</th>
                  <th className="px-6 py-4">Links</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {projects.map((project) => (
                  <tr key={project._id} className="hover:bg-slate-800/40 transition-colors">
                    {/* Title & Image */}
                    <td className="px-6 py-4 flex items-center gap-4">
                      {project.image?.url ? (
                        <img
                          src={project.image.url}
                          alt={project.title}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-700"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-700">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-white flex items-center gap-2">
                          <span>{project.title}</span>
                          {project.featured && (
                            <span className="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 max-w-xs mt-0.5">
                          {project.description}
                        </p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-xs bg-slate-800 border border-slate-700 text-slate-300 rounded-lg">
                        {project.category}
                      </span>
                    </td>

                    {/* Tech Stack */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.techStack.slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-2 py-0.5 text-[11px] bg-slate-800/80 text-emerald-400 rounded">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-[11px] text-slate-500 self-center">
                            +{project.techStack.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>

                    {/* External Links */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noreferrer" className="hover:text-white">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveDemoLink && (
                          <a href={project.liveDemoLink} target="_blank" rel="noreferrer" className="hover:text-emerald-400">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(project)}
                          className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </>
        )}
      </div>

      {/* Add / Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Add New Project'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Project Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. E-Commerce Microservices Platform"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Description *</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the project problem, features, and solution..."
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="Full-Stack">Full-Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Tech Stack (Comma Separated) *</label>
              <input
                type="text"
                required
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                placeholder="React, Node.js, MongoDB, JWT, Tailwind"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase mb-1">GitHub Repo Link</label>
              <input
                type="url"
                value={formData.githubLink}
                onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Live Demo Link</label>
              <input
                type="url"
                value={formData.liveDemoLink}
                onChange={(e) => setFormData({ ...formData, liveDemoLink: e.target.value })}
                placeholder="https://myproject.vercel.app"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase mb-1">
              Project Thumbnail Image {editingProject ? '(Optional if keeping old image)' : '*'}
            </label>
            <input
              type="file"
              accept="image/*"
              required={!editingProject}
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-emerald-400 hover:file:bg-slate-700"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
            />
            <label htmlFor="featured" className="text-sm text-slate-300 cursor-pointer">
              Mark as Featured Project on Hero section
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              {editingProject ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectsTab;